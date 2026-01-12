# Deployment Guide - Prometheus ARPG Build Planner

## Critical Deployment Fixes

### 1. Vercel Output Directory Configuration

In your Vercel project settings:
1. Go to **Settings** → **General**
2. Find **Output Directory** setting
3. Set it to: `.next`
4. Save changes

This resolves build errors related to missing or incorrect output directories.

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# OpenAI API Configuration
# Get your API key from https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

**Important:** Add these environment variables in Vercel:
1. Go to **Settings** → **Environment Variables**
2. Add `OPENAI_API_KEY` for all environments (Production, Preview, Development)
3. Add `NEXT_PUBLIC_APP_URL` if needed

## Security Updates

### Next.js Upgrade

The project has been upgraded from Next.js 14.2.3 to Next.js 15.0.0 to address security vulnerabilities (CVE-2025-55182).

To ensure you have the latest version:
```bash
npm install
```

## Features Implemented

### 1. Dual-Localization (Arabic/English)
- ✅ Full RTL/LTR support
- ✅ Flag-based language switcher (🇺🇸 English, 🇴🇲 Arabic)
- ✅ Dynamic layout mirroring
- ✅ Complete translation files

### 2. AI Build Auditor
- ✅ OpenAI GPT-4o integration
- ✅ Real-time build analysis
- ✅ Optimization suggestions
- ✅ Meta-relevant recommendations

**Setup:**
1. Get OpenAI API key from https://platform.openai.com/api-keys
2. Add to environment variables (see above)
3. The AI Guide component will automatically use the API

### 3. Dynamic Tier List System
- ✅ S+ to D tier ratings
- ✅ Activity-specific tiers (Leveling, Bossing, Mapping, PvP, Farming, Uber Bosses)
- ✅ Visual tier indicators
- ✅ Filterable by tier and activity

### 4. Enhanced Item Database
- ✅ Advanced search functionality
- ✅ Multi-filter support (Type, Game, Level Range)
- ✅ Drop location information
- ✅ Stat previews
- ✅ Performance optimized with useMemo

### 5. Performance Optimizations
- ✅ Image optimization configured
- ✅ Code splitting enabled
- ✅ SWC minification
- ✅ Compression enabled
- ✅ React Strict Mode
- ✅ Standalone output mode

## Build & Deploy

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Vercel Deployment
1. Push to your Git repository
2. Connect repository to Vercel
3. Configure environment variables
4. Set Output Directory to `.next`
5. Deploy

## Performance Targets

- **PageSpeed Score:** Target 90+ on Google PageSpeed Insights
- **Lighthouse Performance:** Target 90+
- **First Contentful Paint:** < 1.8s
- **Time to Interactive:** < 3.8s

## Architecture Support

### 20 Builds Per Class
The CMS architecture supports:
- Unlimited builds per class
- Activity-specific tier ratings
- Comprehensive build metadata
- SEO optimization per build
- Import/Export functionality

### Database Structure
- Builds with full metadata
- Items with stats and drop locations
- User profiles and favorites
- Comments and community features

## Troubleshooting

### Build Errors
- Ensure Output Directory is set to `.next` in Vercel
- Check that all environment variables are set
- Verify Node.js version (18+ recommended)

### AI Features Not Working
- Verify `OPENAI_API_KEY` is set correctly
- Check API key has sufficient credits
- Review API rate limits

### Localization Issues
- Ensure `messages/en.json` and `messages/ar.json` exist
- Check middleware configuration
- Verify locale routing

## Support

For issues or questions:
1. Check the console for error messages
2. Review Vercel deployment logs
3. Verify environment variables
4. Check OpenAI API status
