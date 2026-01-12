# Prometheus - ARPG Build Planner

A premium, high-performance web platform dedicated to Path of Exile 2 and Diablo IV. Features an integrated AI Assistant, multi-language support, and a highly visual build-guide system.

## Features

### Core Features
- ✅ **Dual-Language Support**: Arabic (RTL) and English (LTR) with full localization
- ✅ **Build Guide System**: Comprehensive build database with tier rankings
- ✅ **Item Database**: Searchable database of all in-game items
- ✅ **AI Assistant**: Integrated AI guide for build optimization
- ✅ **Community Hub**: User profiles, build sharing, and social features
- ✅ **Leaderboards**: Top players and their builds
- ✅ **Live Economy**: Real-time price tracking (integration ready)
- ✅ **News & Patch Notes**: Latest updates and expert analysis

### Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand (ready for implementation)
- **Animations**: Framer Motion (ready for implementation)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

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

### Phase 2: Core Features (In Progress)
- [ ] Build detail pages with interactive skill trees
- [ ] Advanced item database with filters
- [ ] AI integration (OpenAI/Claude API)
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
