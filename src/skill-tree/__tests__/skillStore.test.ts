/**
 * Skill Store tests
 */

import { useSkillTreeStore } from '../store/skillStore';
import type { SkillTreeData } from '../models/skill';

// Mock skill tree data
const mockSkillTree: SkillTreeData = {
  version: '1.0.0',
  classes: [
    {
      id: 'warrior',
      name: 'Warrior',
      description: 'Test warrior',
      startNodeId: 'start',
      color: '#ff0000',
    },
  ],
  nodes: [
    {
      id: 'start',
      name: 'Start',
      x: 0,
      y: 0,
      type: 'start',
      connectedTo: ['a'],
      classRequirement: 'warrior',
      isRoot: true,
    },
    {
      id: 'a',
      name: 'A',
      x: 100,
      y: 0,
      type: 'small',
      connectedTo: ['start', 'b'],
      pointCost: 1,
    },
    {
      id: 'b',
      name: 'B',
      x: 200,
      y: 0,
      type: 'notable',
      connectedTo: ['a'],
      pointCost: 1,
    },
  ],
  connections: [
    { from: 'start', to: 'a' },
    { from: 'a', to: 'b' },
  ],
};

describe('SkillTreeStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useSkillTreeStore.setState({
      nodesById: new Map(),
      connections: [],
      allocatedIds: new Set(),
      totalPoints: 0,
      undoStack: [],
      redoStack: [],
    });
  });
  
  describe('loadSkillTree', () => {
    it('should load skill tree data', () => {
      const { loadSkillTree } = useSkillTreeStore.getState();
      
      loadSkillTree(mockSkillTree);
      
      const state = useSkillTreeStore.getState();
      expect(state.nodesById.size).toBe(3);
      expect(state.nodesById.get('start')).toBeDefined();
    });
  });
  
  describe('setClass', () => {
    it('should set class and allocate starting node', () => {
      const { loadSkillTree, setClass, allocatedIds, totalPoints } = useSkillTreeStore.getState();
      
      loadSkillTree(mockSkillTree);
      setClass('warrior');
      
      const state = useSkillTreeStore.getState();
      expect(state.selectedClass).toBe('warrior');
      expect(state.allocatedIds.has('start')).toBe(true);
      expect(state.totalPoints).toBe(1);
    });
  });
  
  describe('allocateNode', () => {
    beforeEach(() => {
      const { loadSkillTree, setClass } = useSkillTreeStore.getState();
      loadSkillTree(mockSkillTree);
      setClass('warrior');
    });
    
    it('should allocate connected nodes with path', () => {
      const { allocateNode } = useSkillTreeStore.getState();
      
      const result = allocateNode('b');
      const state = useSkillTreeStore.getState();
      
      expect(result).toBe(true);
      expect(state.allocatedIds.has('a')).toBe(true);
      expect(state.allocatedIds.has('b')).toBe(true);
      expect(state.totalPoints).toBe(3); // start + a + b
    });
    
    it('should not allocate already allocated nodes', () => {
      const { allocateNode } = useSkillTreeStore.getState();
      
      allocateNode('a');
      const pointsBefore = useSkillTreeStore.getState().totalPoints;
      
      const result = allocateNode('a');
      const pointsAfter = useSkillTreeStore.getState().totalPoints;
      
      expect(result).toBe(false);
      expect(pointsBefore).toBe(pointsAfter);
    });
    
    it('should add to undo stack', () => {
      const { allocateNode } = useSkillTreeStore.getState();
      
      allocateNode('a');
      
      const state = useSkillTreeStore.getState();
      expect(state.undoStack.length).toBe(1);
      expect(state.undoStack[0].type).toBe('allocate');
    });
  });
  
  describe('deallocateNode', () => {
    beforeEach(() => {
      const { loadSkillTree, setClass, allocateNode } = useSkillTreeStore.getState();
      loadSkillTree(mockSkillTree);
      setClass('warrior');
      allocateNode('b'); // Allocates a and b
    });
    
    it('should deallocate leaf nodes', () => {
      const { deallocateNode } = useSkillTreeStore.getState();
      
      const result = deallocateNode('b');
      const state = useSkillTreeStore.getState();
      
      expect(result).toBe(true);
      expect(state.allocatedIds.has('b')).toBe(false);
      expect(state.totalPoints).toBe(2); // start + a
    });
    
    it('should not deallocate nodes with dependents', () => {
      const { deallocateNode } = useSkillTreeStore.getState();
      
      const result = deallocateNode('a');
      const state = useSkillTreeStore.getState();
      
      expect(result).toBe(false);
      expect(state.allocatedIds.has('a')).toBe(true);
    });
    
    it('should not deallocate root nodes', () => {
      const { deallocateNode } = useSkillTreeStore.getState();
      
      const result = deallocateNode('start');
      
      expect(result).toBe(false);
    });
  });
  
  describe('undo/redo', () => {
    beforeEach(() => {
      const { loadSkillTree, setClass } = useSkillTreeStore.getState();
      loadSkillTree(mockSkillTree);
      setClass('warrior');
    });
    
    it('should undo allocation', () => {
      const { allocateNode, undo } = useSkillTreeStore.getState();
      
      allocateNode('a');
      expect(useSkillTreeStore.getState().allocatedIds.has('a')).toBe(true);
      
      undo();
      expect(useSkillTreeStore.getState().allocatedIds.has('a')).toBe(false);
    });
    
    it('should redo allocation', () => {
      const { allocateNode, undo, redo } = useSkillTreeStore.getState();
      
      allocateNode('a');
      undo();
      redo();
      
      expect(useSkillTreeStore.getState().allocatedIds.has('a')).toBe(true);
    });
    
    it('should clear redo stack on new action', () => {
      const { allocateNode, undo } = useSkillTreeStore.getState();
      
      allocateNode('a');
      undo();
      
      expect(useSkillTreeStore.getState().redoStack.length).toBe(1);
      
      allocateNode('a');
      expect(useSkillTreeStore.getState().redoStack.length).toBe(0);
    });
  });
  
  describe('reset', () => {
    it('should reset to starting node', () => {
      const { loadSkillTree, setClass, allocateNode, reset } = useSkillTreeStore.getState();
      
      loadSkillTree(mockSkillTree);
      setClass('warrior');
      allocateNode('b');
      
      reset();
      
      const state = useSkillTreeStore.getState();
      expect(state.allocatedIds.size).toBe(1);
      expect(state.allocatedIds.has('start')).toBe(true);
      expect(state.totalPoints).toBe(1);
    });
  });
});
