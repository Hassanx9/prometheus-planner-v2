// PoE 2 Passive Tree Data Types and Utilities
// Creates clean chain-like connections resembling the official PoE 2 tree

export interface TreeNode {
  id: string;
  x: number; // Normalized 0-1
  y: number; // Normalized 0-1
  kind: 'keystone' | 'notable' | 'small' | 'start';
  name?: string;
  stats?: string[];
  allocated?: boolean;
  connections?: string[];
}

export interface TreeData {
  keystones: TreeNode[];
  notables: TreeNode[];
  smalls: TreeNode[];
  starts: TreeNode[];
  connections: { from: string; to: string }[];
}

export interface NodeDescription {
  name: string;
  stats: string[];
}

export interface NodeDescriptions {
  [key: string]: NodeDescription;
}

// Class starting positions on the tree
export const CLASS_STARTS: Record<string, { x: number; y: number; name: string; color: string }> = {
  'Witch': { x: 0.5, y: 0.15, name: 'Witch', color: '#48c' },
  'Ranger': { x: 0.75, y: 0.65, name: 'Ranger', color: '#4a4' },
  'Warrior': { x: 0.25, y: 0.65, name: 'Warrior', color: '#c44' },
  'Mercenary': { x: 0.7, y: 0.8, name: 'Mercenary', color: '#c5a059' },
  'Monk': { x: 0.5, y: 0.9, name: 'Monk', color: '#888' },
  'Sorceress': { x: 0.35, y: 0.2, name: 'Sorceress', color: '#7ecce0' },
};

