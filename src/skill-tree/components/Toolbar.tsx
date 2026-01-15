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
    <div className={`bg-gradient-to-b from-[#0f1014] to-[#0a0b0f] border-l border-[#2a2d35] shadow-2xl ${className}`}>
      <div className="p-5 space-y-5">
        {/* Class Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-1 h-3 bg-gradient-to-b from-[#d4b16a] to-[#c5a059]"></span>
            Character Class
          </label>
          <div className="flex gap-2">
            {classes.map(cls => (
              <button
                key={cls.id}
                onClick={() => setClass(cls.id)}
                className={`flex-1 px-4 py-2.5 text-sm font-bold uppercase transition-all duration-200 ${
                  selectedClass === cls.id
                    ? 'text-white shadow-lg transform scale-105'
                    : 'bg-[#141417] text-gray-500 hover:bg-[#1a1c2e] hover:text-gray-300 border border-[#2a2d35] hover:border-[#3d3d43]'
                }`}
                style={
                  selectedClass === cls.id
                    ? {
                        background: `linear-gradient(135deg, ${cls.color}ee, ${cls.color}cc)`,
                        boxShadow: `0 4px 15px ${cls.color}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
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
        <div className="bg-gradient-to-br from-[#141417] to-[#0f1014] border border-[#2a2d35] p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Points Allocated</span>
            <Activity size={18} className="text-[#d4b16a]" />
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-[#d4b16a] to-[#c5a059] bg-clip-text text-transparent">
            {totalPoints} <span className="text-2xl text-gray-600">/ {maxPoints}</span>
          </div>
          <div className="mt-3 bg-[#0a0b0f] h-2.5 overflow-hidden shadow-inner border border-[#1a1c2e]">
            <div
              className="h-full bg-gradient-to-r from-[#c5a059] via-[#d4b16a] to-[#c5a059] transition-all duration-500 ease-out shadow-md"
              style={{ 
                width: `${(totalPoints / maxPoints) * 100}%`,
                boxShadow: '0 0 12px rgba(197, 160, 89, 0.5)'
              }}
            />
          </div>
        </div>
        
        {/* Stats Summary */}
        {topStats.length > 0 && (
          <div className="bg-gradient-to-br from-[#141417] to-[#0f1014] border border-[#2a2d35] p-5 shadow-lg">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-gradient-to-b from-[#88e3f5] to-[#7ecce0]"></span>
              Top Stats
            </h4>
            <ul className="space-y-3">
              {topStats.map(([name, value]) => (
                <li key={name} className="flex items-center justify-between text-sm group">
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">{name}</span>
                  <span className="font-bold text-[#88e3f5] text-base px-2.5 py-0.5 bg-[#88e3f5]/10 border border-[#88e3f5]/20">
                    {value > 0 ? '+' : ''}{value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Controls */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-3 bg-gradient-to-b from-[#d4b16a] to-[#c5a059]"></span>
            Controls
          </label>
          
          {/* Undo/Redo */}
          <div className="flex gap-2">
            <button
              onClick={undo}
              disabled={undoStack.length === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#141417] border border-[#2a2d35] text-gray-400 hover:border-[#d4b16a] hover:text-white hover:bg-[#1a1c2e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#2a2d35] disabled:hover:bg-[#141417] transition-all duration-200"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={18} />
              <span className="text-sm font-semibold">Undo</span>
            </button>
            <button
              onClick={redo}
              disabled={redoStack.length === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#141417] border border-[#2a2d35] text-gray-400 hover:border-[#d4b16a] hover:text-white hover:bg-[#1a1c2e] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#2a2d35] disabled:hover:bg-[#141417] transition-all duration-200"
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
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#141417] border border-[#2a2d35] text-gray-400 hover:border-[#d4b16a] hover:text-white hover:bg-[#1a1c2e] transition-all duration-200"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={onZoomOut}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#141417] border border-[#2a2d35] text-gray-400 hover:border-[#d4b16a] hover:text-white hover:bg-[#1a1c2e] transition-all duration-200"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={onFitToScreen}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#141417] border border-[#2a2d35] text-gray-400 hover:border-[#d4b16a] hover:text-white hover:bg-[#1a1c2e] transition-all duration-200"
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
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1a1c2e] to-[#141417] border border-[#2a2d35] text-gray-400 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            title="Reset all allocations"
          >
            <RotateCcw size={18} />
            <span className="text-sm font-semibold">Reset Tree</span>
          </button>
        </div>
      </div>
    </div>
  );
};
