'use client';

import { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';
import { SkillTreeData, SkillNode } from '@/types';

interface InteractiveSkillTreeProps {
  data: SkillTreeData;
}

export function InteractiveSkillTree({ data }: InteractiveSkillTreeProps) {
  const [zoom, setZoom] = useState(data.zoom || 1);
  const [pan, setPan] = useState(data.pan || { x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="bg-[#141417] border border-[#3d3d43] rounded-sm overflow-hidden">
      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-b border-[#3d3d43] bg-[#0c0c0e]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleZoom(0.1)}
            className="p-2 bg-[#141417] border border-[#3d3d43] hover:border-[#c5a059] transition-colors"
          >
            <ZoomIn size={18} className="text-gray-300" />
          </button>
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-2 bg-[#141417] border border-[#3d3d43] hover:border-[#c5a059] transition-colors"
          >
            <ZoomOut size={18} className="text-gray-300" />
          </button>
          <button
            onClick={resetView}
            className="p-2 bg-[#141417] border border-[#3d3d43] hover:border-[#c5a059] transition-colors"
          >
            <RotateCcw size={18} className="text-gray-300" />
          </button>
          <span className="ml-4 text-sm text-gray-400">
            Zoom: {Math.round(zoom * 100)}%
          </span>
        </div>
        <button className="p-2 bg-[#141417] border border-[#3d3d43] hover:border-[#c5a059] transition-colors">
          <Maximize2 size={18} className="text-gray-300" />
        </button>
      </div>

      {/* Skill Tree Canvas */}
      <div
        ref={containerRef}
        className="relative w-full h-[800px] overflow-hidden bg-[#050506] cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Connection Lines */}
          {data.connections.map((conn, index) => {
            const fromNode = data.nodes.find((n) => n.id === conn.from);
            const toNode = data.nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={index}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#3d3d43"
                strokeWidth="2"
                className="transition-colors"
              />
            );
          })}

          {/* Nodes */}
          {data.nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.type === 'start' ? 20 : node.type === 'notable' ? 15 : 10}
                fill={selectedNode?.id === node.id ? '#c5a059' : '#141417'}
                stroke={selectedNode?.id === node.id ? '#fff' : '#3d3d43'}
                strokeWidth="2"
                className="cursor-pointer transition-all hover:fill-[#c5a059] hover:stroke-white"
                onClick={() => setSelectedNode(node)}
              />
              {node.type === 'notable' && (
                <text
                  x={node.x}
                  y={node.y - 25}
                  textAnchor="middle"
                  fill="#c5a059"
                  fontSize="12"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {node.name}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 bg-[#0c0c0e] border border-[#c5a059] p-6 max-w-md">
          <h3 className="text-xl font-serif text-[#c5a059] mb-2">{selectedNode.name}</h3>
          <p className="text-gray-300 mb-4">{selectedNode.description}</p>
          {selectedNode.stats && selectedNode.stats.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-400 uppercase">Stats:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {selectedNode.stats.map((stat, index) => (
                  <li key={index} className="text-sm">{stat}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={() => setSelectedNode(null)}
            className="mt-4 text-sm text-gray-500 hover:text-[#c5a059] transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
