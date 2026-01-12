"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { 
  Sparkles, TrendingUp, Users, Trophy, BookOpen, 
  Zap, Target, Shield, Swords, ChevronRight, Star,
  TrendingDown, Clock, Eye
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');
  const locale = useLocale();

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
    },
  ];

  const trendingGuides = [
    { title: 'Campaign Act 1-3 Walkthrough', views: '89K', time: '2 hours ago', type: 'Guide' },
    { title: 'Currency Farming Strategy 0.4', views: '67K', time: '5 hours ago', type: 'Guide' },
    { title: 'Best Support Gems for Crossbow', views: '54K', time: '1 day ago', type: 'Guide' },
  ];

  const metaClasses = [
    { name: 'Mercenary', popularity: 28, trend: 'up', color: '#c5a059' },
    { name: 'Sorcerer', popularity: 24, trend: 'up', color: '#7ecce0' },
    { name: 'Monk', popularity: 18, trend: 'same', color: '#9b59b6' },
    { name: 'Warrior', popularity: 15, trend: 'down', color: '#e74c3c' },
    { name: 'Ranger', popularity: 15, trend: 'up', color: '#2ecc71' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b0f] via-[#050506] to-[#0a0b0f]">
      
      {/* HERO BANNER */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f] via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-[1600px] mx-auto px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="text-[#c5a059]" size={16} />
              <span className="text-sm font-bold text-[#c5a059] uppercase tracking-wider">
                Early Access 0.4 - The Third Edict
              </span>
            </div>
            
            <h1 className="text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              Master Path of Exile 2
              <span className="text-gradient-gold block mt-2">Build Your Legend</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl">
              Discover top-tier builds, expert guides, and real-time analytics. 
              Join thousands of exiles crafting the perfect character.
            </p>

            <div className="flex gap-4">
              <Link
                href={`/${locale}/builds`}
                className="btn-premium px-8 py-4 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black font-black text-sm uppercase tracking-wider rounded-lg shadow-premium-lg hover:shadow-[#c5a059]/40 transition-all flex items-center gap-2"
              >
                <Target size={20} />
                Explore Builds
                <ChevronRight size={18} />
              </Link>
              <Link
                href={`/${locale}/ai`}
                className="btn-premium px-8 py-4 bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-wider rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                <Sparkles size={20} />
                AI Build Guide
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-white/5">
          <div className="max-w-[1600px] mx-auto px-8 py-4">
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">2.5M+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-[#c5a059] mb-1">500+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Verified Builds</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-[#7ecce0] mb-1">1.2K+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Expert Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-1">Live</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Economy Data</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-[1600px] mx-auto px-8 py-16">
        
        {/* Featured Builds Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Featured Builds</h2>
              <p className="text-gray-500">Top-performing builds from the community</p>
            </div>
            <Link 
              href={`/${locale}/builds`}
              className="text-[#c5a059] hover:text-[#d4b16a] font-bold flex items-center gap-2 transition-colors"
            >
              View All Builds
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBuilds.map((build) => (
              <div 
                key={build.id}
                className="group bg-[#1a1c2e] rounded-xl overflow-hidden border border-[#3d3d43] hover:border-[#c5a059] transition-all shadow-premium hover:shadow-premium-lg cursor-pointer"
              >
                {/* Build Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                  <img 
                    src={build.image} 
                    alt={build.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Tier Badge */}
                  <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-lg font-black text-sm ${
                    build.tier === 'S' 
                      ? 'bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black' 
                      : 'bg-gradient-to-r from-[#7ecce0] to-[#8dd6ea] text-black'
                  } shadow-lg`}>
                    Tier {build.tier}
                  </div>
                  {/* Views */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <Eye size={14} className="text-gray-400" />
                    <span className="text-xs font-bold text-white">{build.views}</span>
                  </div>
                </div>

                {/* Build Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={16} className="text-[#c5a059]" />
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                      {build.class}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#c5a059] transition-colors">
                    {build.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={14} className="text-[#c5a059] fill-[#c5a059]" />
                    <span className="text-sm font-bold text-white">{build.rating}</span>
                    <span className="text-xs text-gray-500">by {build.author}</span>
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
              </div>
            ))}
          </div>
        </div>

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

      </section>
    </div>
  );
}
