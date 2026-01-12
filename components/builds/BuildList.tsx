'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BookOpen, TrendingUp, ThumbsUp, Eye, Clock } from 'lucide-react';
import { clsx } from 'clsx';

// Mock data - will be replaced with real data later
const mockBuilds = [
  {
    id: 1,
    name: 'Lightning Spear Mercenary',
    class: 'Mercenary',
    tier: 'S',
    category: 'League Starter',
    author: 'ProGamer123',
    views: 12500,
    upvotes: 892,
    lastUpdated: '2 days ago',
    game: 'PoE 2',
    description: 'High DPS lightning build focused on spear attacks',
  },
  {
    id: 2,
    name: 'Frost Witch Build',
    class: 'Witch',
    tier: 'A',
    category: 'End-game',
    author: 'BuildMaster',
    views: 8900,
    upvotes: 654,
    lastUpdated: '5 days ago',
    game: 'PoE 2',
    description: 'Cold damage focused build with excellent survivability',
  },
  {
    id: 3,
    name: 'Barbarian Whirlwind',
    class: 'Barbarian',
    tier: 'S',
    category: 'Speed Farmer',
    author: 'D4Expert',
    views: 15200,
    upvotes: 1123,
    lastUpdated: '1 day ago',
    game: 'Diablo IV',
    description: 'Classic whirlwind build optimized for endgame',
  },
  {
    id: 4,
    name: 'Poison Assassin',
    class: 'Assassin',
    tier: 'A',
    category: 'League Starter',
    author: 'ToxicBuilds',
    views: 9800,
    upvotes: 721,
    lastUpdated: '3 days ago',
    game: 'PoE 2',
    description: 'Fast clearing poison build perfect for league start',
  },
  {
    id: 5,
    name: 'Necromancer Summoner',
    class: 'Necromancer',
    tier: 'S',
    category: 'End-game',
    author: 'UndeadMaster',
    views: 11200,
    upvotes: 945,
    lastUpdated: '1 day ago',
    game: 'Diablo IV',
    description: 'Ultimate endgame summoner build with maximum minions',
  },
];

const tierColors = {
  S: 'bg-gradient-to-r from-yellow-500 to-orange-500',
  A: 'bg-gradient-to-r from-green-500 to-emerald-500',
  B: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  C: 'bg-gradient-to-r from-purple-500 to-pink-500',
  D: 'bg-gradient-to-r from-gray-500 to-slate-500',
};

export function BuildList() {
  const t = useTranslations('builds');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredBuilds = mockBuilds.filter((build) => {
    if (selectedTier && build.tier !== selectedTier) return false;
    if (selectedGame && build.game !== selectedGame) return false;
    if (selectedCategory && build.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4 mb-6">
        {/* Tier Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-400 uppercase font-bold self-center mr-2">Tier:</span>
          <button
            onClick={() => setSelectedTier(null)}
            className={clsx(
              'px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all',
              selectedTier === null
                ? 'bg-[#c5a059] text-black'
                : 'bg-[#141417] border border-[#3d3d43] text-gray-400 hover:text-[#c5a059]'
            )}
          >
            All
          </button>
          {['S', 'A', 'B', 'C', 'D'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={clsx(
                'px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all',
                selectedTier === tier
                  ? 'bg-[#c5a059] text-black'
                  : 'bg-[#141417] border border-[#3d3d43] text-gray-400 hover:text-[#c5a059]'
              )}
            >
              {tier}-Tier
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-400 uppercase font-bold self-center mr-2">Category:</span>
          <button
            onClick={() => setSelectedCategory(null)}
            className={clsx(
              'px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all',
              selectedCategory === null
                ? 'bg-[#c5a059] text-black'
                : 'bg-[#141417] border border-[#3d3d43] text-gray-400 hover:text-[#c5a059]'
            )}
          >
            All
          </button>
          {['League Starter', 'End-game', 'Speed Farmer'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                'px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all',
                selectedCategory === category
                  ? 'bg-[#c5a059] text-black'
                  : 'bg-[#141417] border border-[#3d3d43] text-gray-400 hover:text-[#c5a059]'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Game Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-400 uppercase font-bold self-center mr-2">Game:</span>
          <button
            onClick={() => setSelectedGame(null)}
            className={clsx(
              'px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all',
              selectedGame === null
                ? 'bg-[#c5a059] text-black'
                : 'bg-[#141417] border border-[#3d3d43] text-gray-400 hover:text-[#c5a059]'
            )}
          >
            All Games
          </button>
          <button
            onClick={() => setSelectedGame('PoE 2')}
            className={clsx(
              'px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all',
              selectedGame === 'PoE 2'
                ? 'bg-[#c5a059] text-black'
                : 'bg-[#141417] border border-[#3d3d43] text-gray-400 hover:text-[#c5a059]'
            )}
          >
            PoE 2
          </button>
          <button
            onClick={() => setSelectedGame('Diablo IV')}
            className={clsx(
              'px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all',
              selectedGame === 'Diablo IV'
                ? 'bg-[#c5a059] text-black'
                : 'bg-[#141417] border border-[#3d3d43] text-gray-400 hover:text-[#c5a059]'
            )}
          >
            Diablo IV
          </button>
        </div>
      </div>

      {/* Build Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuilds.map((build) => (
          <div
            key={build.id}
            className="bg-[#141417] border border-[#3d3d43] p-6 hover:border-[#c5a059] transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className={clsx(
                      'px-2 py-1 text-xs font-black uppercase text-white',
                      tierColors[build.tier as keyof typeof tierColors]
                    )}
                  >
                    {build.tier}-Tier
                  </span>
                  <span className="px-2 py-1 text-xs bg-[#0c0c0e] border border-[#3d3d43] text-gray-400 uppercase">
                    {build.category}
                  </span>
                  <span className="text-xs text-gray-500 uppercase">{build.game}</span>
                </div>
                <h3 className="text-xl font-serif text-[#c5a059] mb-1 group-hover:text-[#d4b069] transition-colors">
                  {build.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{build.description}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <BookOpen size={14} />
                <span className="uppercase">{build.class}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={14} />
                <span>{build.views.toLocaleString()} {t('views')}</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp size={14} />
                <span>{build.upvotes.toLocaleString()} {t('upvotes')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{build.lastUpdated}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#3d3d43]">
              <Link
                href={`/builds/${build.id}`}
                className="block w-full py-2 bg-[#c5a059] text-black font-bold uppercase tracking-wider text-sm hover:bg-[#d4b069] transition-colors text-center"
              >
                View Build
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
