// PoE 2 Passive Tree Data Types and Utilities
// Creates clean, organized connections like the official PoE 2 tree

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
 * Build clean tree connections using k-Nearest Neighbors approach
 * Each node connects to its closest neighbors (limited count)
 * This creates organized paths without chaotic web
 */
export function buildConnections(nodes: TreeNode[]): { from: string; to: string }[] {
  if (nodes.length < 2) return [];

  const connections: { from: string; to: string }[] = [];
  const connectionSet = new Set<string>();
  const nodeConnectionCount = new Map<string, number>();

  // Initialize connection counts
  nodes.forEach(n => nodeConnectionCount.set(n.id, 0));

  // Helper to add connection if not exists and under limit
  const addConnection = (fromId: string, toId: string): boolean => {
    const key1 = `${fromId}-${toId}`;
    const key2 = `${toId}-${fromId}`;
    if (connectionSet.has(key1) || connectionSet.has(key2)) return false;
    
    connections.push({ from: fromId, to: toId });
    connectionSet.add(key1);
    connectionSet.add(key2);
    nodeConnectionCount.set(fromId, (nodeConnectionCount.get(fromId) || 0) + 1);
    nodeConnectionCount.set(toId, (nodeConnectionCount.get(toId) || 0) + 1);
    return true;
  };

  // Max connections per node type
  const maxConnections = (kind: string) => {
    switch (kind) {
      case 'start': return 6;
      case 'keystone': return 4;
      case 'notable': return 4;
      case 'small': return 2;
      default: return 2;
    }
  };

  // Distance thresholds for connections
  const maxDistance = (kind1: string, kind2: string) => {
    // Small nodes connect very close only
    if (kind1 === 'small' && kind2 === 'small') return 0.018;
    // Small to notable/keystone slightly further
    if (kind1 === 'small' || kind2 === 'small') return 0.022;
    // Notable to notable
    if (kind1 === 'notable' && kind2 === 'notable') return 0.04;
    // Keystones can reach further
    if (kind1 === 'keystone' || kind2 === 'keystone') return 0.05;
    // Starts reach far
    if (kind1 === 'start' || kind2 === 'start') return 0.08;
    return 0.025;
  };

  // Sort nodes by importance (starts first, then keystones, then notables, then small)
  const priorityOrder = { 'start': 0, 'keystone': 1, 'notable': 2, 'small': 3 };
  const sortedNodes = [...nodes].sort((a, b) => {
    return (priorityOrder[a.kind] || 4) - (priorityOrder[b.kind] || 4);
  });

  // For each node, connect to nearest neighbors within distance threshold
  sortedNodes.forEach(node => {
    const currentCount = nodeConnectionCount.get(node.id) || 0;
    const max = maxConnections(node.kind);
    
    if (currentCount >= max) return;

    // Find all potential neighbors sorted by distance
    const neighbors = nodes
      .filter(other => other.id !== node.id)
      .map(other => ({
        node: other,
        dist: getNodeDistance(node, other),
        maxAllowed: maxDistance(node.kind, other.kind)
      }))
      .filter(item => item.dist <= item.maxAllowed)
      .sort((a, b) => a.dist - b.dist);

    // Connect to nearest neighbors up to max
    let added = 0;
    for (const neighbor of neighbors) {
      if (currentCount + added >= max) break;
      
      const neighborCount = nodeConnectionCount.get(neighbor.node.id) || 0;
      const neighborMax = maxConnections(neighbor.node.kind);
      
      if (neighborCount < neighborMax) {
        if (addConnection(node.id, neighbor.node.id)) {
          added++;
        }
      }
    }
  });

  // Second pass: Ensure connectivity - connect isolated clusters
  // Find connected components
  const findComponent = (nodeId: string, visited: Set<string>): Set<string> => {
    const component = new Set<string>();
    const queue = [nodeId];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      
      visited.add(current);
      component.add(current);
      
      // Find connected nodes
      connections.forEach(conn => {
        if (conn.from === current && !visited.has(conn.to)) queue.push(conn.to);
        if (conn.to === current && !visited.has(conn.from)) queue.push(conn.from);
      });
    }
    
    return component;
  };

  const visited = new Set<string>();
  const components: Set<string>[] = [];
  
  nodes.forEach(node => {
    if (!visited.has(node.id)) {
      components.push(findComponent(node.id, visited));
    }
  });

  // Connect separate components to nearest nodes
  if (components.length > 1) {
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    
    for (let i = 1; i < components.length; i++) {
      const comp = components[i];
      const mainComp = components[0];
      
      // Find closest pair between this component and main component
      let bestDist = Infinity;
      let bestPair: [string, string] | null = null;
      
      comp.forEach(nodeId1 => {
        mainComp.forEach(nodeId2 => {
          const node1 = nodeMap.get(nodeId1);
          const node2 = nodeMap.get(nodeId2);
          if (node1 && node2) {
            const dist = getNodeDistance(node1, node2);
            if (dist < bestDist && dist < 0.15) {
              bestDist = dist;
              bestPair = [nodeId1, nodeId2];
            }
          }
        });
      });
      
      if (bestPair) {
        addConnection(bestPair[0], bestPair[1]);
        // Merge into main component
        comp.forEach(id => mainComp.add(id));
      }
    }
  }

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
