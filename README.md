# Prometheus - ARPG Build Planner

A premium, high-performance web platform dedicated to Path of Exile 2 and Diablo IV. Features an integrated AI Assistant, multi-language support, and a highly visual build-guide system.

## Features

### Core Features
- ✅ **Dual-Language Support**: Arabic (RTL) and English (LTR) with full localization
- ✅ **Build Guide System**: Comprehensive build database with S+ to D tier rankings
- ✅ **Activity-Specific Tiers**: Tier ratings for Leveling, Bossing, Mapping, PvP, Farming, and Uber Bosses
- ✅ **Item Database**: Advanced searchable database with multi-filter support
- ✅ **AI Assistant**: OpenAI GPT-4o integration for real-time build analysis and optimization
- ✅ **Interactive Skill Trees**: Zoomable, pannable skill trees with node details
- ✅ **Community Hub**: User profiles, build sharing, and social features
- ✅ **Leaderboards**: Top players and their builds
- ✅ **Live Economy**: Real-time price tracking (integration ready)
- ✅ **News & Patch Notes**: Latest updates and expert analysis
- ✅ **Performance Optimized**: 90+ PageSpeed score target with code splitting and image optimization

### Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: OpenAI GPT-4o
- **State Management**: Zustand
- **Animations**: Framer Motion

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env.local file
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

**Note:** See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions and Vercel configuration.

### Language Support

The application supports two languages:
- **English** (en) - Default, LTR layout
- **Arabic** (ar) - RTL layout, localized for Oman

Switch languages using the language switcher in the navigation bar.

## Project Structure

```
prometheus-planner-v2/
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── builds/        # Build guides pages
│   │   ├── database/      # Item database pages
│   │   ├── ai/            # AI assistant pages
│   │   ├── community/     # Community pages
│   │   ├── leaderboards/  # Leaderboard pages
│   │   ├── economy/       # Economy tracker pages
│   │   ├── news/          # News and patch notes
│   │   ├── layout.tsx     # Locale layout
│   │   └── page.tsx       # Home page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation
│   ├── LanguageSwitcher.tsx
│   ├── builds/            # Build-related components
│   ├── database/          # Database components
│   ├── ai/                # AI components
│   ├── community/         # Community components
│   ├── leaderboards/      # Leaderboard components
│   ├── economy/           # Economy components
│   └── news/              # News components
├── messages/              # Translation files
│   ├── en.json            # English translations
│   └── ar.json            # Arabic translations
├── lib/                   # Utility functions
├── types/                 # TypeScript types
├── i18n.ts                # i18n configuration
└── middleware.ts          # Next.js middleware for i18n
```

## Development Roadmap

### Phase 1: Foundation ✅
- [x] Internationalization setup
- [x] Project structure
- [x] Core routing
- [x] Basic UI components

### Phase 2: Core Features ✅
- [x] Build detail pages with interactive skill trees
- [x] Advanced item database with filters
- [x] AI integration (OpenAI GPT-4o)
- [x] Activity-specific tier ratings
- [x] Performance optimizations
- [ ] User authentication and profiles

### Phase 3: Advanced Features
- [ ] Build comparison tool
- [ ] Gear check tool with image recognition
- [ ] Real-time economy API integration (poe.ninja)
- [ ] Leaderboard API integration
- [ ] Video integration for build previews
- [ ] Progressive leveling guide slider

### Phase 4: Community & Social
- [ ] User build creation tool
- [ ] Upvoting and commenting system
- [ ] Streamer integration (Twitch/YouTube)
- [ ] Build sharing and export/import

### Phase 5: Optimization & SEO
- [ ] SEO optimization for all pages
- [ ] Performance optimization
- [ ] Mobile app push notifications
- [ ] Newsletter integration

## Contributing

This is a private project. For contributions, please contact the project maintainer.

## License

Private - All rights reserved
