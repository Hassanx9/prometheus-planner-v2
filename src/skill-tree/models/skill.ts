/**
 * Skill Tree Data Models
 * Core type definitions for the skill tree system
 */

export type NodeType = 'small' | 'notable' | 'keystone' | 'start' | 'mastery' | 'ascendancy';
export type SkillClass = 'warrior' | 'ranger' | 'witch' | 'duelist' | 'templar' | 'shadow' | 'scion';
export type StatType = 'strength' | 'dexterity' | 'intelligence' | 'life' | 'mana' | 'damage' | 'defense' | 'speed';

/**
 * Individual skill tree node
 */
export interface SkillNode {
  id: string;
  name: string;
  description?: string;
  x: number;
  y: number;
  type: NodeType;
  stats?: SkillStat[];
  imageUrl?: string;
  icon?: string;
  connectedTo: string[]; // IDs of connected nodes
  classRequirement?: SkillClass;
  pointCost?: number; // Usually 1, but could be more for special nodes
  isRoot?: boolean; // Starting nodes that don't require prerequisites
}

/**
 * Stat modifier provided by a node
 */
export interface SkillStat {
  type: StatType;
  name: string;
  value: number | string;
  isPercent?: boolean;
}

/**
 * Connection between two nodes
 */
export interface SkillConnection {
  from: string;
  to: string;
  isActive?: boolean; // Whether this connection is part of an allocated path
}

/**
 * Character class with starting position
 */
export interface SkillTreeClass {
  id: SkillClass;
  name: string;
  description: string;
  startNodeId: string;
  color: string; // Hex color for UI theming
}

/**
 * Complete skill tree dataset
 */
export interface SkillTreeData {
  version: string;
  classes: SkillTreeClass[];
  nodes: SkillNode[];
  connections: SkillConnection[];
  bounds?: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

/**
 * Allocation state for a character
 */
export interface AllocationState {
  classId: SkillClass;
  allocatedNodeIds: string[];
  totalPoints: number;
  version: string;
  timestamp: number;
}

/**
 * Bounding box for spatial queries
 */
export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Node with bounding box for spatial indexing
 */
export interface IndexedNode extends SkillNode {
  bbox: BoundingBox;
}

/**
 * Search result
 */
export interface SearchResult {
  node: SkillNode;
  score: number; // Relevance score
}

/**
 * Undo/Redo action
 */
export interface HistoryAction {
  type: 'allocate' | 'deallocate';
  nodeIds: string[]; // Can be multiple for path allocation
  timestamp: number;
}
