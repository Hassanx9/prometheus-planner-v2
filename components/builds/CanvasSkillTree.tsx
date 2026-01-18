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
  Target,
  X,
  Filter,
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

// Professional PoE 2 style node sizes (much smaller, refined)
const NODE_SIZES = {
  keystone: 8,
  notable: 5,
  small: 2.5,
  start: 12,
};

// PoE 2 style attribute area colors with glow
const ATTRIBUTE_COLORS = {
  strength: { primary: '#c44', secondary: '#f66', glow: 'rgba(255, 100, 100, 0.6)' },
  dexterity: { primary: '#4a4', secondary: '#6c6', glow: 'rgba(100, 255, 100, 0.6)' },
  intelligence: { primary: '#48c', secondary: '#6af', glow: 'rgba(100, 150, 255, 0.6)' },
  neutral: { primary: '#888', secondary: '#aaa', glow: 'rgba(200, 200, 200, 0.4)' },
};

// Node type specific styling
const NODE_STYLES = {
  keystone: {
    normal: { fill: '#1a1a2e', stroke: '#c5a059', strokeWidth: 1.5, glow: 'rgba(197, 160, 89, 0.8)' },
    allocated: { fill: '#c5a059', stroke: '#fff', strokeWidth: 2, glow: 'rgba(255, 215, 100, 1)' },
    hover: { fill: '#2a2a3e', stroke: '#d4b16a', strokeWidth: 2, glow: 'rgba(212, 177, 106, 0.9)' },
  },
  notable: {
    normal: { fill: '#151520', stroke: '#7ecce0', strokeWidth: 1, glow: 'rgba(126, 204, 224, 0.5)' },
    allocated: { fill: '#7ecce0', stroke: '#fff', strokeWidth: 1.5, glow: 'rgba(126, 204, 224, 1)' },
    hover: { fill: '#1a1a2a', stroke: '#9de', strokeWidth: 1.5, glow: 'rgba(150, 220, 240, 0.7)' },
  },
  small: {
    normal: { fill: '#0d0d12', stroke: '#3a3a4a', strokeWidth: 0.5, glow: 'rgba(100, 100, 120, 0.3)' },
    allocated: { fill: '#6a6a7a', stroke: '#aaa', strokeWidth: 1, glow: 'rgba(170, 170, 190, 0.6)' },
    hover: { fill: '#1a1a22', stroke: '#5a5a6a', strokeWidth: 1, glow: 'rgba(130, 130, 150, 0.4)' },
  },
  start: {
    normal: { fill: '#c5a059', stroke: '#fff', strokeWidth: 2, glow: 'rgba(197, 160, 89, 1)' },
    allocated: { fill: '#c5a059', stroke: '#fff', strokeWidth: 2, glow: 'rgba(255, 215, 100, 1)' },
    hover: { fill: '#d4b16a', stroke: '#fff', strokeWidth: 2.5, glow: 'rgba(212, 177, 106, 1)' },
  },
};

