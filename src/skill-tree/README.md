# Interactive Skill Tree Feature

A high-performance, full-featured interactive skill tree UI for Path of Exile 2 and Diablo IV build planning.

## Architecture

### Technology Stack
- **Rendering**: PixiJS v8 for WebGL-accelerated graphics
- **State Management**: Zustand for client-side state with persistence
- **Pathfinding**: Custom BFS implementation for skill allocation
- **Spatial Indexing**: RBush for efficient viewport-based queries
- **Framework**: Next.js 15 with TypeScript

### Directory Structure

```
src/skill-tree/
├── models/
│   └── skill.ts              # TypeScript type definitions
├── store/
│   └── skillStore.ts         # Zustand state management
├── utils/
│   └── pathfinding.ts        # BFS pathfinding algorithms
├── services/
│   └── skillService.ts       # Data loading with spatial indexing
├── components/
│   ├── SkillTreeCanvas.tsx   # PixiJS renderer
│   ├── SearchBar.tsx         # Search and filter UI
│   └── Toolbar.tsx           # Controls and stats display
├── pages/
│   └── SkillTreePage.tsx     # Main page component
├── styles/
│   └── skill-tree.css        # Custom CSS styles
├── data/
│   └── seed/
│       └── skilltree-seed.json  # Sample dataset
└── __tests__/
    ├── pathfinding.test.ts   # Pathfinding tests
    └── skillStore.test.ts    # Store tests
```

## Features

### Core Functionality
- **Interactive Pan/Zoom**: Smooth camera controls with mouse drag and wheel zoom
- **Node Allocation**: Click-to-allocate with automatic path finding
- **Undo/Redo**: Support for up to 50 actions
- **Search**: Fast text-based search with result highlighting
- **Viewport Culling**: Only renders visible nodes for optimal performance
- **LocalStorage Persistence**: Automatically saves allocations
- **Multi-Class Support**: Switch between character classes

### Performance Optimizations
- WebGL rendering via PixiJS for thousands of nodes
- Spatial indexing with RBush for O(log n) viewport queries
- Batched connection rendering
- Efficient allocation state management

## Data Format

### Skill Tree JSON Structure

```json
{
  "version": "1.0.0",
  "classes": [
    {
      "id": "warrior",
      "name": "Warrior",
      "description": "A melee fighter",
      "startNodeId": "warrior_start",
      "color": "#c53030"
    }
  ],
  "nodes": [
    {
      "id": "node_1",
      "name": "Might",
      "description": "Increases physical damage",
      "x": 100,
      "y": 0,
      "type": "small",
      "stats": [
        {
          "type": "damage",
          "name": "+5% Physical Damage",
          "value": 5,
          "isPercent": true
        }
      ],
      "connectedTo": ["warrior_start", "node_2"],
      "pointCost": 1
    }
  ],
  "connections": [
    { "from": "warrior_start", "to": "node_1" }
  ],
  "bounds": {
    "minX": -250,
    "minY": -50,
    "maxX": 350,
    "maxY": 250
  }
}
```

### Node Types
- **small**: Standard passive node (10px radius)
- **notable**: Larger passive with significant bonuses (15px radius)
- **keystone**: Major passive with powerful effects (18px radius)
- **start**: Class starting position (20px radius)
- **mastery**: Special nodes with multiple options
- **ascendancy**: Ascendancy class nodes

## Adding Your Own Dataset

### Option 1: Static File (Recommended for Development)
1. Place your JSON file at `public/static/skilltree.json`
2. The service will automatically load it on page mount
3. File is cached by the browser for faster subsequent loads

### Option 2: API Endpoints (Recommended for Production)
1. Implement the following endpoints:
   - `GET /api/skilltree/classes` - Returns array of class metadata
   - `GET /api/skilltree/class/:classId/nodes?bbox=x1,y1,x2,y2` - Returns nodes in bounding box

2. The service automatically falls back to these endpoints if static file isn't available

### Option 3: Chunked Loading
For very large skill trees (10,000+ nodes):

