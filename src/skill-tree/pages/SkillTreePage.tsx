/**
 * SkillTreePage - Main page component for the skill tree
 */

'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { SkillTreeCanvas } from '../components/SkillTreeCanvas';
import { SearchBar } from '../components/SearchBar';
import { Toolbar } from '../components/Toolbar';
import { useSkillTreeStore } from '../store/skillStore';
import { getSkillTreeService } from '../services/skillService';
import { Info } from 'lucide-react';
import '../styles/skill-tree.css';
import type { SkillNode } from '../models/skill';

export const SkillTreePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  
  const loadSkillTree = useSkillTreeStore(state => state.loadSkillTree);
  const allocateNode = useSkillTreeStore(state => state.allocateNode);
  const deallocateNode = useSkillTreeStore(state => state.deallocateNode);
  const isAllocated = useSkillTreeStore(state => state.isAllocated);
  const getNode = useSkillTreeStore(state => state.getNode);
  
  // Get canvas dimensions
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  
  /**
   * Load skill tree data on mount
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const service = getSkillTreeService();
        
        let data;
        try {
          // Try to load from static file first
          data = await service.loadFromStatic('/static/skilltree.json');
        } catch {
          // Fallback to seed data if static file doesn't exist
          const seedData = await import('../data/seed/skilltree-seed.json');
          data = seedData.default;
          console.log('Using seed data (static file not available)');
        }
        
        loadSkillTree(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load skill tree:', err);
        setError('Failed to load skill tree. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [loadSkillTree]);
  
  /**
   * Update canvas dimensions
   */
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasContainerRef.current) {
        const { width, height } = canvasContainerRef.current.getBoundingClientRect();
        setCanvasWidth(width);
        setCanvasHeight(height);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  /**
   * Handle node click (allocate/deallocate)
   */
  const handleNodeClick = useCallback((nodeId: string) => {
    const allocated = isAllocated(nodeId);
    
    if (allocated) {
      const success = deallocateNode(nodeId);
      if (!success) {
        // Show error feedback (node cannot be deallocated)
        console.log('Cannot deallocate node - other nodes depend on it');
      }
    } else {
      const success = allocateNode(nodeId);
      if (!success) {
        // Show error feedback (no path or not enough points)
        console.log('Cannot allocate node - no valid path or insufficient points');
      }
    }
  }, [isAllocated, allocateNode, deallocateNode]);
  
  /**
   * Handle node hover (show tooltip)
   */
  const handleNodeHover = useCallback((nodeId: string | null) => {
    if (nodeId) {
      const node = getNode(nodeId);
      setHoveredNode(node || null);
    } else {
      setHoveredNode(null);
    }
  }, [getNode]);
  
  /**
   * Handle search result selection (focus node)
   */
  const handleNodeSelect = useCallback((nodeId: string) => {
    setFocusNodeId(nodeId);
    // Clear focus after animation
    setTimeout(() => setFocusNodeId(null), 1000);
  }, []);
  
  /**
   * Zoom controls
   */
  const zoomRef = useRef({
    zoomIn: () => {},
    zoomOut: () => {},
    reset: () => {},
  });
  
  if (isLoading) {
    return (
      <div className="skill-tree-loading">
        <div className="skill-tree-loading-spinner" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-[#050506] text-gray-300">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Skill Tree</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex flex-col bg-[#050506]">
      {/* Header */}
      <div className="flex-shrink-0 bg-[#0c0c0e] border-b border-[#3d3d43] p-4">
        <div className="max-w-[1900px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-serif text-gradient-gold font-bold">
              Interactive Skill Tree
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Info size={16} />
              <span>Click nodes to allocate | Drag to pan | Scroll to zoom</span>
            </div>
          </div>
          <SearchBar onNodeSelect={handleNodeSelect} className="w-96" />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-80 border-r border-[#3d3d43] overflow-y-auto custom-scrollbar">
          <Toolbar
            onZoomIn={() => zoomRef.current.zoomIn()}
            onZoomOut={() => zoomRef.current.zoomOut()}
            onReset={() => zoomRef.current.reset()}
          />
        </div>
        
        {/* Canvas */}
        <div className="flex-1 relative" ref={canvasContainerRef}>
          {canvasWidth > 0 && canvasHeight > 0 && (
            <SkillTreeCanvas
              width={canvasWidth}
              height={canvasHeight}
              onNodeClick={handleNodeClick}
              onNodeHover={handleNodeHover}
              focusNodeId={focusNodeId}
            />
          )}
          
          {/* Tooltip */}
          {hoveredNode && (
            <div
              className="skill-tree-tooltip"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <h3>{hoveredNode.name}</h3>
                <span className={`node-type-badge node-type-${hoveredNode.type}`}>
                  {hoveredNode.type}
                </span>
              </div>
              {hoveredNode.description && (
                <p>{hoveredNode.description}</p>
              )}
              {hoveredNode.stats && hoveredNode.stats.length > 0 && (
                <ul>
                  {hoveredNode.stats.map((stat, idx) => (
                    <li key={idx}>{stat.name}</li>
                  ))}
                </ul>
              )}
              <div className="mt-3 pt-3 border-t border-[#3d3d43]">
                <p className="text-xs text-gray-500">
                  {isAllocated(hoveredNode.id) ? (
                    <span className="text-[#c5a059]">✓ Allocated</span>
                  ) : (
                    <span>Click to allocate</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
