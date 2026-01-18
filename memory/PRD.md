# Prometheus PoE 2 Build Planner - Product Requirements Document

## Project Overview
**Name:** Prometheus - ARPG Build Planner  
**Version:** 2.0.0  
**Last Updated:** January 18, 2026  
**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, next-intl (i18n)

## Original Problem Statement
User requested integration of the full Path of Exile 2 passive skill tree (similar to poeplanner.com/poe2) with:
- Interactive Canvas-based tree rendering for 2500+ nodes
- Smart pathfinding between nodes
- Stat calculation sidebar
- Level progression slider ("Breadcrumb" Mobalytics-style feature)
- Build sharing/export codes
- Bug fixes for the existing Vercel deployment

## User Personas
1. **Hardcore PoE 2 Player** - Needs detailed tree planning with accurate stat calculations
2. **New Player** - Needs guided experience with level progression presets
3. **Build Creator/Streamer** - Needs sharing/export functionality

## Core Requirements (Static)
- [x] Full PoE 2 passive tree visualization (2,546 nodes)
- [x] Canvas-based rendering for performance
- [x] Zoom/pan navigation
- [x] Node allocation/deallocation on click
- [x] Smart pathfinding mode
- [x] Node search functionality
- [x] Level progression slider with presets
- [x] Real-time stat calculation
- [x] Build export/share codes
- [x] Class selector
- [x] Multi-language support (EN/AR)

## What's Been Implemented (January 18, 2026)

### Phase 1: Core Infrastructure ✅
- Fixed `Gem` import bug on homepage
- Downloaded PoE 2 tree data from community repository (marcoaaguiar/poe2-tree)
- Created `/app/public/tree-data/nodes.json` (2,546 nodes)
- Created `/app/public/tree-data/nodes_desc.json` (node descriptions & stats)

### Phase 2: Canvas Skill Tree ✅
- Created `/app/lib/tree-data.ts` - Tree data types, utilities, pathfinding
- Created `/app/components/builds/CanvasSkillTree.tsx` - High-performance Canvas renderer
- Features: zoom (30%-300%), pan, node selection, connections

### Phase 3: Build Planner Page ✅
- Updated `/app/app/[locale]/build-planner/page.tsx`
- Level progression slider (1-100) with presets (20, 40, 60, 80, 100)
- Character Stats sidebar (Defensive, Attributes, Offensive, Damage)
- Build Information panel (name, class, points used)
- Actions panel (Save, Share, Export)

### Phase 4: Bug Fixes ✅
- Fixed duplicate html/body tags causing hydration error
- Fixed missing `trendingBuilds` variable on homepage
- Fixed duplicate `data-testid` attributes

## Testing Results
- **Frontend:** 98% pass rate
- All major functionality verified working

## Prioritized Backlog

### P0 (Critical)
- [ ] Persist allocated nodes to localStorage
- [ ] Import build from code

### P1 (High)
- [ ] User authentication
- [ ] Save builds to database
- [ ] Community build sharing

### P2 (Medium)
- [ ] Ascendancy trees integration
- [ ] Weapon set skill trees
- [ ] Build comparison tool
- [ ] AI build recommendations

### P3 (Low)
- [ ] Real-time economy integration (poe.ninja)
- [ ] Video embed for build guides
- [ ] Mobile app version

## Next Tasks
1. Add localStorage persistence for allocated nodes
2. Implement build import from share code
3. Add ascendancy tree data
4. Connect to backend for build storage
5. Implement user authentication

## Architecture Notes
- Tree data loaded from static JSON files
- Canvas API for rendering (not DOM elements)
- Pathfinding uses BFS algorithm
- Stat calculation parses node descriptions for modifiers
- Build codes use base64-encoded JSON of node IDs