// Calculate distance between two nodes
export function getNodeDistance(node1: TreeNode, node2: TreeNode): number {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Build clean chain-like connections for the passive tree.
 * - Small nodes form chains of 2 connections each (like beads on a string)
 * - Notables act as junction points with 3-4 connections
 * - Keystones are end-points with 2-3 connections
 * - Starts are hubs with many connections
 */
export function buildConnections(nodes: TreeNode[]): { from: string; to: string }[] {
  if (nodes.length < 2) return [];

  const connections: { from: string; to: string }[] = [];
  const connectionSet = new Set<string>();
  const nodeConnectionCount = new Map<string, number>();

  // Initialize connection counts
  nodes.forEach(n => nodeConnectionCount.set(n.id, 0));

  // Helper to check if connection exists
  const hasConnection = (fromId: string, toId: string): boolean => {
    return connectionSet.has(`${fromId}-${toId}`) || connectionSet.has(`${toId}-${fromId}`);
  };

  // Helper to add connection
  const addConnection = (fromId: string, toId: string): boolean => {
    if (hasConnection(fromId, toId)) return false;
    
    connections.push({ from: fromId, to: toId });
    connectionSet.add(`${fromId}-${toId}`);
    nodeConnectionCount.set(fromId, (nodeConnectionCount.get(fromId) || 0) + 1);
    nodeConnectionCount.set(toId, (nodeConnectionCount.get(toId) || 0) + 1);
    return true;
  };

  // Get max connections based on node type
  const getMaxConnections = (kind: string): number => {
    switch (kind) {
      case 'start': return 8;
      case 'keystone': return 3;
      case 'notable': return 4;
      case 'small': return 2;
      default: return 2;
    }
  };

  // Separate nodes by type
  const starts = nodes.filter(n => n.kind === 'start');
  const keystones = nodes.filter(n => n.kind === 'keystone');
  const notables = nodes.filter(n => n.kind === 'notable');
  const smalls = nodes.filter(n => n.kind === 'small');
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // PHASE 1: Connect each small node to its single nearest neighbor
  // This creates clean chains
  smalls.forEach(node => {
    const count = nodeConnectionCount.get(node.id) || 0;
    if (count >= 1) return; // Already connected

    // Find the nearest node (prefer smalls, then notables)
    const candidates = [...smalls, ...notables]
      .filter(other => other.id !== node.id)
      .map(other => ({
        node: other,
        dist: getNodeDistance(node, other),
        otherCount: nodeConnectionCount.get(other.id) || 0,
        otherMax: getMaxConnections(other.kind)
      }))
      .filter(item => {
        // Distance threshold based on target type
        const maxDist = item.node.kind === 'small' ? 0.02 : 0.03;
        return item.dist < maxDist && item.otherCount < item.otherMax;
      })
      .sort((a, b) => a.dist - b.dist);

    if (candidates.length > 0) {
      addConnection(node.id, candidates[0].node.id);
    }
  });

  // PHASE 2: Connect remaining small nodes that are still isolated
  smalls.forEach(node => {
    const count = nodeConnectionCount.get(node.id) || 0;
    if (count > 0) return; // Already connected

    // Try to find any nearby node
    const candidates = nodes
      .filter(other => other.id !== node.id)
      .map(other => ({
        node: other,
        dist: getNodeDistance(node, other),
        otherCount: nodeConnectionCount.get(other.id) || 0,
        otherMax: getMaxConnections(other.kind)
      }))
      .filter(item => item.dist < 0.04 && item.otherCount < item.otherMax)
      .sort((a, b) => a.dist - b.dist);

    if (candidates.length > 0) {
      addConnection(node.id, candidates[0].node.id);
    }
  });

  // PHASE 3: Add second connection to small nodes to complete chains
  smalls.forEach(node => {
    const count = nodeConnectionCount.get(node.id) || 0;
    if (count >= 2) return; // Already has 2 connections

    // Find another nearby node to connect
    const candidates = nodes
      .filter(other => other.id !== node.id && !hasConnection(node.id, other.id))
      .map(other => ({
        node: other,
        dist: getNodeDistance(node, other),
        otherCount: nodeConnectionCount.get(other.id) || 0,
        otherMax: getMaxConnections(other.kind)
      }))
      .filter(item => {
        const maxDist = item.node.kind === 'small' ? 0.022 : 0.035;
        return item.dist < maxDist && item.otherCount < item.otherMax;
      })
      .sort((a, b) => a.dist - b.dist);

    if (candidates.length > 0) {
      addConnection(node.id, candidates[0].node.id);
    }
  });

  // PHASE 4: Connect notables to nearby notables (creating the web backbone)
  notables.forEach(node => {
    const count = nodeConnectionCount.get(node.id) || 0;
    const max = getMaxConnections('notable');
    if (count >= max) return;

    const candidates = notables
      .filter(other => other.id !== node.id && !hasConnection(node.id, other.id))
      .map(other => ({
        node: other,
        dist: getNodeDistance(node, other),
        otherCount: nodeConnectionCount.get(other.id) || 0
      }))
      .filter(item => item.dist < 0.06 && item.otherCount < max)
      .sort((a, b) => a.dist - b.dist);

    // Connect to up to 2 nearest notables
    const toConnect = Math.min(2, max - count, candidates.length);
    for (let i = 0; i < toConnect; i++) {
      addConnection(node.id, candidates[i].node.id);
    }
  });

  // PHASE 5: Connect keystones to nearest notables
  keystones.forEach(node => {
    const count = nodeConnectionCount.get(node.id) || 0;
    const max = getMaxConnections('keystone');
    if (count >= max) return;

    const candidates = [...notables, ...smalls]
      .filter(other => !hasConnection(node.id, other.id))
      .map(other => ({
        node: other,
        dist: getNodeDistance(node, other),
        otherCount: nodeConnectionCount.get(other.id) || 0,
        otherMax: getMaxConnections(other.kind)
      }))
      .filter(item => item.dist < 0.05 && item.otherCount < item.otherMax)
      .sort((a, b) => a.dist - b.dist);

    const toConnect = Math.min(max - count, candidates.length);
    for (let i = 0; i < toConnect; i++) {
      addConnection(node.id, candidates[i].node.id);
    }
  });

  // PHASE 6: Connect class starts to nearby nodes
  starts.forEach(node => {
    const count = nodeConnectionCount.get(node.id) || 0;
    const max = getMaxConnections('start');
    if (count >= max) return;

    const candidates = nodes
      .filter(other => other.id !== node.id && other.kind !== 'start' && !hasConnection(node.id, other.id))
      .map(other => ({
        node: other,
        dist: getNodeDistance(node, other),
        otherCount: nodeConnectionCount.get(other.id) || 0,
        otherMax: getMaxConnections(other.kind)
      }))
      .filter(item => item.dist < 0.1)
      .sort((a, b) => a.dist - b.dist);

    const toConnect = Math.min(max - count, candidates.length);
    for (let i = 0; i < toConnect; i++) {
      if (candidates[i].otherCount < candidates[i].otherMax) {
        addConnection(node.id, candidates[i].node.id);
      }
    }
  });

  return connections;
}

// Pathfinding: Find shortest path between two nodes using BFS
export function findPath(
  startId: string,
  endId: string,
  nodes: TreeNode[],
  connections: { from: string; to: string }[]
): string[] {
  const adjacencyList = new Map<string, string[]>();

  nodes.forEach((n) => adjacencyList.set(n.id, []));
  connections.forEach((conn) => {
    adjacencyList.get(conn.from)?.push(conn.to);
    adjacencyList.get(conn.to)?.push(conn.from);
  });

  const queue: { id: string; path: string[] }[] = [{ id: startId, path: [startId] }];
  const visited = new Set<string>([startId]);

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.id === endId) {
      return current.path;
    }

    const neighbors = adjacencyList.get(current.id) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ id: neighbor, path: [...current.path, neighbor] });
      }
    }
  }

  return [];
}

