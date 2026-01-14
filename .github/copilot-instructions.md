# AI Coding Assistant Instructions for Prometheus ARPG Build Planner

## Project Overview
This is a Next.js 15 application for Path of Exile 2 and Diablo IV build planning, featuring dual-language support (English/Arabic), AI-powered build analysis, and a comprehensive build database.

## Architecture
- **Framework**: Next.js 15 with App Router
- **Routing**: Locale-prefixed routes (`/en/...`, `/ar/...`) using `next-intl`
- **Internationalization**: English (LTR) and Arabic (RTL) with `next-intl`
- **Styling**: Tailwind CSS with custom dark gaming theme
- **State**: React useState (Zustand ready for complex state)
- **Data**: Currently mock data, structured for API/database integration

## Key Patterns & Conventions

### Component Structure
- Components in `/components/` organized by feature (builds/, ai/, etc.)
- Use `'use client'` for interactive components
- Import utilities from `@/lib/utils`
- Use `clsx` or `cn()` for conditional classes

### Styling
- Dark theme with custom colors: `poe-black`, `poe-gold`, `poe-spirit`, `poe-border`
- Gradients: `bg-gradient-to-r from-[#c5a059] to-[#d4b16a]`
- Shadows: `shadow-premium`, `shadow-premium-xl`
- Responsive: Mobile-first with `lg:` breakpoints

### Internationalization
```tsx
import { useTranslations } from 'next-intl';
const t = useTranslations('nav'); // For nav.json keys
const tCommon = useTranslations('common'); // For common.json keys
```

### TypeScript Types
- All types in `/types/index.ts`
- Key interfaces: `Build`, `Item`, `User`, `SkillTreeData`
- Use `Game` type for 'PoE 2' | 'Diablo IV'

### API Integration
- AI analysis via `/api/ai/analyze` using OpenAI GPT-4o
- Ready for poe.ninja economy API integration
- Database integration pending (PostgreSQL/MongoDB)

## Development Workflow

### Environment Setup
```bash
npm install
# Create .env.local
OPENAI_API_KEY=your_key_here
npm run dev
```

### Build Commands
- `npm run dev`: Development server
- `npm run build`: Production build (ignores TS/ESLint errors)
- `npm start`: Production server

### File Organization
- Pages: `/app/[locale]/feature/page.tsx`
- Components: `/components/feature/Component.tsx`
- Translations: `/messages/en.json`, `/messages/ar.json`
- Types: `/types/index.ts`
- Utils: `/lib/utils.ts`

## Common Tasks

### Adding New Features
1. Create page in `/app/[locale]/new-feature/page.tsx`
2. Add component in `/components/new-feature/`
3. Update navigation in `/components/Navigation.tsx`
4. Add translations to `/messages/*.json`
5. Define types in `/types/index.ts`

### Working with Mock Data
- Replace mock arrays in components with API calls
- Use types from `/types/index.ts` for data structure
- Mock data follows real API patterns

### RTL/LTR Support
- Use `locale === 'ar'` for RTL checks
- CSS automatically handles direction via `dir` attribute
- Test both locales during development

### SEO Implementation
- Use `lib/seo.ts` helpers for metadata
- Add `seoMeta` to build objects
- Include Open Graph and Twitter Card support

## Integration Points

### AI Analysis
- Endpoint: `/api/ai/analyze`
- Model: GPT-4o with ARPG system prompt
- Requires `OPENAI_API_KEY` environment variable

### External APIs (Planned)
- poe.ninja for economy data
- Game APIs for live data
- Twitch/YouTube for video integration

### Database (Planned)
- User authentication with NextAuth.js
- Build storage and management
- Community features (comments, favorites)

## Code Quality
- TypeScript strict mode enabled
- ESLint configured (ignored during build)
- Prettier for formatting
- Component composition over inheritance
- Functional components with hooks

## Deployment
- Vercel optimized with `output: '.next'`
- Environment variables required for production
- Static generation for performance
- Image optimization enabled

## Current Status
- Core UI complete with mock data
- AI integration functional
- Ready for backend/database integration
- Admin dashboard for content management
- SEO and performance optimized