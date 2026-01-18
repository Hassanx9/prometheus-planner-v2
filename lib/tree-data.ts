// PoE 2 Passive Tree Data Types and Utilities
// Proper tree structure with clean connections (not a chaotic web)

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
 * Build clean tree connections using:
 * 1. k-Nearest Neighbors with local direction preference
 * 2. Minimum Spanning Tree for backbone
 * 3. Controlled additional connections for branching
 * 
 * This prevents the chaotic web and creates organized paths
 */
export function buildConnections(nodes: TreeNode[]): { from: string; to: string }[] {
  if (nodes.length < 2) return [];

  const connections: { from: string; to: string }[] = [];
  const connectionSet = new Set<string>();

  // Helper to add connection if not exists
  const addConnection = (fromId: string, toId: string) => {
    const key1 = `${fromId}-${toId}`;
    const key2 = `${toId}-${fromId}`;
    if (!connectionSet.has(key1) && !connectionSet.has(key2)) {
      connections.push({ from: fromId, to: toId });
      connectionSet.add(key1);
      connectionSet.add(key2);
    }
  };

  // Build a spatial index for efficient neighbor lookup
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Step 1: Build Minimum Spanning Tree using Prim's algorithm
  // This creates the backbone of clean paths
  const mstEdges: { from: string; to: string; dist: number }[] = [];
  const inMST = new Set<string>();
  const candidates: { from: string; to: string; dist: number }[] = [];

  // Start from the center-most node (usually a class start or central notable)
  let startNode = nodes.reduce((closest, node) => {
    const distToCenter = Math.sqrt(Math.pow(node.x - 0.5, 2) + Math.pow(node.y - 0.5, 2));
    const closestDistToCenter = Math.sqrt(Math.pow(closest.x - 0.5, 2) + Math.pow(closest.y - 0.5, 2));
    return distToCenter < closestDistToCenter ? node : closest;
  });

  // For class starts, prefer those
  const classStarts = nodes.filter(n => n.kind === 'start');
  if (classStarts.length > 0) {
    startNode = classStarts[0];
  }

  inMST.add(startNode.id);

  // Add initial edges from start node
  nodes.forEach(node => {
    if (node.id !== startNode.id) {
      const dist = getNodeDistance(startNode, node);
      // Only consider nearby nodes (not across the whole tree)
      if (dist < 0.08) {
        candidates.push({ from: startNode.id, to: node.id, dist });
      }
    }
  });

  // Build MST with limited edge lengths
  while (candidates.length > 0 && inMST.size < nodes.length) {
    // Sort by distance and pick the shortest
    candidates.sort((a, b) => a.dist - b.dist);
    
    // Find the shortest edge to a node not in MST
    let bestIdx = -1;
    for (let i = 0; i < candidates.length; i++) {
      if (!inMST.has(candidates[i].to)) {
        bestIdx = i;
        break;
      }
    }

    if (bestIdx === -1) break;

    const best = candidates.splice(bestIdx, 1)[0];
    if (inMST.has(best.to)) continue;

    mstEdges.push(best);
    inMST.add(best.to);

    // Add new edges from the newly added node
    const newNode = nodeMap.get(best.to)!;
    nodes.forEach(node => {
      if (!inMST.has(node.id)) {
        const dist = getNodeDistance(newNode, node);
        // Limit connection distance based on node type
        const maxDist = node.kind === 'small' ? 0.025 : node.kind === 'notable' ? 0.04 : 0.06;
        if (dist < maxDist) {
          candidates.push({ from: best.to, to: node.id, dist });
        }
      }
    });

    // Clean up candidates that are now in MST
    for (let i = candidates.length - 1; i >= 0; i--) {
      if (inMST.has(candidates[i].to)) {
        candidates.splice(i, 1);
      }
    }
  }

  // Add MST edges to connections
  mstEdges.forEach(edge => addConnection(edge.from, edge.to));

  // Step 2: For nodes with no connections yet (isolated), connect to nearest
  const connectedNodes = new Set<string>();
  connections.forEach(conn => {
    connectedNodes.add(conn.from);
    connectedNodes.add(conn.to);
  });

  nodes.forEach(node => {
    if (!connectedNodes.has(node.id)) {
      // Find nearest connected node
      let nearest: TreeNode | null = null;
      let nearestDist = Infinity;
      
      nodes.forEach(other => {
        if (connectedNodes.has(other.id)) {
          const dist = getNodeDistance(node, other);
          if (dist < nearestDist) {
            nearest = other;
            nearestDist = dist;
          }
        }
      });

      if (nearest && nearestDist < 0.1) {
        addConnection(node.id, nearest.id);
        connectedNodes.add(node.id);
      }
    }
  });

  // Step 3: Add limited additional connections for important nodes (keystones, notables)
  // Each notable/keystone can have up to 3-4 connections total
  const connectionCount = new Map<string, number>();
  connections.forEach(conn => {
    connectionCount.set(conn.from, (connectionCount.get(conn.from) || 0) + 1);
    connectionCount.set(conn.to, (connectionCount.get(conn.to) || 0) + 1);
  });

  nodes.forEach(node => {
    if (node.kind !== 'small') {
      const currentCount = connectionCount.get(node.id) || 0;
      const maxConnections = node.kind === 'keystone' ? 4 : node.kind === 'notable' ? 3 : 2;
      
      if (currentCount < maxConnections) {
        // Find nearest unconnected neighbors
        const unconnectedNeighbors = nodes
          .filter(other => {
            if (other.id === node.id) return false;
            const key1 = `${node.id}-${other.id}`;
            const key2 = `${other.id}-${node.id}`;
            return !connectionSet.has(key1) && !connectionSet.has(key2);
          })
          .map(other => ({ node: other, dist: getNodeDistance(node, other) }))
          .filter(item => item.dist < 0.035)
          .sort((a, b) => a.dist - b.dist);

        // Add up to (maxConnections - currentCount) new connections
        const toAdd = Math.min(maxConnections - currentCount, unconnectedNeighbors.length);
        for (let i = 0; i < toAdd; i++) {
          addConnection(node.id, unconnectedNeighbors[i].node.id);
        }
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
