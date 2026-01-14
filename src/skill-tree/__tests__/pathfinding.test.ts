/**
 * Pathfinding tests
 */

import { findShortestPath, canDeallocate } from '../utils/pathfinding';
import type { SkillNode, SkillConnection } from '../models/skill';

describe('Pathfinding', () => {
  let nodesById: Map<string, SkillNode>;
  let connections: SkillConnection[];
  
  beforeEach(() => {
    // Create a simple tree structure
    // root -> a -> b -> c
    //      -> d
    nodesById = new Map([
      ['root', {
        id: 'root',
        name: 'Root',
        x: 0,
        y: 0,
        type: 'start',
        connectedTo: ['a', 'd'],
        isRoot: true,
      }],
      ['a', {
        id: 'a',
        name: 'A',
        x: 100,
        y: 0,
        type: 'small',
        connectedTo: ['root', 'b'],
      }],
      ['b', {
        id: 'b',
        name: 'B',
        x: 200,
        y: 0,
        type: 'small',
        connectedTo: ['a', 'c'],
      }],
      ['c', {
        id: 'c',
        name: 'C',
        x: 300,
        y: 0,
        type: 'notable',
        connectedTo: ['b'],
      }],
      ['d', {
        id: 'd',
        name: 'D',
        x: 0,
        y: 100,
        type: 'small',
        connectedTo: ['root'],
      }],
    ]);
    
    connections = [
      { from: 'root', to: 'a' },
      { from: 'a', to: 'b' },
      { from: 'b', to: 'c' },
      { from: 'root', to: 'd' },
    ];
  });
  
  describe('findShortestPath', () => {
    it('should find path from root to leaf', () => {
      const allocatedIds = new Set(['root']);
      const path = findShortestPath('c', allocatedIds, nodesById, connections);
      
      expect(path).not.toBeNull();
      expect(path).toEqual(['a', 'b', 'c']);
    });
    
    it('should find path from allocated node', () => {
      const allocatedIds = new Set(['root', 'a']);
      const path = findShortestPath('c', allocatedIds, nodesById, connections);
      
      expect(path).not.toBeNull();
      expect(path).toEqual(['b', 'c']);
    });
    
    it('should return null for unreachable node', () => {
      const allocatedIds = new Set(['d']); // Only d is allocated
      const path = findShortestPath('c', allocatedIds, nodesById, connections);
      
      expect(path).toBeNull();
    });
    
    it('should handle root nodes', () => {
      const allocatedIds = new Set<string>();
      const path = findShortestPath('root', allocatedIds, nodesById, connections);
      
      expect(path).toEqual(['root']);
    });
  });
  
  describe('canDeallocate', () => {
    it('should allow deallocating leaf nodes', () => {
      const allocatedIds = new Set(['root', 'a', 'b', 'c']);
      const result = canDeallocate('c', allocatedIds, nodesById, connections);
      
      expect(result).toBe(true);
    });
    
    it('should prevent deallocating nodes with dependents', () => {
      const allocatedIds = new Set(['root', 'a', 'b', 'c']);
      const result = canDeallocate('a', allocatedIds, nodesById, connections);
      
      expect(result).toBe(false);
    });
    
    it('should prevent deallocating root nodes', () => {
      const allocatedIds = new Set(['root', 'a']);
      const result = canDeallocate('root', allocatedIds, nodesById, connections);
      
      expect(result).toBe(false);
    });
    
    it('should allow deallocating in branching scenarios', () => {
      const allocatedIds = new Set(['root', 'a', 'd']);
      const result = canDeallocate('d', allocatedIds, nodesById, connections);
      
      expect(result).toBe(true);
    });
  });
});
