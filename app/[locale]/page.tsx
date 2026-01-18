"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Sparkles, TrendingUp, Users, Trophy, BookOpen, 
  Zap, Target, Shield, Swords, Sword, ChevronRight, Star,
  TrendingDown, Clock, Eye, Gamepad2, Play,
  Info, Code, Heart, Plus, Gem
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import ErrorBoundary from '@/components/ErrorBoundary';

type Game = 'PoE 2' | 'Diablo IV';

export default function HomePage() {
  const t = useTranslations('common');
  const locale = useLocale();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Load selected game from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selectedGame');
    if (saved && (saved === 'PoE 2' || saved === 'Diablo IV')) {
      setSelectedGame(saved);
    }
  }, []);

  // Mock data for featured builds
  const featuredBuilds = [
    {
      id: 1,
      name: 'Lightning Invoker',
      class: 'Sorcerer',
      tier: 'S',
      views: '245K',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400',
      author: 'Mathil',
      tags: ['Early Game', 'SSF Viable', 'Endgame'],
      game: 'PoE 2' as Game,
    },
    {
      id: 2,
      name: 'Titan Earthquake',
      class: 'Warrior',
      tier: 'S',
      views: '189K',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
      author: 'Zizaran',
      tags: ['League Start', 'HC Viable'],
      game: 'PoE 2' as Game,
    },
    {
      id: 3,
      name: 'Poison Concoction',
      class: 'Ranger',
      tier: 'A',
      views: '156K',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=400',
      author: 'Grimro',
      tags: ['Budget', 'Fast Clear'],
      game: 'Diablo IV' as Game,
    },
    {
      id: 4,
      name: 'Blood Mage',
      class: 'Witch',
      tier: 'A',
      views: '134K',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
      author: 'Waggle',
      tags: ['Damage', 'Magic Find'],
      game: 'PoE 2' as Game,
    },
  ];

  const trendingGuides = [
    { title: 'Campaign Act 1-3 Walkthrough', views: '89K', time: '2 hours ago', type: 'Guide' },
    { title: 'Currency Farming Strategy 0.4', views: '67K', time: '5 hours ago', type: 'Guide' },
    { title: 'Best Support Gems for Crossbow', views: '54K', time: '1 day ago', type: 'Guide' },
  ];

  // Trending builds for the homepage
  const trendingBuilds = [
    { title: 'Lightning Invoker', class: 'Sorcerer', rating: 4.9, author: 'Mathil', tags: ['Early Game', 'SSF Viable'] },
    { title: 'Titan Earthquake', class: 'Warrior', rating: 4.8, author: 'Zizaran', tags: ['League Start', 'HC Viable'] },
    { title: 'Poison Concoction', class: 'Ranger', rating: 4.7, author: 'Grimro', tags: ['Budget', 'Fast Clear'] },
    { title: 'Blood Mage', class: 'Witch', rating: 4.6, author: 'Waggle', tags: ['Damage', 'Magic Find'] },
  ];

  const metaClasses = [
    { name: 'Mercenary', popularity: 28, trend: 'up', color: '#c5a059' },
    { name: 'Sorcerer', popularity: 24, trend: 'up', color: '#7ecce0' },
    { name: 'Monk', popularity: 18, trend: 'same', color: '#9b59b6' },
    { name: 'Warrior', popularity: 15, trend: 'down', color: '#e74c3c' },
    { name: 'Ranger', popularity: 15, trend: 'up', color: '#2ecc71' },
  ];

  // Game-specific classes
  const gameClasses = {
    'PoE 2': [
      { name: 'Marauder', icon: '⚔️', buildCount: 45 },
      { name: 'Duelist', icon: '🤺', buildCount: 42 },
      { name: 'Ranger', icon: '🏹', buildCount: 38 },
      { name: 'Shadow', icon: '🗡️', buildCount: 35 },
      { name: 'Witch', icon: '🧙‍♀️', buildCount: 32 },
      { name: 'Templar', icon: '⚜️', buildCount: 28 },
      { name: 'Scion', icon: '👑', buildCount: 25 },
    ],
    'Diablo IV': [
      { name: 'Barbarian', icon: '💪', buildCount: 28 },
      { name: 'Sorcerer', icon: '🔮', buildCount: 24 },
      { name: 'Rogue', icon: '🗡️', buildCount: 20 },
      { name: 'Druid', icon: '🌿', buildCount: 18 },
      { name: 'Necromancer', icon: '💀', buildCount: 16 },
    ],
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-[#0a0b0f] via-[#050506] to-[#0a0b0f]">
        
        {/* Game Selection */}
        {!selectedGame && (
          <section className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#c5a059] via-[#d4b16a] to-[#c5a059] bg-clip-text text-transparent mb-8">
              Choose Your Game
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Select your preferred ARPG to access specialized build guides, item databases, and community resources.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* PoE 2 Card */}
              <button
                onClick={() => setSelectedGame('PoE 2')}
                className="group relative overflow-hidden bg-gradient-to-br from-[#1a1c2e] to-[#0f1116] border border-[#3d3d43] hover:border-[#c5a059] p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#c5a059]/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#c5a059] to-[#d4b16a] rounded-2xl flex items-center justify-center shadow-lg">
                    <Sword className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Path of Exile 2</h3>
                  <p className="text-gray-400 mb-6">
                    Next-generation ARPG with deep character customization and endless possibilities.
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      Active Community
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      500+ Builds
                    </span>
                  </div>
                </div>
              </button>

              {/* Diablo IV Card */}
              <button
                onClick={() => setSelectedGame('Diablo IV')}
                className="group relative overflow-hidden bg-gradient-to-br from-[#1a1c2e] to-[#0f1116] border border-[#3d3d43] hover:border-[#c5a059] p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#c5a059]/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#c5a059] to-[#d4b16a] rounded-2xl flex items-center justify-center shadow-lg">
                    <Gamepad2 className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Diablo IV</h3>
                  <p className="text-gray-400 mb-6">
                    Fast-paced action with class specialization and seasonal content.
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      Growing Community
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      200+ Builds
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>
      )}

      {selectedGame && (
        <div>
          {/* Game Header */}
          <section className="bg-gradient-to-r from-[#1a1c2e] to-[#0f1116] border-b border-[#3d3d43]/50 py-6">
            <div className="max-w-[1600px] mx-auto px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#c5a059]/10 hover:bg-[#c5a059]/20 border border-[#c5a059]/30 hover:border-[#c5a059] text-[#c5a059] rounded-lg transition-all"
                  >
                    <ChevronRight className="rotate-180" size={16} />
                    Change Game
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#c5a059] to-[#d4b16a] rounded-xl flex items-center justify-center shadow-lg">
                      {selectedGame === 'PoE 2' ? <Sword className="text-black" size={24} /> : <Gamepad2 className="text-black" size={24} />}
                    </div>
                    <div>
                      <h1 className="text-2xl font-black text-white">{selectedGame}</h1>
                      <p className="text-sm text-gray-400">Build Planner</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href={`/${locale}/builds`}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black font-bold rounded-xl hover:shadow-lg transition-all"
                  >
                    <Plus size={20} />
                    Create Build
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Hero Section */}
          <section className="relative h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c2e] via-[#0f1116] to-[#0a0b0f]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f] via-transparent to-transparent"></div>
            
            <div className="relative h-full flex items-center">
              <div className="max-w-[1600px] mx-auto px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
                      Master Your
                      <span className="block bg-gradient-to-r from-[#c5a059] via-[#d4b16a] to-[#c5a059] bg-clip-text text-transparent">
                        {selectedGame}
                      </span>
                      Builds
                    </h1>
                    <p className="text-xl text-gray-400 mb-8 max-w-lg">
                      Create, optimize, and share powerful character builds with our comprehensive planning tools and AI assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href={`/${locale}/builds`}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-[#c5a059]/30 transition-all"
                      >
                        <Sword size={24} />
                        Start Building
                      </Link>
                      <Link
                        href={`/${locale}/ai`}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all"
                      >
                        <Sparkles size={24} />
                        AI Assistant
                      </Link>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full h-80 bg-gradient-to-br from-[#1a1c2e] to-[#0f1116] rounded-2xl border border-[#3d3d43] flex items-center justify-center shadow-premium-xl">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#c5a059] to-[#d4b16a] rounded-full flex items-center justify-center shadow-lg">
                          {selectedGame === 'PoE 2' ? <Sword className="text-black" size={40} /> : <Gamepad2 className="text-black" size={40} />}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Interactive Build Planner</h3>
                        <p className="text-gray-400">Plan your perfect character with our advanced tools</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trending Builds Section */}
          <section className="max-w-[1600px] mx-auto px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Trending Builds</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover the most popular and powerful builds from our community of expert players.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {trendingBuilds.map((build, idx) => (
                <div 
                  key={idx}
                  className="bg-[#1a1c2e] rounded-xl border border-[#3d3d43] p-6 hover:border-[#c5a059] transition-all cursor-pointer group shadow-premium"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#c5a059] to-[#d4b16a] rounded-lg flex items-center justify-center shadow-lg">
                        <Sword className="text-black" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-[#c5a059] transition-colors">{build.title}</h3>
                        <p className="text-sm text-gray-400">{build.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Star size={14} className="text-[#c5a059] fill-[#c5a059]" />
                      <span className="text-sm font-bold text-white">{build.rating}</span>
                      <span className="text-xs text-gray-500">by {build.author}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {build.tags.slice(0, 2).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded border border-white/10 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tutorial Video Section */}
          <section className="py-16 bg-gradient-to-r from-[#1a1c2e]/50 to-[#0f1116]/50">
            <div className="max-w-[1600px] mx-auto px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Getting Started</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Watch our comprehensive tutorial to master build planning and optimization.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="relative bg-[#1a1c2e] rounded-2xl border border-[#3d3d43] overflow-hidden shadow-premium-xl">
                  <div className="aspect-video bg-gradient-to-br from-[#0f1116] to-[#1a1c2e] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#c5a059] to-[#d4b16a] rounded-full flex items-center justify-center shadow-lg">
                        <Play size={40} className="text-black ml-1" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Build Planning Masterclass</h3>
                      <p className="text-gray-400 mb-6">Learn advanced strategies and optimization techniques</p>
                      <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#c5a059]/30 transition-all">
                        <Play size={20} />
                        Watch Tutorial (15 min)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Item Database Section */}
          <section className="py-16">
            <div className="max-w-[1600px] mx-auto px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Item Database</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Comprehensive database of all weapons, armor, jewelry, and more.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#1a1c2e] rounded-xl border border-[#3d3d43] p-8 text-center hover:border-[#c5a059] transition-all shadow-premium">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#c5a059] to-[#d4b16a] rounded-xl flex items-center justify-center shadow-lg">
                    <Sword className="text-black" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Weapons</h3>
                  <p className="text-gray-400 mb-4">Thousands of unique weapons with detailed stats</p>
                  <Link
                    href={`/${locale}/database`}
                    className="inline-flex items-center gap-2 text-[#c5a059] font-bold hover:text-[#d4b16a] transition-colors"
                  >
                    Browse Weapons
                    <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="bg-[#1a1c2e] rounded-xl border border-[#3d3d43] p-8 text-center hover:border-[#c5a059] transition-all shadow-premium">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#c5a059] to-[#d4b16a] rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="text-black" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Armor</h3>
                  <p className="text-gray-400 mb-4">Complete armor sets for every playstyle</p>
                  <Link
                    href={`/${locale}/database`}
                    className="inline-flex items-center gap-2 text-[#c5a059] font-bold hover:text-[#d4b16a] transition-colors"
                  >
                    Browse Armor
                    <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="bg-[#1a1c2e] rounded-xl border border-[#3d3d43] p-8 text-center hover:border-[#c5a059] transition-all shadow-premium">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#c5a059] to-[#d4b16a] rounded-xl flex items-center justify-center shadow-lg">
                    <Gem className="text-black" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Jewelry</h3>
                  <p className="text-gray-400 mb-4">Rings, amulets, and belts with unique modifiers</p>
                  <Link
                    href={`/${locale}/database`}
                    className="inline-flex items-center gap-2 text-[#c5a059] font-bold hover:text-[#d4b16a] transition-colors"
                  >
                    Browse Jewelry
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Trending Guides */}
            <div className="lg:col-span-2">
              <div className="bg-[#1a1c2e] rounded-xl border border-[#3d3d43] p-8 shadow-premium">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp size={24} className="text-[#c5a059]" />
                  <h3 className="text-2xl font-black text-white">Trending Guides</h3>
                </div>

                <div className="space-y-4">
                  {trendingGuides.map((guide, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4 bg-[#0f1116] hover:bg-[#14151c] rounded-lg border border-[#2a2c3e] hover:border-[#c5a059] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-black text-gray-600 group-hover:text-[#c5a059] transition-colors">
                          #{idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-white group-hover:text-[#c5a059] transition-colors mb-1">
                            {guide.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye size={12} />
                              {guide.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {guide.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-600 group-hover:text-[#c5a059] transition-colors" />
                    </div>
                  ))}
                </div>

                <Link
                  href={`/${locale}/database`}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black font-black text-sm uppercase tracking-wider rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Browse All Guides
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right Column - Meta Classes */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1c2e] rounded-xl border border-[#3d3d43] p-8 shadow-premium sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy size={24} className="text-[#c5a059]" />
                  <h3 className="text-2xl font-black text-white">Meta Classes</h3>
                </div>

                <div className="space-y-4">
                  {metaClasses.map((cls, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{cls.name}</span>
                          {cls.trend === 'up' && <TrendingUp size={14} className="text-green-500" />}
                          {cls.trend === 'down' && <TrendingDown size={14} className="text-red-500" />}
                        </div>
                        <span className="text-sm font-bold text-gray-400">{cls.popularity}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${cls.popularity}%`,
                            background: `linear-gradient(90deg, ${cls.color}, ${cls.color}dd)`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/${locale}/leaderboards`}
                  className="mt-6 w-full py-3 bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-wider rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  View Leaderboards
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Link
              href={`/${locale}/ai`}
              className="group p-8 bg-gradient-to-br from-[#1a1c2e] to-[#0f1116] rounded-xl border border-[#3d3d43] hover:border-[#c5a059] transition-all shadow-premium hover:shadow-premium-lg"
            >
              <Sparkles size={32} className="text-[#c5a059] mb-4 group-hover:animate-pulse" />
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#c5a059] transition-colors">
                AI Build Advisor
              </h3>
              <p className="text-sm text-gray-500">
                Get personalized build recommendations powered by GPT-4o
              </p>
            </Link>

            <Link
              href={`/${locale}/economy`}
              className="group p-8 bg-gradient-to-br from-[#1a1c2e] to-[#0f1116] rounded-xl border border-[#3d3d43] hover:border-[#7ecce0] transition-all shadow-premium hover:shadow-premium-lg"
            >
              <TrendingUp size={32} className="text-[#7ecce0] mb-4" />
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#7ecce0] transition-colors">
                Live Economy
              </h3>
              <p className="text-sm text-gray-500">
                Real-time market prices and trading insights
              </p>
            </Link>

            <Link
              href={`/${locale}/community`}
              className="group p-8 bg-gradient-to-br from-[#1a1c2e] to-[#0f1116] rounded-xl border border-[#3d3d43] hover:border-[#9b59b6] transition-all shadow-premium hover:shadow-premium-lg"
            >
              <Users size={32} className="text-[#9b59b6] mb-4" />
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#9b59b6] transition-colors">
                Community Hub
              </h3>
              <p className="text-sm text-gray-500">
                Share builds, discuss strategies, and connect with players
              </p>
            </Link>
          </div>

        </div>
      )}

    </div>
    </ErrorBoundary>
  );
}