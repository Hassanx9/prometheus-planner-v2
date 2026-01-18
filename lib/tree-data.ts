// PoE 2 Passive Tree Data Types and Utilities

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

// Class starting positions on the tree (normalized coordinates)
export const CLASS_STARTS: Record<string, { x: number; y: number; name: string; color: string }> = {
  'Witch': { x: 0.5, y: 0.15, name: 'Witch', color: '#9b59b6' },
  'Ranger': { x: 0.8, y: 0.5, name: 'Ranger', color: '#2ecc71' },
  'Warrior': { x: 0.2, y: 0.85, name: 'Warrior', color: '#e74c3c' },
  'Mercenary': { x: 0.8, y: 0.7, name: 'Mercenary', color: '#c5a059' },
  'Monk': { x: 0.35, y: 0.4, name: 'Monk', color: '#3498db' },
  'Sorceress': { x: 0.65, y: 0.25, name: 'Sorceress', color: '#7ecce0' },
};

// Calculate distance between two nodes
export function getNodeDistance(node1: TreeNode, node2: TreeNode): number {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Find nearby nodes for connections
export function findNearbyNodes(
  node: TreeNode,
  allNodes: TreeNode[],
  maxDistance: number = 0.02
): TreeNode[] {
  return allNodes.filter(
    (other) => other.id !== node.id && getNodeDistance(node, other) < maxDistance
  );
}

// Build connections based on proximity
export function buildConnections(nodes: TreeNode[]): { from: string; to: string }[] {
  const connections: { from: string; to: string }[] = [];
  const connectionSet = new Set<string>();

  nodes.forEach((node) => {
    const nearby = findNearbyNodes(node, nodes, 0.025);
    nearby.forEach((nearNode) => {
      const key1 = `${node.id}-${nearNode.id}`;
      const key2 = `${nearNode.id}-${node.id}`;
      if (!connectionSet.has(key1) && !connectionSet.has(key2)) {
        connections.push({ from: node.id, to: nearNode.id });
        connectionSet.add(key1);
      }
    });
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
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const adjacencyList = new Map<string, string[]>();

  // Build adjacency list
  nodes.forEach((n) => adjacencyList.set(n.id, []));
  connections.forEach((conn) => {
    adjacencyList.get(conn.from)?.push(conn.to);
    adjacencyList.get(conn.to)?.push(conn.from);
  });

  // BFS
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

  return []; // No path found
}

// Calculate total stats from allocated nodes
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
    life: 0,
    mana: 0,
    energyShield: 0,
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    criticalChance: 0,
    attackSpeed: 0,
    castSpeed: 0,
    movementSpeed: 0,
    damagePhysical: 0,
    damageFire: 0,
    damageCold: 0,
    damageLightning: 0,
    damageChaos: 0,
    armour: 0,
    evasion: 0,
    blockChance: 0,
  };

  allocatedNodes.forEach((node) => {
    const desc = descriptions[node.id];
    if (!desc?.stats) return;

    desc.stats.forEach((stat) => {
      const lower = stat.toLowerCase();
      
      // Parse common stat patterns
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

// Generate shareable build code
export function generateBuildCode(allocatedNodeIds: string[]): string {
  const data = JSON.stringify(allocatedNodeIds);
  return btoa(data);
}

// Parse build code back to node IDs
export function parseBuildCode(code: string): string[] {
  try {
    const data = atob(code);
    return JSON.parse(data);
  } catch {
    return [];
  }
}
