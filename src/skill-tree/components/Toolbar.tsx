/**
 * Toolbar - Controls for skill tree (class selection, stats, undo/redo, zoom)
 */

'use client';

import React from 'react';
import {
  RotateCcw,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Activity,
} from 'lucide-react';
import { useSkillTreeStore } from '../store/skillStore';
import type { SkillClass } from '../models/skill';

interface ToolbarProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  onFitToScreen?: () => void;
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onFitToScreen,
  className = '',
}) => {
  const selectedClass = useSkillTreeStore(state => state.selectedClass);
  const totalPoints = useSkillTreeStore(state => state.totalPoints);
  const maxPoints = useSkillTreeStore(state => state.maxPoints);
  const undoStack = useSkillTreeStore(state => state.undoStack);
  const redoStack = useSkillTreeStore(state => state.redoStack);
  const allocatedNodes = useSkillTreeStore(state => state.getAllocatedNodes());
  
  const setClass = useSkillTreeStore(state => state.setClass);
  const reset = useSkillTreeStore(state => state.reset);
  const undo = useSkillTreeStore(state => state.undo);
  const redo = useSkillTreeStore(state => state.redo);
  
  const classes: Array<{ id: SkillClass; name: string; color: string }> = [
    { id: 'warrior', name: 'Warrior', color: '#c53030' },
    { id: 'ranger', name: 'Ranger', color: '#38a169' },
    { id: 'witch', name: 'Witch', color: '#805ad5' },
  ];
  
  /**
   * Calculate total stats from allocated nodes
   */
  const calculateStats = () => {
    const stats: Record<string, number> = {};
    
    allocatedNodes.forEach(node => {
      node.stats?.forEach(stat => {
        const key = stat.name;
        const value = typeof stat.value === 'number' ? stat.value : parseFloat(stat.value) || 0;
        stats[key] = (stats[key] || 0) + value;
      });
    });
    
    return stats;
  };
  
  const stats = calculateStats();
  const topStats = Object.entries(stats)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 3);
  
  return (
    <div className={`bg-[#0c0c0e] border border-[#3d3d43] ${className}`}>
      <div className="p-4 space-y-4">
        {/* Class Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
            Character Class
          </label>
          <div className="flex gap-2">
            {classes.map(cls => (
              <button
                key={cls.id}
                onClick={() => setClass(cls.id)}
                className={`flex-1 px-4 py-2 text-sm font-bold uppercase transition-all ${
                  selectedClass === cls.id
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black shadow-premium'
                    : 'bg-[#141417] text-gray-400 hover:bg-[#1a1c2e] hover:text-white border border-[#3d3d43]'
                }`}
                style={
                  selectedClass === cls.id
                    ? {
                        background: `linear-gradient(135deg, ${cls.color}, ${cls.color}dd)`,
                      }
                    : undefined
                }
              >
                {cls.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Points Display */}
        <div className="bg-[#141417] border border-[#3d3d43] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase">Points Allocated</span>
            <Activity size={16} className="text-[#c5a059]" />
          </div>
          <div className="text-3xl font-bold text-gradient-gold">
            {totalPoints} / {maxPoints}
          </div>
          <div className="mt-2 bg-[#0c0c0e] h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#c5a059] to-[#d4b16a] transition-all duration-300"
              style={{ width: `${(totalPoints / maxPoints) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Stats Summary */}
        {topStats.length > 0 && (
          <div className="bg-[#141417] border border-[#3d3d43] p-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Top Stats</h4>
            <ul className="space-y-2">
              {topStats.map(([name, value]) => (
                <li key={name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{name}</span>
                  <span className="font-bold text-[#7ecce0]">
                    {value > 0 ? '+' : ''}{value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Controls */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
            Controls
          </label>
          
          {/* Undo/Redo */}
          <div className="flex gap-2">
            <button
              onClick={undo}
              disabled={undoStack.length === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#141417] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={18} />
              <span className="text-sm font-semibold">Undo</span>
            </button>
            <button
              onClick={redo}
              disabled={redoStack.length === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#141417] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={18} />
              <span className="text-sm font-semibold">Redo</span>
            </button>
          </div>
          
          {/* Zoom Controls */}
          <div className="flex gap-2">
            <button
              onClick={onZoomIn}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#141417] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={onZoomOut}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#141417] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={onFitToScreen}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#141417] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-white transition-colors"
              title="Fit to Screen"
            >
              <Maximize2 size={18} />
            </button>
          </div>
          
          {/* Reset Button */}
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all allocations?')) {
                reset();
                onReset?.();
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#141417] border border-[#3d3d43] text-gray-300 hover:border-red-500 hover:text-red-400 transition-colors"
          >
            <RotateCcw size={18} />
            <span className="text-sm font-semibold">Reset Tree</span>
          </button>
        </div>
      </div>
    </div>
  );
};
