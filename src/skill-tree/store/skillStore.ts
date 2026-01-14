/**
 * Skill Tree State Management
 * Zustand store for managing skill allocations, points, and undo/redo
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  SkillNode,
  SkillConnection,
  SkillClass,
  AllocationState,
  HistoryAction,
  SkillTreeData,
} from '../models/skill';
import { findShortestPath, canDeallocate } from '../utils/pathfinding';

interface SkillTreeStore {
  // Data
  nodesById: Map<string, SkillNode>;
  connections: SkillConnection[];
  allocatedIds: Set<string>;
  
  // State
  selectedClass?: SkillClass;
  totalPoints: number;
  maxPoints: number;
  
  // History
  undoStack: HistoryAction[];
  redoStack: HistoryAction[];
  maxHistorySize: number;
  
  // Actions
  loadSkillTree: (data: SkillTreeData) => void;
  setClass: (classId: SkillClass) => void;
  allocateNode: (nodeId: string) => boolean;
  deallocateNode: (nodeId: string) => boolean;
  reset: () => void;
  undo: () => void;
  redo: () => void;
  
  // Queries
  isAllocated: (nodeId: string) => boolean;
  canAllocate: (nodeId: string) => boolean;
  getNode: (nodeId: string) => SkillNode | undefined;
  getAllocatedNodes: () => SkillNode[];
  
  // Persistence
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  exportState: () => AllocationState;
  importState: (state: AllocationState) => void;
}

const STORAGE_KEY = 'skilltree_allocations_v1';

export const useSkillTreeStore = create<SkillTreeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      nodesById: new Map(),
      connections: [],
      allocatedIds: new Set(),
      totalPoints: 0,
      maxPoints: 100,
      undoStack: [],
      redoStack: [],
      maxHistorySize: 50,

      // Load skill tree data
      loadSkillTree: (data: SkillTreeData) => {
        const nodesById = new Map<string, SkillNode>();
        data.nodes.forEach(node => nodesById.set(node.id, node));
        
        set({
          nodesById,
          connections: data.connections,
        });
      },

      // Set character class and allocate starting node
      setClass: (classId: SkillClass) => {
        const { nodesById, reset } = get();
        reset();
        
        // Find and allocate the starting node for this class
        const startNode = Array.from(nodesById.values()).find(
          node => node.classRequirement === classId && node.isRoot
        );
        
        if (startNode) {
          set({
            selectedClass: classId,
            allocatedIds: new Set([startNode.id]),
            totalPoints: 1,
          });
        } else {
          set({ selectedClass: classId });
        }
      },

      // Allocate a node (finds path if needed)
      allocateNode: (nodeId: string) => {
        const { nodesById, allocatedIds, connections, totalPoints, maxPoints, undoStack, maxHistorySize } = get();
        const node = nodesById.get(nodeId);
        
        if (!node || allocatedIds.has(nodeId)) {
          return false;
        }
        
        // Check if we have points available
        const pointCost = node.pointCost || 1;
        if (totalPoints + pointCost > maxPoints) {
          return false;
        }
        
        // Find shortest path from any allocated node to target
        const path = findShortestPath(
          nodeId,
          allocatedIds,
          nodesById,
          connections
        );
        
        if (!path || path.length === 0) {
          return false;
        }
        
        // Allocate all nodes in the path
        const newAllocatedIds = new Set(allocatedIds);
        const allocatedPath: string[] = [];
        let pointsAdded = 0;
        
        path.forEach(pathNodeId => {
          if (!newAllocatedIds.has(pathNodeId)) {
            const pathNode = nodesById.get(pathNodeId);
            if (pathNode) {
              newAllocatedIds.add(pathNodeId);
              allocatedPath.push(pathNodeId);
              pointsAdded += pathNode.pointCost || 1;
            }
          }
        });
        
        // Add to history
        const newUndoStack = [...undoStack, {
          type: 'allocate' as const,
          nodeIds: allocatedPath,
          timestamp: Date.now(),
        }];
        
        // Limit stack size
        if (newUndoStack.length > maxHistorySize) {
          newUndoStack.shift();
        }
        
        set({
          allocatedIds: newAllocatedIds,
          totalPoints: totalPoints + pointsAdded,
          undoStack: newUndoStack,
          redoStack: [], // Clear redo stack on new action
        });
        
        return true;
      },

      // Deallocate a node (checks for dependencies)
      deallocateNode: (nodeId: string) => {
        const { nodesById, allocatedIds, connections, totalPoints, undoStack, maxHistorySize } = get();
        const node = nodesById.get(nodeId);
        
        if (!node || !allocatedIds.has(nodeId) || node.isRoot) {
          return false;
        }
        
        // Check if any allocated nodes depend on this one
        if (!canDeallocate(nodeId, allocatedIds, nodesById, connections)) {
          return false;
        }
        
        const newAllocatedIds = new Set(allocatedIds);
        newAllocatedIds.delete(nodeId);
        
        const pointCost = node.pointCost || 1;
        
        // Add to history
        const newUndoStack = [...undoStack, {
          type: 'deallocate' as const,
          nodeIds: [nodeId],
          timestamp: Date.now(),
        }];
        
        if (newUndoStack.length > maxHistorySize) {
          newUndoStack.shift();
        }
        
        set({
          allocatedIds: newAllocatedIds,
          totalPoints: totalPoints - pointCost,
          undoStack: newUndoStack,
          redoStack: [],
        });
        
        return true;
      },

      // Reset all allocations (keeps starting node if class is set)
      reset: () => {
        const { selectedClass, nodesById } = get();
        
        if (selectedClass) {
          const startNode = Array.from(nodesById.values()).find(
            node => node.classRequirement === selectedClass && node.isRoot
          );
          
          if (startNode) {
            set({
              allocatedIds: new Set([startNode.id]),
              totalPoints: 1,
              undoStack: [],
              redoStack: [],
            });
            return;
          }
        }
        
        set({
          allocatedIds: new Set(),
          totalPoints: 0,
          undoStack: [],
          redoStack: [],
        });
      },

      // Undo last action
      undo: () => {
        const { undoStack, redoStack, allocatedIds, totalPoints, nodesById } = get();
        
        if (undoStack.length === 0) {
          return;
        }
        
        const action = undoStack[undoStack.length - 1];
        const newUndoStack = undoStack.slice(0, -1);
        const newRedoStack = [...redoStack, action];
        const newAllocatedIds = new Set(allocatedIds);
        
        let pointsChanged = 0;
        
        if (action.type === 'allocate') {
          // Remove allocated nodes
          action.nodeIds.forEach(nodeId => {
            newAllocatedIds.delete(nodeId);
            const node = nodesById.get(nodeId);
            if (node) {
              pointsChanged -= node.pointCost || 1;
            }
          });
        } else {
          // Re-add deallocated nodes
          action.nodeIds.forEach(nodeId => {
            newAllocatedIds.add(nodeId);
            const node = nodesById.get(nodeId);
            if (node) {
              pointsChanged += node.pointCost || 1;
            }
          });
        }
        
        set({
          allocatedIds: newAllocatedIds,
          totalPoints: totalPoints + pointsChanged,
          undoStack: newUndoStack,
          redoStack: newRedoStack,
        });
      },

      // Redo last undone action
      redo: () => {
        const { undoStack, redoStack, allocatedIds, totalPoints, nodesById } = get();
        
        if (redoStack.length === 0) {
          return;
        }
        
        const action = redoStack[redoStack.length - 1];
        const newRedoStack = redoStack.slice(0, -1);
        const newUndoStack = [...undoStack, action];
        const newAllocatedIds = new Set(allocatedIds);
        
        let pointsChanged = 0;
        
        if (action.type === 'allocate') {
          // Re-add allocated nodes
          action.nodeIds.forEach(nodeId => {
            newAllocatedIds.add(nodeId);
            const node = nodesById.get(nodeId);
            if (node) {
              pointsChanged += node.pointCost || 1;
            }
          });
        } else {
          // Remove deallocated nodes
          action.nodeIds.forEach(nodeId => {
            newAllocatedIds.delete(nodeId);
            const node = nodesById.get(nodeId);
            if (node) {
              pointsChanged -= node.pointCost || 1;
            }
          });
        }
        
        set({
          allocatedIds: newAllocatedIds,
          totalPoints: totalPoints + pointsChanged,
          undoStack: newUndoStack,
          redoStack: newRedoStack,
        });
      },

      // Query functions
      isAllocated: (nodeId: string) => {
        return get().allocatedIds.has(nodeId);
      },

      canAllocate: (nodeId: string) => {
        const { nodesById, allocatedIds, connections, totalPoints, maxPoints } = get();
        const node = nodesById.get(nodeId);
        
        if (!node || allocatedIds.has(nodeId)) {
          return false;
        }
        
        const pointCost = node.pointCost || 1;
        if (totalPoints + pointCost > maxPoints) {
          return false;
        }
        
        const path = findShortestPath(nodeId, allocatedIds, nodesById, connections);
        return path !== null && path.length > 0;
      },

      getNode: (nodeId: string) => {
        return get().nodesById.get(nodeId);
      },

      getAllocatedNodes: () => {
        const { nodesById, allocatedIds } = get();
        return Array.from(allocatedIds)
          .map(id => nodesById.get(id))
          .filter((node): node is SkillNode => node !== undefined);
      },

      // Persistence
      saveToLocalStorage: () => {
        const state = get().exportState();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      },

      loadFromLocalStorage: () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const state = JSON.parse(stored) as AllocationState;
            get().importState(state);
          } catch (error) {
            console.error('Failed to load skill tree state:', error);
          }
        }
      },

      exportState: (): AllocationState => {
        const { selectedClass, allocatedIds, totalPoints } = get();
        return {
          classId: selectedClass || 'warrior',
          allocatedNodeIds: Array.from(allocatedIds),
          totalPoints,
          version: '1.0',
          timestamp: Date.now(),
        };
      },

      importState: (state: AllocationState) => {
        set({
          selectedClass: state.classId,
          allocatedIds: new Set(state.allocatedNodeIds),
          totalPoints: state.totalPoints,
        });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        selectedClass: state.selectedClass,
        allocatedIds: Array.from(state.allocatedIds),
        totalPoints: state.totalPoints,
      }),
    }
  )
);