1. Split your data into chunks by spatial region
2. Implement the bbox query endpoint to return only nodes in the viewport
3. The service's spatial index will handle efficient queries

Example API response:
```json
{
  "nodes": [...],      // Nodes in requested bbox
  "connections": [...] // Connections between these nodes
}
```

## Customization

### Styling

Edit `src/skill-tree/styles/skill-tree.css` to customize:
- Node colors and sizes
- Connection line styles
- Tooltip appearance
- Animation timings

The component respects the global theme colors:
- `#c5a059` - Gold accent color
- `#7ecce0` - Cyan accent color
- `#3d3d43` - Border color
- `#141417` - Dark background

### Camera Settings

Adjust in `SkillTreeCanvas.tsx`:
```typescript
const cameraRef = useRef({
  x: 0,
  y: 0,
  scale: 1,
  minScale: 0.1,  // Maximum zoom out
  maxScale: 2.5,  // Maximum zoom in
});
```

### Point Limits

Configure in store initialization:
```typescript
maxPoints: 100,  // Maximum allocatable points
```

## Usage

### Basic Integration

```tsx
import { SkillTreePage } from '@/src/skill-tree/pages/SkillTreePage';

export default function MySkillTreePage() {
  return <SkillTreePage />;
}
```

### Programmatic Control

```tsx
import { useSkillTreeStore } from '@/src/skill-tree/store/skillStore';

function MyComponent() {
  const allocateNode = useSkillTreeStore(state => state.allocateNode);
  const totalPoints = useSkillTreeStore(state => state.totalPoints);
  
  return (
    <button onClick={() => allocateNode('node_id')}>
      Allocate (Points: {totalPoints})
    </button>
  );
}
```

## API Reference

### Store Methods

- `loadSkillTree(data)` - Load skill tree data
- `setClass(classId)` - Set character class
- `allocateNode(nodeId)` - Allocate a node (with path)
- `deallocateNode(nodeId)` - Deallocate a node
- `reset()` - Reset all allocations
- `undo()` - Undo last action
- `redo()` - Redo last undone action
- `exportState()` - Export allocation state
- `importState(state)` - Import allocation state

### Service Methods

- `loadFromStatic(path)` - Load from static JSON
- `loadClasses()` - Load class metadata
- `loadClassNodes(classId, bbox)` - Load nodes for class
- `queryViewport(bbox)` - Query nodes in viewport
- `searchNodes(query, maxResults)` - Search nodes by name/stats
- `getBounds()` - Get tree bounding box

## Testing

Run tests:
```bash
npm test src/skill-tree
```

Tests cover:
- Pathfinding algorithms (BFS, deallocation validation)
- Store state management (allocation, undo/redo)
- Edge cases (circular dependencies, orphaned nodes)

## Performance Considerations

### Large Trees (10,000+ nodes)
- Use chunked loading via API endpoints
- Enable viewport-based culling (enabled by default)
- Consider level-of-detail rendering for distant nodes

### Mobile Support
- Touch events are handled for pan/zoom
- Responsive tooltip positioning
- Optimized for lower-end devices with WebGL fallback

## Troubleshooting

### PixiJS not rendering
- Check that canvas container has explicit width/height
- Ensure WebGL is supported in browser
- Check browser console for initialization errors

### Slow performance
- Verify spatial indexing is active (check console logs)
- Enable viewport culling
- Reduce node count in viewport
- Check for memory leaks in PixiJS objects

### Allocation not working
- Verify node connections in data
- Check that starting node is marked as `isRoot: true`
- Ensure nodes have valid `connectedTo` arrays
- Check pathfinding logic in tests

## Future Enhancements

- [ ] Minimap for navigation
- [ ] Sprite sheets for node icons
- [ ] Animated allocation paths
- [ ] Skill tree comparison tool
- [ ] Export as image/URL
- [ ] Collaborative planning (multiplayer)
- [ ] Ascendancy class integration
- [ ] Cluster jewels support

## License

Private - All rights reserved
