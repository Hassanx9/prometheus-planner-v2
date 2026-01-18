# Prometheus PoE 2 Build Planner - Product Requirements Document

## Project Overview
**Name:** Prometheus - ARPG Build Planner  
**Version:** 2.2.0  
**Last Updated:** January 18, 2026  
**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, next-intl (i18n)

## Original Problem Statement
User requested integration of the full Path of Exile 2 passive skill tree with:
- Professional game-accurate visual design matching PoE 2 aesthetic
- Clean, organized connection paths (not chaotic overlapping web)
- Interactive Canvas-based tree rendering for 2500+ nodes
- Smart pathfinding between nodes
- Stat calculation sidebar with collapsible sections
- Build sharing/export codes

## Core Requirements (Static)
- [x] Full PoE 2 passive tree visualization (2,546 nodes)
- [x] Canvas-based rendering for performance
- [x] Game-accurate visual design (proper shapes, glow effects)
- [x] **Clean chain-like connections** (not chaotic web)
- [x] Zoom/pan navigation (30%-400%)
- [x] Node allocation/deallocation on click
- [x] Smart pathfinding mode
- [x] Node search functionality
- [x] Real-time stat calculation
- [x] Build export/share codes
- [x] Class selector
- [x] Collapsible stats sidebar
- [x] Multi-language support (EN/AR)

## What's Been Implemented

### January 18, 2026 - Connection Algorithm Fix (Current)
**Major Fix: Clean Connection Paths**

Previous issue: Connections formed a chaotic overlapping web that was confusing and non-functional.

Solution: Implemented a phased k-Nearest Neighbors algorithm:
1. **Phase 1**: Connect small nodes to nearest neighbor (creates chains)
2. **Phase 2**: Connect isolated small nodes
3. **Phase 3**: Add second connection to small nodes (complete chains)
4. **Phase 4**: Connect notables to nearby notables (backbone)
5. **Phase 5**: Connect keystones to nearest notables
6. **Phase 6**: Connect class starts to nearby nodes

Connection limits by node type:
- Small nodes: max 2 connections
- Notable nodes: max 4 connections
- Keystone nodes: max 3 connections
- Class starts: max 8 connections

Distance thresholds:
- Small to small: 0.02
- Small to notable: 0.03
- Notable to notable: 0.06
- Keystone connections: 0.05

### Visual Design
- Diamond shapes for keystones (golden glow)
- Hexagonal shapes for notables (cyan glow)
- Circular shapes for small nodes
- Cosmic dark background with subtle stars
- Thin clean connection lines (visible but not overwhelming)
- Golden highlighting for allocated paths

## Testing Results
- **Frontend:** 100% pass rate (20/20 tests)
- Connections verified as clean chain-like paths
- All interactive features working

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
- [ ] Class-specific starting points with connecting paths
- [ ] Build comparison tool

## Next Tasks
1. Add localStorage persistence for allocated nodes
2. Implement build import from share codes
3. Add class-specific starting node positions with proper paths
4. Connect to backend for build storage
