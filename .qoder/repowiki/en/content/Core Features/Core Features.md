# Core Features

<cite>
**Referenced Files in This Document**   
- [BuildDetail.tsx](file://components/builds/BuildDetail.tsx)
- [AIGuide.tsx](file://components/ai/AIGuide.tsx)
- [ItemDatabase.tsx](file://components/database/ItemDatabase.tsx)
- [Leaderboards.tsx](file://components/leaderboards/Leaderboards.tsx)
- [InteractiveSkillTree.tsx](file://components/builds/InteractiveSkillTree.tsx)
- [GemLinksViewer.tsx](file://components/builds/GemLinksViewer.tsx)
- [CraftingGuide.tsx](file://components/builds/CraftingGuide.tsx)
- [GearPriorityChart.tsx](file://components/builds/GearPriorityChart.tsx)
- [route.ts](file://app/api/ai/analyze/route.ts)
- [index.ts](file://types/index.ts)
- [BuildList.tsx](file://components/builds/BuildList.tsx)
- [CommunityHub.tsx](file://components/community/CommunityHub.tsx)
</cite>

## Table of Contents
1. [Build System](#build-system)
2. [AI Integration](#ai-integration)
3. [Item Database](#item-database)
4. [Community Features](#community-features)
5. [Feature Interrelations](#feature-interrelations)
6. [Performance Considerations](#performance-considerations)
7. [Troubleshooting Guide](#troubleshooting-guide)

## Build System

The Build System is the cornerstone of Prometheus-Planner V2, providing comprehensive build detail pages that showcase player configurations for Path of Exile 2 and Diablo IV. Each build is meticulously categorized and rated using a tier system that ranges from S+ to D, with S-tier representing meta-defining builds and D-tier indicating suboptimal configurations.

Builds are organized by multiple dimensions including game title, character class, and specific activity focus. The system implements activity-specific tier ratings that evaluate builds across different gameplay contexts such as leveling, bossing, mapping, PvP, farming, and Uber bosses. This multi-dimensional rating approach ensures players can identify builds optimized for their specific playstyle and objectives.

Each build detail page features a tabbed interface that organizes information into logical sections: Overview, Skill Tree, Gem Links, Crafting Guide, Gear Priority, Leveling Guide, and Import/Export. The tier rating is prominently displayed with a color-coded gradient background—gold for S-tier, green for A-tier, blue for B-tier, purple for C-tier, and gray for D-tier—providing immediate visual feedback on build quality.

Build categories further classify builds into functional types such as "League Starter" for new league characters, "End-game" for maximum performance in high-tier content, and "Speed Farmer" for efficient resource acquisition. This categorization helps players quickly identify builds that match their current goals.

**Section sources**
- [BuildDetail.tsx](file://components/builds/BuildDetail.tsx#L1-L225)
- [BuildList.tsx](file://components/builds/BuildList.tsx#L1-L265)
- [index.ts](file://types/index.ts#L3-L6)

## AI Integration

The AI Integration feature leverages GPT-4o to provide intelligent build analysis and optimization suggestions through the AI Guide interface. This implementation combines a user-friendly chat interface with specialized quick-action buttons that streamline common optimization workflows.

The AI Guide component presents a two-panel layout: a primary chat interface on the left and quick-action shortcuts on the right. Users can either type natural language questions about their builds or select from predefined actions like "Analyze Build," "Optimize Gear," or "Suggest Improvements." When a user submits a query, the frontend sends a POST request to the `/api/ai/analyze` endpoint with the build data and user message.

The backend API route processes these requests by constructing a comprehensive prompt that includes system instructions defining the AI's role as an ARPG build expert, the user's specific question, and the complete build context. The system prompt establishes clear guidelines for the AI's behavior, emphasizing the need for specific, actionable advice based on current meta and game mechanics.

The integration handles various response scenarios including API key validation, error handling for OpenAI API failures, and proper response formatting. The AI analyzes build configurations including skill trees, gear priorities, and gem links, then provides strategic recommendations for improvement. Responses are designed to be concise yet thorough, offering clear explanations for suggested changes while considering different gameplay activities.

**Section sources**
- [AIGuide.tsx](file://components/ai/AIGuide.tsx#L1-L131)
- [route.ts](file://app/api/ai/analyze/route.ts#L1-L92)
- [index.ts](file://types/index.ts#L9-L34)

## Item Database

The Item Database provides a powerful search and filtering interface for exploring game items across Path of Exile 2 and Diablo IV. The implementation features a clean, intuitive design with a primary search bar and category-based filtering controls.

Users can search for items by name using the search input field, which performs client-side filtering as characters are typed. Below the search bar, filter buttons allow users to narrow results by item type including Unique, Legendary, Rare, and Currency. Selecting a filter highlights the button with a gold background, providing clear visual feedback on the active filter state.

The database displays results in a responsive grid layout that adapts to different screen sizes, showing three columns on large screens, two on medium screens, and one on mobile devices. Each item card includes essential information: item name in gold serif font, type and game tags, level requirement, and a brief description. The cards feature hover effects with border color changes to gold, enhancing interactivity.

The component is designed with extensibility in mind, using mock data that can be easily replaced with API calls to a backend service. The filtering logic is implemented efficiently with JavaScript's filter method, processing both search queries and type filters to deliver instant results. The UI maintains visual consistency with the rest of the application through shared color schemes and typography.

**Section sources**
- [ItemDatabase.tsx](file://components/database/ItemDatabase.tsx#L1-L112)
- [index.ts](file://types/index.ts#L7-L8)
- [index.ts](file://types/index.ts#L97-L113)

## Community Features

The Community Features in Prometheus-Planner V2 center around user engagement and social interaction, with leaderboards showcasing top-rated builds and community hubs facilitating content discovery. The leaderboards implementation presents a sortable table that ranks players based on their build performance metrics.

The leaderboard table includes columns for rank, player name, level, character class, build name, DPS (damage per second), and survivability percentage. Ranks 1-3 receive special visual treatment with trophy icons: gold for first place, silver for second, and bronze for third. The survivability metric is displayed as a progress bar that fills according to the percentage value, providing an intuitive visual representation of a build's durability.

The Community Hub component provides a tabbed interface for browsing content by "Trending," "Top Rated," and "Newest" criteria. Although currently in development with placeholder content, the interface includes a prominent "Create Build" button that will enable users to contribute their own builds to the community.

User engagement is further encouraged through social metrics displayed on build cards, including view counts, upvote totals, and comment numbers. The build list interface allows users to filter builds by tier, category, and game, making it easy to discover content relevant to their interests. The "View Build" action on each card provides a direct link to detailed build pages, facilitating content exploration.

**Section sources**
- [Leaderboards.tsx](file://components/leaderboards/Leaderboards.tsx#L1-L64)
- [CommunityHub.tsx](file://components/community/CommunityHub.tsx#L1-L78)
- [BuildList.tsx](file://components/builds/BuildList.tsx#L1-L265)

## Feature Interrelations

The four main feature pillars of Prometheus-Planner V2 are designed to work together synergistically, creating a comprehensive ecosystem for ARPG players. The AI Integration system directly analyzes builds from the Build System, using data from skill trees, gem links, and gear priorities to generate optimization suggestions.

When a user requests build analysis through the AI Guide, the system passes the complete build object—including skill tree connections, gem link configurations, and gear priority rankings—to the GPT-4o API. This allows the AI to provide context-aware recommendations that consider the entire build holistically rather than isolated components.

The Item Database serves as a reference resource that complements the Build System. While viewing a build's gear priority chart, users can search the item database for specific pieces of equipment mentioned in the build guide. This integration helps players locate and understand the items they need to acquire.

Leaderboards showcase top-rated builds from the Build System, creating aspirational goals for other players. High-ranking builds on the leaderboards often become featured content in the community hub, driving engagement and discussion. The tier ratings used in the Build System (S to D) provide a standardized metric that could be incorporated into leaderboard calculations.

The community features create a feedback loop where user-submitted builds can be analyzed by AI, optimized using database references, and potentially rise to the top of leaderboards. This interconnected design encourages continuous improvement and knowledge sharing within the player community.

**Section sources**
- [BuildDetail.tsx](file://components/builds/BuildDetail.tsx#L1-L225)
- [AIGuide.tsx](file://components/ai/AIGuide.tsx#L1-L131)
- [ItemDatabase.tsx](file://components/database/ItemDatabase.tsx#L1-L112)
- [Leaderboards.tsx](file://components/leaderboards/Leaderboards.tsx#L1-L64)

## Performance Considerations

The application addresses several performance considerations to ensure a smooth user experience when handling complex data visualizations and external API calls. For rendering the interactive skill tree, the implementation uses SVG with CSS transforms for zooming and panning operations, which leverages GPU acceleration for smooth performance.

The skill tree component implements efficient rendering by only updating the transform property rather than re-rendering all nodes during pan and zoom operations. Event handlers for mouse interactions are optimized to prevent unnecessary re-renders, and the use of React's useState hooks is carefully managed to minimize component updates.

For AI integration, the application implements rate limiting considerations by handling API errors gracefully and providing user feedback during processing. The loading state shows animated dots to indicate activity, preventing user frustration during the typically 1-2 second response time from the OpenAI API.

Data loading is optimized through client-side filtering for the item database and build listings, eliminating the need for server requests when applying filters. The filtering logic is efficient, processing the mock dataset of hundreds of items with imperceptible delay. For production use, this approach could be enhanced with debouncing for search inputs and pagination for large result sets.

The application's modular component structure supports code splitting, allowing Next.js to load only the necessary JavaScript for each page. This reduces initial load times and improves overall performance, particularly on mobile connections.

**Section sources**
- [InteractiveSkillTree.tsx](file://components/builds/InteractiveSkillTree.tsx#L1-L173)
- [route.ts](file://app/api/ai/analyze/route.ts#L1-L92)
- [ItemDatabase.tsx](file://components/database/ItemDatabase.tsx#L1-L112)
- [BuildList.tsx](file://components/builds/BuildList.tsx#L1-L265)

## Troubleshooting Guide

Users may encounter several common issues when interacting with Prometheus-Planner V2's features. For the AI Integration system, the most frequent problem is the "OpenAI API key not configured" error, which occurs when the OPENAI_API_KEY environment variable is missing or invalid. This can be resolved by ensuring the .env.local file contains a valid API key from the OpenAI platform.

When the AI analysis fails to generate a response, users should check their internet connection and verify that the OpenAI service is operational. The application handles API errors gracefully, displaying specific error messages rather than failing silently. In cases of timeout or service unavailability, users should retry their request after a brief wait.

For the interactive skill tree, users may experience difficulty with zoom and pan controls. The controls are designed to work with mouse drag for panning and dedicated zoom buttons for scaling. Users should ensure their mouse is not over UI controls when attempting to pan the skill tree canvas.

The item database search may appear unresponsive if users expect real-time results from a backend API, but currently operates on client-side mock data. Users should type complete item names for best results, as partial matches are case-insensitive but require consecutive character matching.

Build detail pages may fail to load if the build ID in the URL does not correspond to an existing build. This can occur when sharing links to builds that have been removed or when manually entering incorrect IDs. The application should implement proper error handling for such cases, though this functionality is not visible in the current codebase.

**Section sources**
- [route.ts](file://app/api/ai/analyze/route.ts#L1-L92)
- [InteractiveSkillTree.tsx](file://components/builds/InteractiveSkillTree.tsx#L1-L173)
- [ItemDatabase.tsx](file://components/database/ItemDatabase.tsx#L1-L112)
- [BuildDetail.tsx](file://components/builds/BuildDetail.tsx#L1-L225)