// Stats calculation
export interface StatTotals {
  life: number;
  mana: number;
  energyShield: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  criticalChance: number;
  attackSpeed: number;
  castSpeed: number;
  movementSpeed: number;
  damagePhysical: number;
  damageFire: number;
  damageCold: number;
  damageLightning: number;
  damageChaos: number;
  armour: number;
  evasion: number;
  blockChance: number;
}

export function calculateStats(
  allocatedNodes: TreeNode[],
  descriptions: NodeDescriptions
): StatTotals {
  const stats: StatTotals = {
    life: 0, mana: 0, energyShield: 0,
    strength: 0, dexterity: 0, intelligence: 0,
    criticalChance: 0, attackSpeed: 0, castSpeed: 0, movementSpeed: 0,
    damagePhysical: 0, damageFire: 0, damageCold: 0, damageLightning: 0, damageChaos: 0,
    armour: 0, evasion: 0, blockChance: 0,
  };

  allocatedNodes.forEach((node) => {
    const desc = descriptions[node.id];
    if (!desc?.stats) return;

    desc.stats.forEach((stat) => {
      const lower = stat.toLowerCase();
      const percentMatch = stat.match(/(\d+)%/);
      const flatMatch = stat.match(/\+(\d+)/);
      const value = percentMatch ? parseInt(percentMatch[1]) : flatMatch ? parseInt(flatMatch[1]) : 0;

      if (lower.includes('life')) stats.life += value;
      if (lower.includes('mana')) stats.mana += value;
      if (lower.includes('energy shield')) stats.energyShield += value;
      if (lower.includes('strength')) stats.strength += value;
      if (lower.includes('dexterity')) stats.dexterity += value;
      if (lower.includes('intelligence')) stats.intelligence += value;
      if (lower.includes('critical')) stats.criticalChance += value;
      if (lower.includes('attack speed')) stats.attackSpeed += value;
      if (lower.includes('cast speed')) stats.castSpeed += value;
      if (lower.includes('movement speed')) stats.movementSpeed += value;
      if (lower.includes('physical damage')) stats.damagePhysical += value;
      if (lower.includes('fire damage')) stats.damageFire += value;
      if (lower.includes('cold damage')) stats.damageCold += value;
      if (lower.includes('lightning damage')) stats.damageLightning += value;
      if (lower.includes('chaos damage')) stats.damageChaos += value;
      if (lower.includes('armour')) stats.armour += value;
      if (lower.includes('evasion')) stats.evasion += value;
      if (lower.includes('block')) stats.blockChance += value;
    });
  });

  return stats;
}

export function generateBuildCode(allocatedNodeIds: string[]): string {
  return btoa(JSON.stringify(allocatedNodeIds));
}

export function parseBuildCode(code: string): string[] {
  try {
    return JSON.parse(atob(code));
  } catch {
    return [];
  }
}
