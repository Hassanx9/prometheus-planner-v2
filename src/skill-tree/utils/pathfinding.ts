/**
 * Pathfinding Utilities
 * BFS-based shortest path and dependency checking for skill tree
 */

import type { SkillNode, SkillConnection } from '../models/skill';

/**
 * Find the shortest path from any allocated node to the target node
 * Uses BFS to find the minimal path
 */
export function findShortestPath(
  targetNodeId: string,
  allocatedIds: Set<string>,
  nodesById: Map<string, SkillNode>,
  connections: SkillConnection[]
): string[] | null {
  const targetNode = nodesById.get(targetNodeId);
  if (!targetNode) {
    return null;
  }
  
  // If the node is a root node, it can be allocated directly
  if (targetNode.isRoot) {
    return [targetNodeId];
  }
  
  // Build adjacency map for faster lookups
  const adjacencyMap = buildAdjacencyMap(connections);
  
  // BFS to find shortest path from any allocated node
  const queue: Array<{ nodeId: string; path: string[] }> = [];
  const visited = new Set<string>();
  
  // Start from the target and work backwards to any allocated node
  queue.push({ nodeId: targetNodeId, path: [targetNodeId] });
  visited.add(targetNodeId);
  
  while (queue.length > 0) {
    const { nodeId, path } = queue.shift()!;
    
    // Get neighbors (nodes connected to this one)
    const neighbors = getNeighbors(nodeId, adjacencyMap);
    
    for (const neighborId of neighbors) {
      // If we found an allocated node, we have a path
      if (allocatedIds.has(neighborId)) {
        return path;
      }
      
      // Continue searching
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push({
          nodeId: neighborId,
          path: [neighborId, ...path],
        });
      }
    }
  }
  
  // No path found
  return null;
}

/**
 * Check if a node can be deallocated without breaking the tree
 * A node can be deallocated if no other allocated nodes depend on it
 */
export function canDeallocate(
  nodeId: string,
  allocatedIds: Set<string>,
  nodesById: Map<string, SkillNode>,
  connections: SkillConnection[]
): boolean {
  const node = nodesById.get(nodeId);
  
  // Root nodes cannot be deallocated
  if (!node || node.isRoot) {
    return false;
  }
  
  // Create a test set without this node
  const testAllocatedIds = new Set(allocatedIds);
  testAllocatedIds.delete(nodeId);
  
  // Build adjacency map
  const adjacencyMap = buildAdjacencyMap(connections);
  
  // Find all root nodes in the allocated set
  const rootNodes = Array.from(allocatedIds)
    .map(id => nodesById.get(id))
    .filter((n): n is SkillNode => n !== undefined && n.isRoot);
  
  if (rootNodes.length === 0) {
    return false;
  }
  
  // Check if all allocated nodes are still reachable from roots
  const reachable = new Set<string>();
  
  for (const rootNode of rootNodes) {
    if (rootNode.id === nodeId) continue;
    
    // BFS from this root
    const queue = [rootNode.id];
    const visited = new Set<string>();
    visited.add(rootNode.id);
    reachable.add(rootNode.id);
    
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const neighbors = getNeighbors(currentId, adjacencyMap);
      
      for (const neighborId of neighbors) {
        if (neighborId === nodeId) continue; // Skip the node we're testing
        
        if (testAllocatedIds.has(neighborId) && !visited.has(neighborId)) {
          visited.add(neighborId);
          reachable.add(neighborId);
          queue.push(neighborId);
        }
      }
    }
  }
  
  // Check if all nodes (except the one being removed) are still reachable
  for (const allocatedId of testAllocatedIds) {
    if (!reachable.has(allocatedId)) {
      return false; // Found an orphaned node
    }
  }
  
  return true;
}

/**
 * Build an adjacency map from connections for faster lookups
 */
function buildAdjacencyMap(connections: SkillConnection[]): Map<string, Set<string>> {
  const adjacencyMap = new Map<string, Set<string>>();
  
  for (const connection of connections) {
    // Add bidirectional connections
    if (!adjacencyMap.has(connection.from)) {
      adjacencyMap.set(connection.from, new Set());
    }
    adjacencyMap.get(connection.from)!.add(connection.to);
    
    if (!adjacencyMap.has(connection.to)) {
      adjacencyMap.set(connection.to, new Set());
    }
    adjacencyMap.get(connection.to)!.add(connection.from);
  }
  
  return adjacencyMap;
}

/**
 * Get all neighbors of a node
 */
function getNeighbors(nodeId: string, adjacencyMap: Map<string, Set<string>>): string[] {
  return Array.from(adjacencyMap.get(nodeId) || []);
}

/**
 * Calculate the total distance of a path
 */
export function calculatePathDistance(
  path: string[],
  nodesById: Map<string, SkillNode>
): number {
  let distance = 0;
  
  for (let i = 0; i < path.length - 1; i++) {
    const from = nodesById.get(path[i]);
    const to = nodesById.get(path[i + 1]);
    
    if (from && to) {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      distance += Math.sqrt(dx * dx + dy * dy);
    }
  }
  
  return distance;
}

/**
 * Find all nodes within a certain distance from a given node
 */
export function findNodesInRadius(
  centerNodeId: string,
  radius: number,
  nodesById: Map<string, SkillNode>
): SkillNode[] {
  const centerNode = nodesById.get(centerNodeId);
  if (!centerNode) {
    return [];
  }
  
  const result: SkillNode[] = [];
  
  for (const [id, node] of nodesById.entries()) {
    if (id === centerNodeId) continue;
    
    const dx = node.x - centerNode.x;
    const dy = node.y - centerNode.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= radius) {
      result.push(node);
    }
  }
  
  return result;
}
