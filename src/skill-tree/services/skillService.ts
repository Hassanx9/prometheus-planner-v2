/**
 * Skill Tree Data Service
 * Handles loading skill tree data from static files or API endpoints
 * Includes quadtree indexing for efficient spatial queries
 */

import RBush from 'rbush';
import type {
  SkillTreeData,
  SkillNode,
  BoundingBox,
  IndexedNode,
  SkillTreeClass,
} from '../models/skill';

// Constants for node sizing (should match SkillTreeCanvas)
const NODE_RADIUS_APPROXIMATION = 20;

/**
 * Spatial index for efficient viewport-based queries
 */
class SkillTreeIndex {
  private tree: RBush<IndexedNode>;
  
  constructor() {
    this.tree = new RBush<IndexedNode>();
  }
  
  /**
   * Build index from nodes
   */
  buildIndex(nodes: SkillNode[]): void {
    const indexedNodes: IndexedNode[] = nodes.map(node => ({
      ...node,
      bbox: {
        minX: node.x - NODE_RADIUS_APPROXIMATION,
        minY: node.y - NODE_RADIUS_APPROXIMATION,
        maxX: node.x + NODE_RADIUS_APPROXIMATION,
        maxY: node.y + NODE_RADIUS_APPROXIMATION,
      },
    }));
    
    this.tree.clear();
    this.tree.load(indexedNodes);
  }
  
  /**
   * Query nodes in a bounding box (viewport)
   */
  queryViewport(bbox: BoundingBox): SkillNode[] {
    return this.tree.search(bbox);
  }
  
  /**
   * Find nearest nodes to a point
   */
  findNearest(x: number, y: number, maxResults: number = 10): SkillNode[] {
    const searchRadius = 100;
    const bbox: BoundingBox = {
      minX: x - searchRadius,
      minY: y - searchRadius,
      maxX: x + searchRadius,
      maxY: y + searchRadius,
    };
    
    const candidates = this.tree.search(bbox);
    
    // Calculate distances and sort
    const withDistance = candidates.map(node => ({
      node,
      distance: Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2)),
    }));
    
    withDistance.sort((a, b) => a.distance - b.distance);
    
    return withDistance.slice(0, maxResults).map(item => item.node);
  }
}

/**
 * Main skill tree service
 */
export class SkillTreeService {
  private index: SkillTreeIndex;
  private data: SkillTreeData | null = null;
  
  constructor() {
    this.index = new SkillTreeIndex();
  }
  
  /**
   * Load skill tree from static JSON file
   */
  async loadFromStatic(path: string = '/static/skilltree.json'): Promise<SkillTreeData> {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load skill tree: ${response.statusText}`);
      }
      
      const data = await response.json() as SkillTreeData;
      this.data = data;
      this.index.buildIndex(data.nodes);
      
      return data;
    } catch (error) {
      console.error('Error loading skill tree:', error);
      throw error;
    }
  }
  
  /**
   * Load skill tree classes metadata
   */
  async loadClasses(): Promise<SkillTreeClass[]> {
    try {
      const response = await fetch('/api/skilltree/classes');
      if (!response.ok) {
        // Fallback to static data if API not available
        if (this.data) {
          return this.data.classes;
        }
        throw new Error('No skill tree data loaded');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error loading classes:', error);
      // Return default classes if available
      if (this.data) {
        return this.data.classes;
      }
      throw error;
    }
  }
  
  /**
   * Load nodes for a specific class in a bounding box (chunked loading)
   */
  async loadClassNodes(
    classId: string,
    bbox?: BoundingBox
  ): Promise<{ nodes: SkillNode[]; connections: any[] }> {
    try {
      const params = new URLSearchParams();
      if (bbox) {
        params.append('bbox', `${bbox.minX},${bbox.minY},${bbox.maxX},${bbox.maxY}`);
      }
      
      const url = `/api/skilltree/class/${classId}/nodes?${params.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        // Fallback to using indexed local data
        if (this.data && bbox) {
          const nodes = this.index.queryViewport(bbox);
          const nodeIds = new Set(nodes.map(n => n.id));
          const connections = this.data.connections.filter(
            conn => nodeIds.has(conn.from) && nodeIds.has(conn.to)
          );
          return { nodes, connections };
        }
        throw new Error('API not available and no local data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error loading class nodes:', error);
      
      // Final fallback: return all data if we have it
      if (this.data) {
        return {
          nodes: this.data.nodes,
          connections: this.data.connections,
        };
      }
      
      throw error;
    }
  }
  
  /**
   * Query nodes in viewport
   */
  queryViewport(bbox: BoundingBox): SkillNode[] {
    return this.index.queryViewport(bbox);
  }
  
  /**
   * Find nodes by name (search)
   */
  searchNodes(query: string, maxResults: number = 20): SkillNode[] {
    if (!this.data) {
      return [];
    }
    
    const lowerQuery = query.toLowerCase();
    const results: Array<{ node: SkillNode; score: number }> = [];
    
    for (const node of this.data.nodes) {
      const nameLower = node.name.toLowerCase();
      const descLower = (node.description || '').toLowerCase();
      
      let score = 0;
      
      // Exact match
      if (nameLower === lowerQuery) {
        score = 100;
      }
      // Starts with
      else if (nameLower.startsWith(lowerQuery)) {
        score = 80;
      }
      // Contains
      else if (nameLower.includes(lowerQuery)) {
        score = 60;
      }
      // Description contains
      else if (descLower.includes(lowerQuery)) {
        score = 40;
      }
      // Stats match
      else if (node.stats?.some(stat => 
        stat.name.toLowerCase().includes(lowerQuery)
      )) {
        score = 50;
      }
      
      if (score > 0) {
        results.push({ node, score });
      }
    }
    
    // Sort by score and return top results
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, maxResults).map(r => r.node);
  }
  
  /**
   * Get tree bounds
   */
  getBounds(): BoundingBox | null {
    if (!this.data) {
      return null;
    }
    
    if (this.data.bounds) {
      return this.data.bounds;
    }
    
    // Calculate bounds from nodes
    if (this.data.nodes.length === 0) {
      return null;
    }
    
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    
    for (const node of this.data.nodes) {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x);
      maxY = Math.max(maxY, node.y);
    }
    
    return { minX, minY, maxX, maxY };
  }
  
  /**
   * Get loaded data
   */
  getData(): SkillTreeData | null {
    return this.data;
  }
}

// Singleton instance
let serviceInstance: SkillTreeService | null = null;

/**
 * Get or create service instance
 */
export function getSkillTreeService(): SkillTreeService {
  if (!serviceInstance) {
    serviceInstance = new SkillTreeService();
  }
  return serviceInstance;
}
