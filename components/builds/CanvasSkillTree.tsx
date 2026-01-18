'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Search,
  Download,
  Share2,
  Layers,
  Target,
  X,
} from 'lucide-react';
import {
  TreeNode,
  NodeDescriptions,
  CLASS_STARTS,
  buildConnections,
  findPath,
  calculateStats,
  generateBuildCode,
  StatTotals,
} from '@/lib/tree-data';

interface CanvasSkillTreeProps {
  onStatsChange?: (stats: StatTotals) => void;
  onNodeCountChange?: (count: number) => void;
  selectedClass?: string;
  level?: number;
}

interface CanvasState {
  scale: number;
  offsetX: number;
  offsetY: number;
}

// Node rendering sizes based on type
const NODE_SIZES = {
  keystone: 18,
  notable: 12,
  small: 6,
  start: 22,
};

// Node colors
const NODE_COLORS = {
  keystone: { normal: '#1a1c2e', allocated: '#c5a059', hover: '#d4b16a', border: '#c5a059' },
  notable: { normal: '#1a1c2e', allocated: '#7ecce0', hover: '#8dd6ea', border: '#7ecce0' },
  small: { normal: '#1a1c2e', allocated: '#4a5568', hover: '#718096', border: '#3d3d43' },
  start: { normal: '#c5a059', allocated: '#c5a059', hover: '#d4b16a', border: '#fff' },
};

