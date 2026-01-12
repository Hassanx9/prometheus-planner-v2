# Getting Started

<cite>
**Referenced Files in This Document**   
- [README.md](file://README.md)
- [DEPLOYMENT_GUIDE.md](file://DEPLOYMENT_GUIDE.md)
- [package.json](file://package.json)
- [i18n.ts](file://i18n.ts)
- [middleware.ts](file://middleware.ts)
- [app/[locale]/layout.tsx](file://app/[locale]/layout.tsx)
- [components/Navigation.tsx](file://components/Navigation.tsx)
- [components/LanguageSwitcher.tsx](file://components/LanguageSwitcher.tsx)
- [components/ai/AIGuide.tsx](file://components/ai/AIGuide.tsx)
- [components/builds/BuildList.tsx](file://components/builds/BuildList.tsx)
- [components/builds/BuildDetail.tsx](file://components/builds/BuildDetail.tsx)
- [messages/en.json](file://messages/en.json)
- [messages/ar.json](file://messages/ar.json)
</cite>

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Setup](#environment-setup)
4. [Running the Development Server](#running-the-development-server)
5. [Application Usage](#application-usage)
6. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
7. [Performance Optimization Tips](#performance-optimization-tips)
8. [Production Considerations](#production-considerations)

## Prerequisites

Before setting up the Prometheus-Planner V2 development environment, ensure your system meets the following requirements:

- **Node.js 18+**: The application requires Node.js version 18 or higher. Verify your installation with:
  ```bash
  node --version
  ```
- **npm**: Node Package Manager is required for dependency management. The application has been tested with npm 8+.

**Section sources**
- [README.md](file://README.md#L31-L33)

## Installation

Follow these steps to install the application dependencies:

1. Navigate to the project root directory:
   ```bash
   cd 
   ```

2. Install all required dependencies using npm:
   ```bash
   npm install
   ```

This command will read the `package.json` file and install all dependencies listed in the dependencies and devDependencies sections, including Next.js 15, React 18, Tailwind CSS, and other required packages.

**Section sources**
- [README.md](file://README.md#L37-L40)
- [package.json](file://package.json#L1-L35)

## Environment Setup

Proper environment configuration is essential for the application to function correctly, particularly for the AI features.

### Creating .env.local File

1. Create a `.env.local` file in the project root directory:
   ```bash
   touch .env.local
   ```

2. Add the required environment variables to `.env.local`:
   ```env
   # OpenAI API Configuration
   # Get your API key from https://platform.openai.com/api-keys
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Next.js Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### API Key Management

- Obtain your OpenAI API key from the [OpenAI platform](https://platform.openai.com/api-keys)
- Never commit the `.env.local` file to version control as it contains sensitive information
- The `.gitignore` file already includes patterns to exclude environment files

### Locale Configuration

The application supports dual-language functionality with locale-based routing:

- **English (en)**: Default language, LTR layout
- **Arabic (ar)**: RTL layout, localized for Oman

The locale configuration is managed in:
- `i18n.ts`: Defines supported locales and default locale
- `middleware.ts`: Handles locale routing and redirection
- `messages/en.json` and `messages/ar.json`: Contain translation strings

**Section sources**
- [README.md](file://README.md#L42-L46)
- [DEPLOYMENT_GUIDE.md](file://DEPLOYMENT_GUIDE.md#L17-L26)
- [i18n.ts](file://i18n.ts#L1-L17)
- [middleware.ts](file://middleware.ts#L1-L16)
- [messages/en.json](file://messages/en.json#L1-L121)
- [messages/ar.json](file://messages/ar.json#L1-L121)

## Running the Development Server

After completing the installation and environment setup, start the development server:

1. Run the development server using the npm script:
   ```bash
   npm run dev
   ```

2. The server will start and display output similar to:
   ```
   ready - started server on 0.0.0.0:3000, url: http://localhost:3000
   event - compiled client and server successfully in 2s
   ```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.

The development server provides hot reloading, meaning changes to code will automatically refresh the browser to reflect updates.

**Section sources**
- [README.md](file://README.md#L48-L53)
- [package.json](file://package.json#L6-L8)

## Application Usage

Once the application is running, you can explore its features and functionality.

### Accessing the Application

After starting the development server, access the application at:
```
http://localhost:3000
```

The application will automatically redirect to the default locale (English) at:
```
http://localhost:3000/en
```

### Navigating Between Locales

The application supports seamless switching between English and Arabic locales:

1. Locate the language switcher in the navigation bar (globe icon)
2. Click the language switcher to open the dropdown menu
3. Select either:
   - **English (🇺🇸)**: For LTR layout
   - **العربية (🇴🇲)**: For RTL layout

The language switcher component (`LanguageSwitcher.tsx`) handles the locale change by updating the URL path from `/en` to `/ar` or vice versa, leveraging Next.js routing and the `next-intl` internationalization library.

### Accessing Build Pages

The application features a comprehensive build guide system accessible through locale-based routing:

1. Navigate to the builds section:
   ```
   http://localhost:3000/[locale]/builds
   ```

2. The BuildList component displays all available builds with filtering options by:
   - Tier (S, A, B, C, D)
   - Category (League Starter, End-game, Speed Farmer)
   - Game (PoE 2, Diablo IV)

3. Click on any build to access its detailed view:
   ```
   http://localhost:3000/[locale]/builds/[id]
   ```

The build detail page includes tabs for Overview, Skill Tree, Gem Links, Crafting Guide, Gear Priority, Leveling Guide, and Import/Export functionality.

### Using the AI Assistant Interface

The AI assistant provides real-time build analysis and optimization suggestions:

1. Navigate to the AI Guide page:
   ```
   http://localhost:3000/[locale]/ai
   ```

2. The AIGuide component provides:
   - Chat interface for asking questions about builds
   - Quick action buttons for common tasks:
     - Analyze Build
     - Optimize Gear
     - Suggest Improvements

3. Type your question in the input field and click "Send" or press Enter to receive AI-generated responses.

The AI functionality requires a valid `OPENAI_API_KEY` in the environment variables to function properly.

**Section sources**
- [app/[locale]/layout.tsx](file://app/[locale]/layout.tsx#L1-L49)
- [components/Navigation.tsx](file://components/Navigation.tsx#L1-L99)
- [components/LanguageSwitcher.tsx](file://components/LanguageSwitcher.tsx#L1-L65)
- [components/ai/AIGuide.tsx](file://components/ai/AIGuide.tsx#L1-L131)
- [components/builds/BuildList.tsx](file://components/builds/BuildList.tsx#L1-L265)
- [components/builds/BuildDetail.tsx](file://components/builds/BuildDetail.tsx#L1-L225)

## Common Issues and Troubleshooting

### Missing Dependencies

**Symptoms:**
- Module not found errors
- Failed to compile messages
- Cannot find package errors

**Solutions:**
1. Ensure you're in the correct directory:
   ```bash
   cd 
   ```

2. Clear npm cache and reinstall:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

**Section sources**
- [package.json](file://package.json#L1-L35)

### Incorrect API Keys

**Symptoms:**
- AI features not working
- Error messages related to OpenAI API
- Failed network requests to AI endpoints

**Solutions:**
1. Verify the `.env.local` file contains:
   ```env
   OPENAI_API_KEY=your_valid_api_key_here
   ```

2. Ensure there are no spaces or special characters in the key
3. Check that the API key has sufficient credits
4. Verify the key is from a valid OpenAI account

**Section sources**
- [DEPLOYMENT_GUIDE.md](file://DEPLOYMENT_GUIDE.md#L58-L62)
- [DEPLOYMENT_GUIDE.md](file://DEPLOYMENT_GUIDE.md#L135-L138)

### Port Conflicts

**Symptoms:**
- EADDRINUSE errors
- Cannot start the server
- Port 3000 already in use

**Solutions:**
1. Stop the process using port 3000:
   ```bash
   # On Windows
   netstat -ano | findstr :3000
   taskkill /PID <process_id> /F
   
   # On macOS/Linux
   lsof -i :3000
   kill -9 <process_id>
   ```

2. Or start the server on a different port:
   ```bash
   npm run dev -- -p 3001
   ```

### Development Server Errors

**Common Errors and Solutions:**

1. **TypeScript errors during build:**
   - The application has `ignoreBuildErrors: true` in `next.config.mjs`
   - These errors may not prevent the server from starting
   - Address critical TypeScript issues for production builds

2. **Locale routing issues:**
   - Verify `middleware.ts` is properly configured
   - Check that `i18n.ts` includes all supported locales
   - Ensure `messages/en.json` and `messages/ar.json` exist

3. **Environment variable not loading:**
   - Verify `.env.local` is in the project root
   - Restart the development server after adding environment variables
   - Check for typos in variable names

**Section sources**
- [next.config.mjs](file://next.config.mjs#L1-L7)
- [middleware.ts](file://middleware.ts#L1-L16)
- [i18n.ts](file://i18n.ts#L1-L17)

## Performance Optimization Tips

For optimal local development experience, consider these performance tips:

1. **Use Incremental Static Regeneration:**
   - The application leverages Next.js static generation
   - Pre-generate static pages where possible
   - Use `getStaticProps` for data that doesn't change frequently

2. **Code Splitting:**
   - Next.js automatically handles code splitting
   - Keep component files focused and modular
   - Import components dynamically when needed

3. **Image Optimization:**
   - Use Next.js Image component for all images
   - Optimize image sizes before adding to the project
   - Leverage the built-in image optimization features

4. **Development Mode:**
   - Run only necessary services during development
   - Disable analytics and tracking in development
   - Use mock data for external API calls when possible

5. **Memory Management:**
   - Close unused browser tabs and applications
   - Monitor Node.js memory usage
   - Restart the development server periodically

**Section sources**
- [README.md](file://README.md#L18)
- [DEPLOYMENT_GUIDE.md](file://DEPLOYMENT_GUIDE.md#L76-L82)

## Production Considerations

While this guide focuses on local development setup, refer to `DEPLOYMENT_GUIDE.md` for production considerations:

- **Vercel Configuration**: Set output directory to `.next`
- **Environment Variables**: Configure in Vercel dashboard
- **Security Updates**: Ensure Next.js is updated to address vulnerabilities
- **Performance Targets**: Aim for 90+ PageSpeed score
- **Build & Deploy**: Use `npm run build` followed by `npm start`

The deployment guide contains critical fixes and configuration details necessary for successful production deployment.

**Section sources**
- [DEPLOYMENT_GUIDE.md](file://DEPLOYMENT_GUIDE.md#L1-L152)