// Determine attribute area based on node position
function getAttributeArea(x: number, y: number): 'strength' | 'dexterity' | 'intelligence' | 'neutral' {
  // Top area = Intelligence (blue)
  if (y < 0.35) return 'intelligence';
  // Bottom left = Strength (red)
  if (y > 0.6 && x < 0.4) return 'strength';
  // Bottom right = Dexterity (green)
  if (y > 0.6 && x > 0.6) return 'dexterity';
  // Middle/mixed areas
  return 'neutral';
}

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
  
  // Interaction state - Start zoomed out to see full tree
  const [canvasState, setCanvasState] = useState<CanvasState>({
    scale: 0.8,
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
  const [dimensions, setDimensions] = useState({ width: 1400, height: 900 });

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
      const padding = 50;
      const treeWidth = dimensions.width - padding * 2;
      const treeHeight = dimensions.height - padding * 2;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      return {
        x: centerX + (x - 0.5) * treeWidth * canvasState.scale + canvasState.offsetX,
        y: centerY + (y - 0.5) * treeHeight * canvasState.scale + canvasState.offsetY,
      };
    },
    [dimensions, canvasState]
  );

  // Convert canvas coordinates to normalized
  const fromCanvasCoords = useCallback(
    (canvasX: number, canvasY: number) => {
      const padding = 50;
      const treeWidth = dimensions.width - padding * 2;
      const treeHeight = dimensions.height - padding * 2;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      return {
        x: (canvasX - centerX - canvasState.offsetX) / (treeWidth * canvasState.scale) + 0.5,
        y: (canvasY - centerY - canvasState.offsetY) / (treeHeight * canvasState.scale) + 0.5,
      };
    },
    [dimensions, canvasState]
  );

  // Find node at position
  const findNodeAtPosition = useCallback(
    (canvasX: number, canvasY: number): TreeNode | null => {
      const normalized = fromCanvasCoords(canvasX, canvasY);

      // Check nodes in reverse order (larger nodes on top)
      const sortedNodes = [...nodes].sort((a, b) => NODE_SIZES[b.kind] - NODE_SIZES[a.kind]);

      for (const node of sortedNodes) {
        const hitRadius = (NODE_SIZES[node.kind] * 3) / (dimensions.width * canvasState.scale);
        const dx = node.x - normalized.x;
        const dy = node.y - normalized.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < hitRadius) {
          return node;
        }
      }

      return null;
    },
    [nodes, fromCanvasCoords, dimensions, canvasState]
  );

  // Draw the tree with professional PoE 2 styling
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || loading) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Dark cosmic background
    const bgGradient = ctx.createRadialGradient(
      dimensions.width / 2, dimensions.height / 2, 0,
      dimensions.width / 2, dimensions.height / 2, dimensions.width * 0.7
    );
    bgGradient.addColorStop(0, '#0a0a12');
    bgGradient.addColorStop(0.5, '#060608');
    bgGradient.addColorStop(1, '#030304');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Subtle star-like dots in background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw connections first (thin clean lines like PoE 2)
    ctx.lineCap = 'round';
    connections.forEach((conn) => {
      const fromNode = nodeMap.get(conn.from);
      const toNode = nodeMap.get(conn.to);
      if (!fromNode || !toNode) return;

      const from = toCanvasCoords(fromNode.x, fromNode.y);
      const to = toCanvasCoords(toNode.x, toNode.y);

      // Check if both nodes are allocated for highlighting
      const bothAllocated = allocatedNodes.has(conn.from) && allocatedNodes.has(conn.to);
      const oneAllocated = allocatedNodes.has(conn.from) || allocatedNodes.has(conn.to);

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);

      if (bothAllocated) {
        // Bright gold for allocated path
        ctx.strokeStyle = '#c5a059';
        ctx.lineWidth = Math.max(2, 1.5 * canvasState.scale);
        ctx.shadowColor = 'rgba(197, 160, 89, 0.7)';
        ctx.shadowBlur = 4;
      } else if (oneAllocated) {
        // Dim gold for adjacent to allocated
        ctx.strokeStyle = '#6a5a3a';
        ctx.lineWidth = Math.max(1, 1 * canvasState.scale);
        ctx.shadowColor = 'rgba(197, 160, 89, 0.3)';
        ctx.shadowBlur = 2;
      } else {
        // Subtle visible line for unallocated (slightly brighter than before)
        ctx.strokeStyle = '#2d2d3a';
        ctx.lineWidth = Math.max(0.6, 0.6 * canvasState.scale);
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // Draw nodes (sorted by size for proper layering - small first, then notable, then keystone)
    const sortedNodes = [...nodes].sort(
      (a, b) => NODE_SIZES[a.kind] - NODE_SIZES[b.kind]
    );

    sortedNodes.forEach((node) => {
      const pos = toCanvasCoords(node.x, node.y);
      const baseSize = NODE_SIZES[node.kind];
      const size = baseSize * canvasState.scale;
      
      const isAllocated = allocatedNodes.has(node.id);
      const isHovered = hoveredNode?.id === node.id;
      const isSearchMatch =
        searchQuery &&
        (descriptions[node.id]?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          descriptions[node.id]?.stats?.some((s) =>
            s.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      // Get style based on state
      const styles = NODE_STYLES[node.kind];
      let style = styles.normal;
      if (isAllocated) style = styles.allocated;
      else if (isHovered) style = styles.hover;

      // Get attribute area color for glow
      const attrArea = getAttributeArea(node.x, node.y);
      const attrColor = ATTRIBUTE_COLORS[attrArea];

      // Draw glow effect
      if (isAllocated || isHovered || node.kind === 'keystone' || node.kind === 'notable') {
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size * 3);
        gradient.addColorStop(0, isSearchMatch ? 'rgba(255, 80, 80, 0.8)' : style.glow);
        gradient.addColorStop(0.5, isSearchMatch ? 'rgba(255, 80, 80, 0.3)' : style.glow.replace(/[\d.]+\)$/, '0.2)'));
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw node shape
      ctx.beginPath();
      
      if (node.kind === 'keystone') {
        // Diamond shape for keystones
        ctx.moveTo(pos.x, pos.y - size * 1.3);
        ctx.lineTo(pos.x + size * 1.3, pos.y);
        ctx.lineTo(pos.x, pos.y + size * 1.3);
        ctx.lineTo(pos.x - size * 1.3, pos.y);
        ctx.closePath();
      } else if (node.kind === 'notable') {
        // Hexagon shape for notables
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 - Math.PI / 6;
          const x = pos.x + size * 1.2 * Math.cos(angle);
          const y = pos.y + size * 1.2 * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
      } else {
        // Circle for small nodes and starts
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      }

      // Fill
      ctx.fillStyle = isSearchMatch ? '#c44' : style.fill;
      ctx.fill();

      // Stroke
      ctx.strokeStyle = style.stroke;
      ctx.lineWidth = style.strokeWidth * canvasState.scale;
      ctx.stroke();

      // Inner highlight for allocated nodes
      if (isAllocated && node.kind !== 'small') {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      }
    });

    // Draw path mode indicator
    if (pathMode && pathStart) {
      const startNode = nodeMap.get(pathStart);
      if (startNode) {
        const pos = toCanvasCoords(startNode.x, startNode.y);
        ctx.strokeStyle = '#c5a059';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, NODE_SIZES[startNode.kind] * canvasState.scale + 10, 0, Math.PI * 2);
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
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setCanvasState((prev) => ({
      ...prev,
      scale: Math.max(0.3, Math.min(4, prev.scale + delta)),
    }));
  };

  const handleZoom = (delta: number) => {
    setCanvasState((prev) => ({
      ...prev,
      scale: Math.max(0.3, Math.min(4, prev.scale + delta)),
    }));
  };

  const handleReset = () => {
    setCanvasState({ scale: 0.8, offsetX: 0, offsetY: 0 });
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
      <div className="flex items-center justify-center h-[800px] bg-[#050508] rounded-lg border border-[#1a1a22]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading Passive Tree...</p>
          <p className="text-gray-600 text-xs mt-1">{nodes.length.toLocaleString()} nodes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#050508] rounded-lg border border-[#1a1a22] overflow-hidden" data-testid="canvas-skill-tree">
      {/* Minimal Controls Bar */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg p-1 border border-[#2a2a32]">
          <button
            onClick={() => handleZoom(0.15)}
            className="p-1.5 hover:bg-white/10 rounded transition-all"
            data-testid="zoom-in-btn"
          >
            <ZoomIn size={14} className="text-gray-400" />
          </button>
          <button
            onClick={() => handleZoom(-0.15)}
            className="p-1.5 hover:bg-white/10 rounded transition-all"
            data-testid="zoom-out-btn"
          >
            <ZoomOut size={14} className="text-gray-400" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-white/10 rounded transition-all"
            data-testid="reset-view-btn"
          >
            <RotateCcw size={14} className="text-gray-400" />
          </button>
          <div className="w-px h-4 bg-[#2a2a32] mx-1" />
          <span className="text-xs text-gray-500 px-2 font-mono">
            {Math.round(canvasState.scale * 100)}%
          </span>
        </div>
      </div>

      {/* Right side controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className={`p-1.5 rounded transition-all border ${
            showSearch
              ? 'bg-[#c5a059] border-[#c5a059] text-black'
              : 'bg-black/60 border-[#2a2a32] hover:bg-white/10 text-gray-400'
          }`}
          data-testid="search-toggle-btn"
        >
          <Search size={14} />
        </button>

        <button
          onClick={() => {
            setPathMode(!pathMode);
            setPathStart(null);
          }}
          className={`p-1.5 rounded transition-all border ${
            pathMode
              ? 'bg-[#c5a059] border-[#c5a059] text-black'
              : 'bg-black/60 border-[#2a2a32] hover:bg-white/10 text-gray-400'
          }`}
          title="Smart Path Mode"
          data-testid="path-mode-btn"
        >
          <Target size={14} />
        </button>

        <div className="w-px h-5 bg-[#2a2a32]" />

        <button
          onClick={handleClearTree}
          className="p-1.5 bg-black/60 border border-[#2a2a32] hover:bg-red-500/20 hover:border-red-500/50 text-gray-400 hover:text-red-400 rounded transition-all"
          data-testid="clear-tree-btn"
        >
          <X size={14} />
        </button>

        <button
          onClick={handleExportBuild}
          className="p-1.5 bg-black/60 border border-[#2a2a32] hover:bg-white/10 rounded transition-all"
          data-testid="export-build-canvas-btn"
        >
          <Share2 size={14} className="text-gray-400" />
        </button>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="absolute top-16 left-4 right-4 z-10">
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-sm px-3 py-2 bg-black/80 backdrop-blur-sm border border-[#2a2a32] rounded-lg text-sm text-white placeholder-gray-600 focus:border-[#c5a059] focus:outline-none"
            data-testid="node-search-input"
          />
        </div>
      )}

      {/* Path Mode Indicator */}
      {pathMode && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 bg-[#c5a059] text-black px-3 py-1.5 rounded-lg font-medium text-xs">
          {pathStart ? 'Click destination' : 'Click start node'}
        </div>
      )}

      {/* Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[800px] cursor-grab active:cursor-grabbing"
      >
        <canvas
          ref={canvasRef}
          style={{ width: dimensions.width, height: dimensions.height }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-full"
          data-testid="skill-tree-canvas"
        />
      </div>

      {/* Professional Tooltip */}
      {hoveredNode && descriptions[hoveredNode.id] && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: '50%',
            bottom: '80px',
            transform: 'translateX(-50%)',
          }}
          data-testid="node-tooltip"
        >
          <div className="bg-[#0c0c10] border border-[#3a3a42] rounded-lg shadow-2xl overflow-hidden min-w-[280px] max-w-[360px]">
            {/* Header */}
            <div className={`px-4 py-3 border-b border-[#2a2a32] ${
              hoveredNode.kind === 'keystone' 
                ? 'bg-gradient-to-r from-[#2a2515] to-transparent' 
                : hoveredNode.kind === 'notable'
                ? 'bg-gradient-to-r from-[#152025] to-transparent'
                : 'bg-gradient-to-r from-[#1a1a1f] to-transparent'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className={`font-bold ${
                  hoveredNode.kind === 'keystone' 
                    ? 'text-[#c5a059]' 
                    : hoveredNode.kind === 'notable'
                    ? 'text-[#7ecce0]'
                    : 'text-gray-300'
                }`}>
                  {descriptions[hoveredNode.id]?.name || hoveredNode.id}
                </h4>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                  hoveredNode.kind === 'keystone'
                    ? 'bg-[#c5a059]/20 text-[#c5a059]'
                    : hoveredNode.kind === 'notable'
                    ? 'bg-[#7ecce0]/20 text-[#7ecce0]'
                    : 'bg-gray-500/20 text-gray-500'
                }`}>
                  {hoveredNode.kind}
                </span>
              </div>
            </div>
            
            {/* Stats */}
            {descriptions[hoveredNode.id]?.stats && descriptions[hoveredNode.id].stats.length > 0 && (
              <div className="px-4 py-3">
                <ul className="space-y-1.5">
                  {descriptions[hoveredNode.id].stats.map((stat, i) => (
                    <li key={i} className="text-sm text-[#8888aa] leading-relaxed">
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-2 bg-[#08080a] border-t border-[#2a2a32] flex items-center justify-between">
              <span className="text-[10px] text-gray-600">
                {allocatedNodes.has(hoveredNode.id) ? 'Allocated' : 'Click to allocate'}
              </span>
              <span className="text-[10px] text-gray-600 font-mono">
                {hoveredNode.id}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-[#1a1a22] px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-gray-600">Allocated</span>
              <span className="text-sm font-bold text-[#c5a059]" data-testid="allocated-nodes-count">
                {allocatedNodes.size}
              </span>
              <span className="text-xs text-gray-600">/ {level}</span>
            </div>
            <div className="w-px h-4 bg-[#2a2a32]" />
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-gray-600">Available</span>
              <span className="text-sm text-gray-400">{Math.max(0, level - allocatedNodes.size)}</span>
            </div>
          </div>
          <div className="text-[10px] text-gray-600">
            {nodes.length.toLocaleString()} nodes
          </div>
        </div>
      </div>
    </div>
  );
}
