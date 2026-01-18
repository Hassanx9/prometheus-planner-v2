# Prometheus PoE 2 Build Planner - Product Requirements Document

## Project Overview
**Name:** Prometheus - ARPG Build Planner  
**Version:** 2.1.0  
**Last Updated:** January 18, 2026  
**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, next-intl (i18n)

## Original Problem Statement
User requested integration of the full Path of Exile 2 passive skill tree (similar to poeplanner.com/poe2) with:
- Interactive Canvas-based tree rendering for 2500+ nodes
- Professional game-accurate visual design matching PoE 2 aesthetic
- Smart pathfinding between nodes
- Stat calculation sidebar with collapsible sections
- Level progression slider
- Build sharing/export codes

## User Personas
1. **Hardcore PoE 2 Player** - Needs detailed tree planning with accurate stat calculations
2. **New Player** - Needs guided experience with level progression presets
3. **Build Creator/Streamer** - Needs sharing/export functionality

## Core Requirements (Static)
- [x] Full PoE 2 passive tree visualization (2,546 nodes)
- [x] Canvas-based rendering for performance
- [x] Game-accurate visual design (small nodes, proper shapes, glow effects)
- [x] Zoom/pan navigation (30%-400%)
- [x] Node allocation/deallocation on click
- [x] Smart pathfinding mode
- [x] Node search functionality
- [x] Level input with manual entry
- [x] Real-time stat calculation
- [x] Build export/share codes
- [x] Class selector (Witch, Ranger, Warrior, Mercenary, Monk, Sorceress)
- [x] Collapsible stats sidebar (Attributes, Defensive, Offensive, Damage)
- [x] Multi-language support (EN/AR)

## What's Been Implemented

### January 18, 2026 - Initial MVP
- Downloaded PoE 2 tree data (2,546 nodes)
- Basic Canvas skill tree implementation
- Level progression slider

### January 18, 2026 - Visual Redesign (Current)
- **Completely redesigned Canvas renderer** to match PoE 2 game aesthetic:
  - Smaller, refined node sizes (8px keystones, 5px notables, 2.5px smalls)
  - Diamond shapes for keystones
  - Hexagonal shapes for notables
  - Circular shapes for small nodes
  - Radial glow effects around nodes
  - Cosmic dark background with subtle stars
  - Thin golden connection lines
  - Professional tooltips with node names and stats

- **Updated sidebar** with game-like collapsible sections:
  - Character info panel
  - Collapse All / Expand All buttons
  - Attributes (Str/Dex/Int)
  - Defensive stats (Life, Mana, ES, Armour, Evasion)
  - Offensive stats (Crit, Attack Speed, Cast Speed)
  - Damage types (Physical, Fire, Cold, Lightning, Chaos)

- **Compact header** with inline controls:
  - Class selector dropdown
  - Level input field
  - Points counter
  - Build name input
  - Save/Share/Export buttons

## Testing Results
- **Frontend:** 100% pass rate
- All 20 test cases passed
- No JavaScript errors
- Professional design verified

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
- [ ] Class-specific starting points
- [ ] Build comparison tool
- [ ] AI build recommendations

### P3 (Low)
- [ ] Real-time economy integration (poe.ninja)
- [ ] Video embed for build guides
- [ ] Mobile optimization

## Next Tasks
1. Add localStorage persistence for allocated nodes
2. Implement build import from share code
3. Add class-specific starting node positions
4. Connect to backend for build storage
5. Implement user authentication

## Architecture Notes
- Tree data loaded from static JSON files in `/public/tree-data/`
- Canvas API with device pixel ratio scaling for crisp rendering
- Different node shapes: diamonds (keystones), hexagons (notables), circles (smalls)
- Radial gradients for glow effects
- BFS pathfinding algorithm
- Build codes use base64-encoded JSON of node IDs
