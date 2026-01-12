# API Endpoints

<cite>
**Referenced Files in This Document**   
- [app/api/ai/analyze/route.ts](file://app/api/ai/analyze/route.ts)
- [lib/api/sync.ts](file://lib/api/sync.ts)
- [types/index.ts](file://types/index.ts)
- [components/ai/AIGuide.tsx](file://components/ai/AIGuide.tsx)
- [components/economy/EconomyTracker.tsx](file://components/economy/EconomyTracker.tsx)
- [DEPLOYMENT_GUIDE.md](file://DEPLOYMENT_GUIDE.md)
- [package.json](file://package.json)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [AI Analysis Endpoint](#ai-analysis-endpoint)
3. [Sync Functionality](#sync-functionality)
4. [TypeScript Interfaces](#typescript-interfaces)
5. [Frontend Integration](#frontend-integration)
6. [Security Considerations](#security-considerations)
7. [Error Handling](#error-handling)
8. [Performance Optimization](#performance-optimization)
9. [Deployment on Vercel](#deployment-on-vercel)

## Introduction
The Prometheus-Planner V2 backend provides API endpoints for AI-powered build analysis and data synchronization with external sources. This document details the primary AI analysis endpoint, internal sync functionality, and related implementation considerations. The system leverages Next.js API routes for server-side logic, with client-side components consuming these endpoints to deliver advanced ARPG build planning capabilities for Path of Exile 2 and Diablo IV.

## AI Analysis Endpoint

The primary AI analysis endpoint enables users to receive expert advice on their game builds through OpenAI's GPT-4o model. This endpoint processes build data and user queries to generate optimization recommendations.

### Endpoint Details
- **HTTP Method**: POST
- **URL Pattern**: `/api/ai/analyze`
- **Authentication**: API key via environment variable (server-side only)

### Request Schema
The endpoint accepts a JSON payload with the following structure:
- `message`: Required string containing the user's question or request
- `buildData`: Optional object containing build configuration details
- `context`: Optional string providing additional context for the analysis

When `buildData` is provided, it is formatted into a structured context string along with the user message before being sent to the OpenAI API.

### Response Format
On successful processing, the endpoint returns a JSON response with:
- `response`: The AI-generated analysis text
- `model`: The model used for generation ('gpt-4o')
- `usage`: Token usage statistics from the OpenAI API call

### Error Handling
The endpoint implements comprehensive error handling:
- **400 Bad Request**: Returned when the `message` field is missing from the request
- **500 Internal Server Error**: Returned for various server-side issues including:
  - Missing OpenAI API key configuration
  - OpenAI API errors (with specific error messages)
  - General internal server errors

The error responses include descriptive messages to aid in debugging while maintaining security by not exposing sensitive information.

**Section sources**
- [app/api/ai/analyze/route.ts](file://app/api/ai/analyze/route.ts#L1-L92)

## Sync Functionality

The sync functionality in `lib/api/sync.ts` provides internal API clients for synchronizing data with external sources. This module defines the interfaces and functions for periodic data updates from various game-related APIs.

### Internal API Clients
The sync module implements several functions for different data types:

#### Economy Data Sync (poe.ninja)
The `syncEconomyData` function is designed to fetch currency and market data from poe.ninja, a popular Path of Exile economy tracking service. While the implementation currently contains placeholder code, the structure indicates integration with the poe.ninja API endpoint `https://poe.ninja/api/data/currencyoverview`.

#### Item Database Sync
The `syncItemDatabase` function synchronizes game item data for both Path of Exile 2 and Diablo IV. It accepts a game parameter to determine which game's data to fetch and process.

#### Patch Notes Sync
The `syncPatchNotes` function retrieves official patch notes from game developers, translating them if necessary and storing them in the database for user access.

#### Leaderboard Sync
The `syncLeaderboards` function fetches top player data and extracts build information from leaderboards, enabling users to discover popular and effective builds.

### Sync Configuration
The module defines interfaces for configuration and results:
- `SyncConfig`: Specifies sync frequency, status, and timing
- `SyncResult`: Standardizes the response format with success status, item counts, error messages, and timestamps

All sync functions follow a consistent pattern of try-catch error handling, returning structured results that can be easily processed by calling components.

**Section sources**
- [lib/api/sync.ts](file://lib/api/sync.ts#L1-L99)

## TypeScript Interfaces

The application's type system is defined in `types/index.ts`, providing a comprehensive set of interfaces for game data, builds, and user interactions. These types ensure type safety across the application and serve as documentation for the data structures used throughout the system.

### Core Data Structures
The primary interfaces include:

#### Build Interface
The `Build` interface represents a complete character build with properties such as:
- Identification and metadata (id, name, class)
- Performance ratings (tier, category)
- Game association (game)
- Author and engagement metrics (author, views, votes)
- Detailed build components (skillTree, gemLinks, gearPriority)
- SEO metadata and tags

#### Item Interface
The `Item` interface defines game items with properties including:
- Identification and classification (id, name, type, game)
- Level requirements and descriptions
- Statistical properties (stats array)
- Drop locations and visual assets

#### Game Entity Interfaces
Additional interfaces support specific game mechanics:
- `SkillTreeData` and `SkillNode` for interactive skill tree visualization
- `GemLink` for gem configuration and linking
- `GearPriority` for equipment optimization guidance
- `User` and `Comment` for community features

These interfaces are used throughout the application to ensure consistent data handling and provide autocomplete and type checking benefits during development.

**Section sources**
- [types/index.ts](file://types/index.ts#L1-L136)

## Frontend Integration

Frontend components interact with the backend API endpoints through standard web APIs, primarily using the Fetch API indirectly through Next.js server actions and direct HTTP requests.

### AI Guide Component
The `AIGuide` component in `components/ai/AIGuide.tsx` provides the user interface for the AI analysis feature. It maintains a chat-like interface where users can ask questions about their builds. The component manages:
- Message history state
- Input handling and submission
- Loading states during API calls
- Display of AI responses

Currently, the component uses simulated responses, but it is structured to be easily adapted to call the actual `/api/ai/analyze` endpoint by replacing the setTimeout simulation with a fetch call.

### Economy Tracker Component
The `EconomyTracker` component displays market data and is designed to integrate with the poe.ninja API. It currently shows mock currency data but includes comments indicating the planned integration with real-time price tracking.

### Usage Example
```typescript
// Example of how the frontend would call the AI analysis endpoint
const analyzeBuild = async (message: string, buildData: Build) => {
  const response = await fetch('/api/ai/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      buildData,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to analyze build');
  }
  
  const data = await response.json();
  return data;
};
```

**Section sources**
- [components/ai/AIGuide.tsx](file://components/ai/AIGuide.tsx#L1-L131)
- [components/economy/EconomyTracker.tsx](file://components/economy/EconomyTracker.tsx#L1-L56)

## Security Considerations

The application implements several security measures to protect sensitive data and prevent abuse of API resources.

### API Key Protection
The OpenAI API key is securely managed through environment variables, ensuring it is never exposed to the client-side code. The key is accessed server-side in the API route and used to initialize the OpenAI client. This approach prevents the key from being visible in browser developer tools or client-side bundles.

### Input Validation
The application includes Zod as a dependency (evident in package.json), indicating the use of schema validation for request data. While specific validation schemas are not visible in the analyzed files, the presence of Zod suggests that input validation is implemented elsewhere in the codebase to ensure data integrity and prevent injection attacks.

### Rate Limiting Implications
As the application is deployed on Vercel serverless functions, it inherits the platform's rate limiting and abuse protection mechanisms. Serverless functions have execution limits that naturally prevent excessive usage, and Vercel provides additional security features to protect against DDoS attacks and other forms of abuse.

### Environment Configuration
The deployment guide emphasizes the importance of proper environment variable configuration, specifically highlighting the need to set the `OPENAI_API_KEY` in Vercel's environment variables section. This ensures that sensitive credentials are stored securely and not committed to version control.

**Section sources**
- [app/api/ai/analyze/route.ts](file://app/api/ai/analyze/route.ts#L1-L92)
- [DEPLOYMENT_GUIDE.md](file://DEPLOYMENT_GUIDE.md#L1-L152)
- [package.json](file://package.json#L1-L35)

## Error Handling

The application implements robust error handling strategies across both server and client components to ensure reliability and provide meaningful feedback during failures.

### Server-Side Error Handling
The AI analysis endpoint demonstrates comprehensive error handling:
- **Configuration Errors**: Checks for the presence of the OpenAI API key and returns a 500 error if missing
- **Input Validation**: Validates required fields and returns 400 errors for invalid requests
- **API Integration Errors**: Catches and handles OpenAI API errors specifically, preserving error status codes when possible
- **General Errors**: Provides a fallback error handler for unexpected issues

The error handling includes detailed logging for debugging purposes while returning user-friendly error messages that don't expose implementation details.

### External API Error Handling
The sync functionality implements error handling for network operations:
- **Network Failures**: Catches fetch-related errors and returns structured error responses
- **Timeout Scenarios**: While not explicitly implemented, the structure allows for timeout handling through fetch options
- **Invalid Responses**: Handles cases where external APIs return unexpected data formats

The `SyncResult` interface standardizes error reporting across all sync functions, making it easier for calling code to handle failures consistently.

### Client-Side Error Management
Frontend components manage errors through:
- Loading states to indicate pending operations
- Error boundaries to prevent crashes
- User feedback mechanisms for failed operations

The architecture separates error handling concerns between server and client, with the server providing structured error responses that the client can interpret and display appropriately.

**Section sources**
- [app/api/ai/analyze/route.ts](file://app/api/ai/analyze/route.ts#L75-L91)
- [lib/api/sync.ts](file://lib/api/sync.ts#L31-L37)

## Performance Optimization

The application incorporates several performance optimization strategies to ensure responsive user experiences and efficient resource usage.

### Caching Strategies
While explicit caching implementation is not visible in the analyzed files, the application includes dependencies that suggest caching mechanisms:
- `@alloc/quick-lru` and `@formatjs/fast-memoize` indicate the use of LRU (Least Recently Used) caching and memoization
- These libraries can be used to cache AI responses, reducing API calls and costs
- Item and economy data can be cached to minimize external API requests

A recommended implementation would cache AI responses based on build configuration and query parameters, serving cached results for identical requests.

### Batching Operations
The sync functionality can be optimized through batching:
- Multiple data types can be synchronized in a single operation
- Database writes can be batched to reduce I/O operations
- External API calls can be combined where supported by the target services

The `SyncConfig` interface supports configurable intervals, allowing administrators to balance data freshness with performance considerations.

### Vercel Serverless Considerations
The application is optimized for Vercel's serverless environment:
- Lightweight API routes minimize cold start times
- Dependencies are carefully managed to reduce bundle size
- The standalone output mode (indicated in deployment guide) optimizes deployment packages

### Client-Side Performance
Frontend components implement performance best practices:
- Client components are used judiciously where interactivity is needed
- Server components handle static content and metadata
- Image optimization is configured (as mentioned in deployment guide)
- Code splitting is enabled to reduce initial load times

**Section sources**
- [lib/api/sync.ts](file://lib/api/sync.ts#L1-L99)
- [DEPLOYMENT_GUIDE.md](file://DEPLOYMENT_GUIDE.md#L1-L152)

## Deployment on Vercel

The application is configured for deployment on Vercel, leveraging serverless functions for API endpoints and optimized static generation for frontend content.

### Serverless Function Configuration
The AI analysis endpoint operates as a serverless function with specific considerations:
- **Cold Start Implications**: As a serverless function, the endpoint may experience cold starts, particularly after periods of inactivity. This can result in increased latency for the first request after a cold start.
- **Output Directory**: The vercel.json configuration specifies the build command and framework settings, with the deployment guide emphasizing the need to set the output directory to `.next`.
- **Environment Variables**: Critical configuration like the OpenAI API key must be set in Vercel's environment variables to ensure security and proper functionality.

### Deployment Configuration
Key deployment settings include:
- **Framework Detection**: Vercel automatically detects Next.js and applies appropriate build settings
- **Build Command**: `npm run build` is specified as the build command
- **Output Directory**: Configured as `.next` to match Next.js output structure

### Performance Targets
The deployment guide outlines specific performance targets:
- PageSpeed Score: Target 90+ on Google PageSpeed Insights
- First Contentful Paint: Less than 1.8 seconds
- Time to Interactive: Less than 3.8 seconds

These targets are supported by Next.js features like image optimization, code splitting, and SWC minification, ensuring a high-performance user experience.

**Section sources**
- [vercel.json](file://vercel.json#L1-L6)
- [DEPLOYMENT_GUIDE.md](file://DEPLOYMENT_GUIDE.md#L1-L152)