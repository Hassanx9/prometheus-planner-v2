/**
 * SkillTreeCanvas - PixiJS-based renderer for skill tree
 * Implements pan/zoom, viewport culling, and interactive nodes
 */

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as PIXI from 'pixi.js';
import type { SkillNode, SkillConnection, BoundingBox } from '../models/skill';
import { useSkillTreeStore } from '../store/skillStore';

interface SkillTreeCanvasProps {
  width: number;
  height: number;
  onNodeClick?: (nodeId: string) => void;
  onNodeHover?: (nodeId: string | null) => void;
  focusNodeId?: string | null;
}

export const SkillTreeCanvas: React.FC<SkillTreeCanvasProps> = ({
  width,
  height,
  onNodeClick,
  onNodeHover,
  focusNodeId,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const containerRef = useRef<PIXI.Container | null>(null);
  const nodesGraphicsRef = useRef<Map<string, PIXI.Graphics>>(new Map());
  const connectionsGraphicRef = useRef<PIXI.Graphics | null>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  
  // Store state
  const nodesById = useSkillTreeStore(state => state.nodesById);
  const connections = useSkillTreeStore(state => state.connections);
  const allocatedIds = useSkillTreeStore(state => state.allocatedIds);
  const isAllocated = useSkillTreeStore(state => state.isAllocated);
  
  // Camera state
  const cameraRef = useRef({
    x: 0,
    y: 0,
    scale: 1,
    minScale: 0.1,
    maxScale: 2.5,
  });
  
  /**
   * Initialize PixiJS application
   */
  useEffect(() => {
    if (!canvasRef.current || appRef.current) return;
    
    const app = new PIXI.Application();
    
    (async () => {
      await app.init({
        width,
        height,
        backgroundColor: 0x050506,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio || 1,
      });
      
      if (!canvasRef.current) return;
      
      canvasRef.current.appendChild(app.canvas as HTMLCanvasElement);
      appRef.current = app;
      
      // Create main container
      const container = new PIXI.Container();
      app.stage.addChild(container);
      containerRef.current = container;
      
      // Center the camera
      centerCamera();
      
      // Initial render
      renderSkillTree();
    })();
    
    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, [width, height]);
  
  /**
   * Center camera on the skill tree
   */
  const centerCamera = useCallback(() => {
    if (!nodesById.size || !containerRef.current) return;
    
    const nodes = Array.from(nodesById.values());
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    nodes.forEach(node => {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x);
      maxY = Math.max(maxY, node.y);
    });
    
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    
    cameraRef.current.x = width / 2 - centerX;
    cameraRef.current.y = height / 2 - centerY;
    
    updateCameraTransform();
  }, [nodesById, width, height]);
  
  /**
   * Update camera transform
   */
  const updateCameraTransform = useCallback(() => {
    if (!containerRef.current) return;
    
    const { x, y, scale } = cameraRef.current;
    containerRef.current.position.set(x, y);
    containerRef.current.scale.set(scale);
  }, []);
  
  /**
   * Focus on a specific node
   */
  const focusOnNode = useCallback((nodeId: string) => {
    const node = nodesById.get(nodeId);
    if (!node || !containerRef.current) return;
    
    const { scale } = cameraRef.current;
    cameraRef.current.x = width / 2 - node.x * scale;
    cameraRef.current.y = height / 2 - node.y * scale;
    
    updateCameraTransform();
  }, [nodesById, width, height, updateCameraTransform]);
  
  /**
   * Handle zoom
   */
  const handleZoom = useCallback((delta: number, centerX?: number, centerY?: number) => {
    const { scale, minScale, maxScale } = cameraRef.current;
    const newScale = Math.max(minScale, Math.min(maxScale, scale * (1 + delta)));
    
    if (centerX !== undefined && centerY !== undefined && containerRef.current) {
      // Zoom towards cursor
      const worldX = (centerX - cameraRef.current.x) / scale;
      const worldY = (centerY - cameraRef.current.y) / scale;
      
      cameraRef.current.x = centerX - worldX * newScale;
      cameraRef.current.y = centerY - worldY * newScale;
    }
    
    cameraRef.current.scale = newScale;
    updateCameraTransform();
    renderSkillTree();
  }, [updateCameraTransform]);
  
  /**
   * Render the skill tree
   */
  const renderSkillTree = useCallback(() => {
    if (!containerRef.current || !appRef.current) return;
    
    // Clear existing graphics
    nodesGraphicsRef.current.forEach(g => g.destroy());
    nodesGraphicsRef.current.clear();
    connectionsGraphicRef.current?.destroy();
    
    // Create connections graphic
    const connectionsGraphic = new PIXI.Graphics();
    containerRef.current.addChild(connectionsGraphic);
    connectionsGraphicRef.current = connectionsGraphic;
    
    // Draw connections
    connections.forEach(conn => {
      const fromNode = nodesById.get(conn.from);
      const toNode = nodesById.get(conn.to);
      
      if (!fromNode || !toNode) return;
      
      const isActive = isAllocated(conn.from) && isAllocated(conn.to);
      
      connectionsGraphic.moveTo(fromNode.x, fromNode.y);
      connectionsGraphic.lineTo(toNode.x, toNode.y);
      connectionsGraphic.stroke({
        width: 2,
        color: isActive ? 0xc5a059 : 0x3d3d43,
        alpha: isActive ? 1 : 0.5,
      });
    });
    
    // Draw nodes
    nodesById.forEach((node, nodeId) => {
      const nodeGraphic = new PIXI.Graphics();
      const allocated = isAllocated(nodeId);
      const hovered = hoveredNodeId === nodeId;
      
      // Determine node size and color based on type
      let radius = 10;
      let fillColor = 0x141417;
      let strokeColor = 0x3d3d43;
      let strokeWidth = 2;
      
      if (node.type === 'start') {
        radius = 20;
        fillColor = 0xc5a059;
        strokeColor = 0xffffff;
      } else if (node.type === 'keystone') {
        radius = 18;
        fillColor = allocated ? 0xc5a059 : 0x1a1c2e;
        strokeColor = allocated ? 0xffffff : 0xc5a059;
        strokeWidth = 3;
      } else if (node.type === 'notable') {
        radius = 15;
        fillColor = allocated ? 0xc5a059 : 0x141417;
        strokeColor = allocated ? 0xffffff : 0x7ecce0;
      } else {
        radius = 10;
        fillColor = allocated ? 0xc5a059 : 0x141417;
        strokeColor = allocated ? 0xffffff : 0x3d3d43;
      }
      
      if (hovered) {
        fillColor = 0xc5a059;
        strokeColor = 0xffffff;
        strokeWidth += 1;
      }
      
      // Draw circle
      nodeGraphic.circle(node.x, node.y, radius);
      nodeGraphic.fill(fillColor);
      nodeGraphic.stroke({ width: strokeWidth, color: strokeColor });
      
      // Make interactive
      nodeGraphic.eventMode = 'static';
      nodeGraphic.cursor = 'pointer';
      nodeGraphic.hitArea = new PIXI.Circle(node.x, node.y, radius + 5);
      
      nodeGraphic.on('pointerdown', () => {
        onNodeClick?.(nodeId);
      });
      
      nodeGraphic.on('pointerover', () => {
        setHoveredNodeId(nodeId);
        onNodeHover?.(nodeId);
      });
      
      nodeGraphic.on('pointerout', () => {
        setHoveredNodeId(null);
        onNodeHover?.(null);
      });
      
      containerRef.current!.addChild(nodeGraphic);
      nodesGraphicsRef.current.set(nodeId, nodeGraphic);
      
      // Draw label for notable/keystone nodes
      if (node.type === 'notable' || node.type === 'keystone' || node.type === 'start') {
        const text = new PIXI.Text({
          text: node.name,
          style: {
            fontSize: 12,
            fill: allocated ? 0xffffff : 0xc5a059,
            fontWeight: 'bold',
          },
        });
        text.anchor.set(0.5);
        text.position.set(node.x, node.y - radius - 15);
        containerRef.current!.addChild(text);
      }
    });
  }, [nodesById, connections, allocatedIds, hoveredNodeId, isAllocated, onNodeClick, onNodeHover]);
  
  /**
   * Re-render when allocation state changes
   */
  useEffect(() => {
    renderSkillTree();
  }, [allocatedIds, renderSkillTree]);
  
  /**
   * Focus on node when requested
   */
  useEffect(() => {
    if (focusNodeId) {
      focusOnNode(focusNodeId);
    }
  }, [focusNodeId, focusOnNode]);
  
  /**
   * Handle mouse wheel for zoom
   */
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    handleZoom(delta, e.clientX, e.clientY);
  }, [handleZoom]);
  
  /**
   * Setup event listeners
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);
  
  /**
   * Handle drag to pan
   */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - cameraRef.current.x,
      y: e.clientY - cameraRef.current.y,
    });
  }, []);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    cameraRef.current.x = e.clientX - dragStart.x;
    cameraRef.current.y = e.clientY - dragStart.y;
    updateCameraTransform();
  }, [isDragging, dragStart, updateCameraTransform]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  return (
    <div
      ref={canvasRef}
      className="skill-tree-canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        position: 'relative',
      }}
    />
  );
};