export function CanvasSkillTree({
  onStatsChange,
  onNodeCountChange,
  selectedClass = 'Witch',
  level = 100,
}: CanvasSkillTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tree data state
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [descriptions, setDescriptions] = useState<NodeDescriptions>({});
  const [connections, setConnections] = useState<{ from: string; to: string }[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Interaction state
  const [canvasState, setCanvasState] = useState<CanvasState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<TreeNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [allocatedNodes, setAllocatedNodes] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [pathMode, setPathMode] = useState(false);
  const [pathStart, setPathStart] = useState<string | null>(null);
  
  // Canvas dimensions
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  // Load tree data
  useEffect(() => {
    async function loadTreeData() {
      try {
        const [nodesRes, descRes] = await Promise.all([
          fetch('/tree-data/nodes.json'),
          fetch('/tree-data/nodes_desc.json'),
        ]);

        const nodesData = await nodesRes.json();
        const descData = await descRes.json();

        // Combine all node types
        const allNodes: TreeNode[] = [
          ...(nodesData.keystones || []).map((n: TreeNode) => ({ ...n, kind: 'keystone' as const })),
          ...(nodesData.notables || []).map((n: TreeNode) => ({ ...n, kind: 'notable' as const })),
          ...(nodesData.smalls || []).map((n: TreeNode) => ({ ...n, kind: 'small' as const })),
        ];

        // Add class starts
        Object.entries(CLASS_STARTS).forEach(([className, pos]) => {
          allNodes.push({
            id: `start_${className}`,
            x: pos.x,
            y: pos.y,
            kind: 'start',
            name: pos.name,
          });
        });

        // Build connections
        const conns = buildConnections(allNodes);

        setNodes(allNodes);
        setDescriptions(descData);
        setConnections(conns);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load tree data:', error);
        setLoading(false);
      }
    }

    loadTreeData();
  }, []);

  // Handle resize
  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Node map for quick lookup
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  // Calculate stats when allocation changes
  useEffect(() => {
    const allocated = nodes.filter((n) => allocatedNodes.has(n.id));
    const stats = calculateStats(allocated, descriptions);
    onStatsChange?.(stats);
    onNodeCountChange?.(allocatedNodes.size);
  }, [allocatedNodes, nodes, descriptions, onStatsChange, onNodeCountChange]);

  // Convert normalized coordinates to canvas coordinates
  const toCanvasCoords = useCallback(
    (x: number, y: number) => {
      const padding = 100;
      const treeWidth = dimensions.width - padding * 2;
      const treeHeight = dimensions.height - padding * 2;

      return {
        x: padding + x * treeWidth * canvasState.scale + canvasState.offsetX,
        y: padding + y * treeHeight * canvasState.scale + canvasState.offsetY,
      };
    },
    [dimensions, canvasState]
  );

  // Convert canvas coordinates to normalized
  const fromCanvasCoords = useCallback(
    (canvasX: number, canvasY: number) => {
      const padding = 100;
      const treeWidth = dimensions.width - padding * 2;
      const treeHeight = dimensions.height - padding * 2;

      return {
        x: (canvasX - padding - canvasState.offsetX) / (treeWidth * canvasState.scale),
        y: (canvasY - padding - canvasState.offsetY) / (treeHeight * canvasState.scale),
      };
    },
    [dimensions, canvasState]
  );

  // Find node at position
  const findNodeAtPosition = useCallback(
    (canvasX: number, canvasY: number): TreeNode | null => {
      const normalized = fromCanvasCoords(canvasX, canvasY);

      for (const node of nodes) {
        const size = NODE_SIZES[node.kind] / (dimensions.width * canvasState.scale);
        const dx = node.x - normalized.x;
        const dy = node.y - normalized.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < size * 2) {
          return node;
        }
      }

      return null;
    },
    [nodes, fromCanvasCoords, dimensions, canvasState]
  );

  // Draw the tree
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || loading) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#050506';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Draw grid pattern
    ctx.strokeStyle = '#1a1c2e';
    ctx.lineWidth = 1;
    const gridSize = 50 * canvasState.scale;
    for (let x = canvasState.offsetX % gridSize; x < dimensions.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, dimensions.height);
      ctx.stroke();
    }
    for (let y = canvasState.offsetY % gridSize; y < dimensions.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(dimensions.width, y);
      ctx.stroke();
    }

    // Draw connections
    ctx.lineWidth = 2 * canvasState.scale;
    connections.forEach((conn) => {
      const fromNode = nodeMap.get(conn.from);
      const toNode = nodeMap.get(conn.to);
      if (!fromNode || !toNode) return;

      const from = toCanvasCoords(fromNode.x, fromNode.y);
      const to = toCanvasCoords(toNode.x, toNode.y);

      // Check if both nodes are allocated for highlighting
      const bothAllocated = allocatedNodes.has(conn.from) && allocatedNodes.has(conn.to);

      ctx.strokeStyle = bothAllocated ? '#c5a059' : '#3d3d43';
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });

    // Draw nodes (sorted by size for proper layering)
    const sortedNodes = [...nodes].sort(
      (a, b) => NODE_SIZES[a.kind] - NODE_SIZES[b.kind]
    );

    sortedNodes.forEach((node) => {
      const pos = toCanvasCoords(node.x, node.y);
      const size = NODE_SIZES[node.kind] * canvasState.scale;
      const colors = NODE_COLORS[node.kind];
      const isAllocated = allocatedNodes.has(node.id);
      const isHovered = hoveredNode?.id === node.id;
      const isSelected = selectedNode?.id === node.id;
      const isSearchMatch =
        searchQuery &&
        (descriptions[node.id]?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          descriptions[node.id]?.stats?.some((s) =>
            s.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      // Node fill
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);

      if (isSearchMatch) {
        ctx.fillStyle = '#e74c3c';
      } else if (isAllocated) {
        ctx.fillStyle = colors.allocated;
      } else if (isHovered) {
        ctx.fillStyle = colors.hover;
      } else {
        ctx.fillStyle = colors.normal;
      }
      ctx.fill();

      // Node border
      ctx.strokeStyle = isSelected ? '#fff' : colors.border;
      ctx.lineWidth = isSelected ? 3 * canvasState.scale : 2 * canvasState.scale;
      ctx.stroke();

      // Keystone/Notable label
      if ((node.kind === 'keystone' || node.kind === 'notable') && canvasState.scale > 0.8) {
        const desc = descriptions[node.id];
        if (desc?.name) {
          ctx.font = `${10 * canvasState.scale}px sans-serif`;
          ctx.fillStyle = isAllocated ? '#fff' : '#9ca3af';
          ctx.textAlign = 'center';
          ctx.fillText(desc.name, pos.x, pos.y - size - 5);
        }
      }
    });

    // Draw path mode indicator
    if (pathMode && pathStart) {
      const startNode = nodeMap.get(pathStart);
      if (startNode) {
        const pos = toCanvasCoords(startNode.x, startNode.y);
        ctx.strokeStyle = '#c5a059';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, NODE_SIZES[startNode.kind] * canvasState.scale + 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }, [
    loading,
    dimensions,
    canvasState,
    connections,
    nodeMap,
    allocatedNodes,
    hoveredNode,
    selectedNode,
    searchQuery,
    descriptions,
    nodes,
    toCanvasCoords,
    pathMode,
    pathStart,
  ]);

  // Animation loop
  useEffect(() => {
    let animationId: number;

    function animate() {
      draw();
      animationId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [draw]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const node = findNodeAtPosition(x, y);

    if (e.button === 0) {
      if (node) {
        if (pathMode) {
          if (!pathStart) {
            setPathStart(node.id);
          } else {
            // Find and allocate path
            const path = findPath(pathStart, node.id, nodes, connections);
            if (path.length > 0) {
              setAllocatedNodes((prev) => {
                const next = new Set(prev);
                path.forEach((id) => next.add(id));
                return next;
              });
            }
            setPathStart(null);
            setPathMode(false);
          }
        } else {
          // Toggle node allocation
          setAllocatedNodes((prev) => {
            const next = new Set(prev);
            if (next.has(node.id)) {
              next.delete(node.id);
            } else {
              next.add(node.id);
            }
            return next;
          });
          setSelectedNode(node);
        }
      } else {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setCanvasState((prev) => ({
        ...prev,
        offsetX: prev.offsetX + dx,
        offsetY: prev.offsetY + dy,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    } else {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const node = findNodeAtPosition(x, y);
      setHoveredNode(node);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setCanvasState((prev) => ({
      ...prev,
      scale: Math.max(0.3, Math.min(3, prev.scale + delta)),
    }));
  };

  const handleZoom = (delta: number) => {
    setCanvasState((prev) => ({
      ...prev,
      scale: Math.max(0.3, Math.min(3, prev.scale + delta)),
    }));
  };

  const handleReset = () => {
    setCanvasState({ scale: 1, offsetX: 0, offsetY: 0 });
  };

  const handleClearTree = () => {
    setAllocatedNodes(new Set());
    setSelectedNode(null);
  };

  const handleExportBuild = () => {
    const code = generateBuildCode(Array.from(allocatedNodes));
    navigator.clipboard.writeText(code);
    alert('Build code copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[800px] bg-[#0f1116] rounded-xl border border-[#3d3d43]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading Passive Tree ({nodes.length.toLocaleString()} nodes)...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0f1116] rounded-xl border border-[#3d3d43] overflow-hidden" data-testid="canvas-skill-tree">
      {/* Controls Bar */}
      <div className="flex items-center justify-between p-4 border-b border-[#3d3d43] bg-[#1a1c2e]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleZoom(0.2)}
            className="p-2 bg-[#0f1116] border border-[#3d3d43] hover:border-[#c5a059] rounded-lg transition-all"
            data-testid="zoom-in-btn"
          >
            <ZoomIn size={18} className="text-gray-300" />
          </button>
          <button
            onClick={() => handleZoom(-0.2)}
            className="p-2 bg-[#0f1116] border border-[#3d3d43] hover:border-[#c5a059] rounded-lg transition-all"
            data-testid="zoom-out-btn"
          >
            <ZoomOut size={18} className="text-gray-300" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-[#0f1116] border border-[#3d3d43] hover:border-[#c5a059] rounded-lg transition-all"
            data-testid="reset-view-btn"
          >
            <RotateCcw size={18} className="text-gray-300" />
          </button>
          <div className="w-px h-6 bg-[#3d3d43] mx-2" />
          <span className="text-sm text-gray-400 font-mono">
            {Math.round(canvasState.scale * 100)}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-2 border rounded-lg transition-all ${
              showSearch
                ? 'bg-[#c5a059] border-[#c5a059] text-black'
                : 'bg-[#0f1116] border-[#3d3d43] hover:border-[#c5a059] text-gray-300'
            }`}
            data-testid="search-toggle-btn"
          >
            <Search size={18} />
          </button>

          {/* Path Mode Toggle */}
          <button
            onClick={() => {
              setPathMode(!pathMode);
              setPathStart(null);
            }}
            className={`p-2 border rounded-lg transition-all ${
              pathMode
                ? 'bg-[#c5a059] border-[#c5a059] text-black'
                : 'bg-[#0f1116] border-[#3d3d43] hover:border-[#c5a059] text-gray-300'
            }`}
            title="Smart Path Mode"
            data-testid="path-mode-btn"
          >
            <Target size={18} />
          </button>

          <div className="w-px h-6 bg-[#3d3d43] mx-2" />

          <button
            onClick={handleClearTree}
            className="p-2 bg-[#0f1116] border border-[#3d3d43] hover:border-red-500 text-gray-300 hover:text-red-500 rounded-lg transition-all"
            data-testid="clear-tree-btn"
          >
            <X size={18} />
          </button>

          <button
            onClick={handleExportBuild}
            className="p-2 bg-[#0f1116] border border-[#3d3d43] hover:border-[#c5a059] rounded-lg transition-all"
            data-testid="export-build-btn"
          >
            <Share2 size={18} className="text-gray-300" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="absolute top-20 left-4 right-4 z-10">
          <input
            type="text"
            placeholder="Search nodes by name or stat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-[#1a1c2e] border border-[#3d3d43] rounded-lg text-white placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
            data-testid="node-search-input"
          />
        </div>
      )}

      {/* Path Mode Indicator */}
      {pathMode && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 bg-[#c5a059] text-black px-4 py-2 rounded-lg font-bold text-sm">
          {pathStart ? 'Click destination node' : 'Click starting node'}
        </div>
      )}

      {/* Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[700px] cursor-grab active:cursor-grabbing"
      >
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-full"
          data-testid="skill-tree-canvas"
        />
      </div>

      {/* Hovered Node Tooltip */}
      {hoveredNode && (
        <div
          className="absolute bg-[#1a1c2e] border border-[#c5a059] rounded-lg p-4 shadow-premium-xl z-20 max-w-xs pointer-events-none"
          style={{
            left: '50%',
            bottom: '20px',
            transform: 'translateX(-50%)',
          }}
          data-testid="node-tooltip"
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                hoveredNode.kind === 'keystone'
                  ? 'bg-[#c5a059]/20 text-[#c5a059]'
                  : hoveredNode.kind === 'notable'
                  ? 'bg-[#7ecce0]/20 text-[#7ecce0]'
                  : 'bg-gray-500/20 text-gray-400'
              }`}
            >
              {hoveredNode.kind}
            </span>
            {allocatedNodes.has(hoveredNode.id) && (
              <span className="px-2 py-0.5 rounded text-xs font-bold uppercase bg-green-500/20 text-green-400">
                Allocated
              </span>
            )}
          </div>
          <h4 className="text-lg font-bold text-white mb-2">
            {descriptions[hoveredNode.id]?.name || hoveredNode.id}
          </h4>
          {descriptions[hoveredNode.id]?.stats && (
            <ul className="space-y-1">
              {descriptions[hoveredNode.id].stats.map((stat, i) => (
                <li key={i} className="text-sm text-gray-300">
                  • {stat}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Stats Summary Bar */}
      <div className="flex items-center justify-between p-4 border-t border-[#3d3d43] bg-[#1a1c2e]">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase">Nodes</p>
            <p className="text-lg font-bold text-[#c5a059]" data-testid="allocated-nodes-count">
              {allocatedNodes.size}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase">Available</p>
            <p className="text-lg font-bold text-gray-400">{Math.max(0, level - allocatedNodes.size)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase">Level</p>
            <p className="text-lg font-bold text-white">{level}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Total Nodes: {nodes.length.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
