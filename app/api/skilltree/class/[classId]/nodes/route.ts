import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import seedData from '@/src/skill-tree/data/seed/skilltree-seed.json';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ classId: string }> }
) {
  try {
    const { classId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const bbox = searchParams.get('bbox');
    
    // Filter nodes by class if needed
    let nodes = seedData.nodes;
    let connections = seedData.connections;
    
    // If bbox is provided, filter nodes within bounding box
    if (bbox) {
      const [minX, minY, maxX, maxY] = bbox.split(',').map(Number);
      
      if (!isNaN(minX) && !isNaN(minY) && !isNaN(maxX) && !isNaN(maxY)) {
        nodes = nodes.filter(
          node =>
            node.x >= minX &&
            node.x <= maxX &&
            node.y >= minY &&
            node.y <= maxY
        );
        
        const nodeIds = new Set(nodes.map(n => n.id));
        connections = connections.filter(
          conn => nodeIds.has(conn.from) && nodeIds.has(conn.to)
        );
      }
    }
    
    return NextResponse.json({ nodes, connections });
  } catch (error) {
    console.error('Error loading class nodes:', error);
    return NextResponse.json(
      { error: 'Failed to load class nodes' },
      { status: 500 }
    );
  }
}
