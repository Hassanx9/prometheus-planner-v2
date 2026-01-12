"use client";

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Sparkles, TrendingUp, Users, Trophy, BookOpen,
  Zap, Target, Shield, Swords, ChevronRight, Star,
  TrendingDown, Clock, Eye, ArrowRight, Play,
  Crown, Flame, Gem, Heart, Skull, Zap as Lightning,
  Award, BarChart3, Calendar, Compass, Crosshair,
  Diamond, Flame as Fire, Globe, Hammer, Infinity,
  Layers, Map, Moon, Mountain, Orbit, Palette,
  Rocket, Scroll, Settings, Shield as Armor,
  Sword, Target as Aim, Wand, Wind, Zap as Bolt
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');
  const locale = useLocale();
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced mock data with more sophistication
  const featuredBuilds = [
    {
      id: 1,
      name: 'Lightning Invoker',
      class: 'Sorcerer',
      tier: 'S',
      views: '245K',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=400&fit=crop&crop=center',
      author: 'Mathil',
      tags: ['Early Game', 'SSF Viable', 'Endgame'],
      description: 'Master the arcane arts with devastating lightning strikes that shatter reality itself.',
      stats: { damage: 98, survivability: 85, speed: 92 }
    },
    {
      id: 2,
      name: 'Titan Earthquake',
      class: 'Warrior',
      tier: 'S',
      views: '189K',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop&crop=center',
      author: 'Zizaran',
      tags: ['League Start', 'HC Viable'],
      description: 'Command the earth itself, summoning cataclysmic earthquakes that reshape the battlefield.',
      stats: { damage: 95, survivability: 96, speed: 78 }
    },
    {
      id: 3,
      name: 'Poison Concoction',
      class: 'Ranger',
      tier: 'A',
      views: '156K',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=600&h=400&fit=crop&crop=center',
      author: 'Grimro',
      tags: ['Budget', 'Fast Clear'],
      description: 'Brew deadly concoctions that corrode armor and wither the strongest foes.',
      stats: { damage: 89, survivability: 82, speed: 94 }
    },
    {
      id: 4,
      name: 'Blood Mage',
      class: 'Witch',
      tier: 'A',
      views: '134K',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop&crop=center',
      author: 'Waggle',
      tags: ['Damage', 'Magic Find'],
      description: 'Sacrifice life force for unimaginable power, turning blood into pure destruction.',
      stats: { damage: 97, survivability: 76, speed: 88 }
    },
  ];

  const trendingGuides = [
    {
      title: 'Campaign Act 1-3 Walkthrough',
      views: '89K',
      time: '2 hours ago',
      type: 'Guide',
      icon: Map,
      color: '#7ecce0'
    },
    {
      title: 'Currency Farming Strategy 0.4',
      views: '67K',
      time: '5 hours ago',
      type: 'Guide',
      icon: Diamond,
      color: '#c5a059'
    },
    {
      title: 'Best Support Gems for Crossbow',
      views: '54K',
      time: '1 day ago',
      type: 'Guide',
      icon: Crosshair,
      color: '#e74c3c'
    },
  ];

  const metaClasses = [
    { name: 'Mercenary', popularity: 28, trend: 'up', color: '#c5a059', icon: Sword },
    { name: 'Sorcerer', popularity: 24, trend: 'up', color: '#7ecce0', icon: Wand },
    { name: 'Monk', popularity: 18, trend: 'same', color: '#9b59b6', icon: Heart },
    { name: 'Warrior', popularity: 15, trend: 'down', color: '#e74c3c', icon: Shield },
    { name: 'Ranger', popularity: 15, trend: 'up', color: '#2ecc71', icon: Crosshair },
  ];

  const stats = [
    { label: 'Active Players', value: '2.4M+', icon: Users, color: '#7ecce0' },
    { label: 'Builds Created', value: '890K+', icon: Hammer, color: '#c5a059' },
    { label: 'Guides Published', value: '45K+', icon: Scroll, color: '#9b59b6' },
    { label: 'Tournaments Won', value: '1.2K+', icon: Trophy, color: '#e74c3c' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0f] via-[#050506] to-[#0f0f13] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7ecce0]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#c5a059]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#9b59b6]/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* CINEMATIC HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop&crop=center')] bg-cover bg-center opacity-20 scale-110"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b0f]/90 via-[#050506]/80 to-[#0f0f13]/90"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0a0b0f]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 animate-float">
            <Sparkles className="text-[#7ecce0]/30" size={24} />
          </div>
          <div className="absolute top-40 right-32 animate-float-delayed">
            <Crown className="text-[#c5a059]/30" size={20} />
          </div>
          <div className="absolute bottom-32 left-32 animate-float">
            <Gem className="text-[#9b59b6]/30" size={22} />
          </div>
          <div className="absolute bottom-20 right-20 animate-float-delayed">
            <Lightning className="text-[#e74c3c]/30" size={26} />
          </div>
        </div>

        {/* Hero Content */}
        <div className={`relative max-w-7xl mx-auto px-8 text-center transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c5a059]/20 to-[#7ecce0]/20 backdrop-blur-xl border border-[#c5a059]/30 px-6 py-3 rounded-full mb-8 hover:border-[#c5a059]/50 transition-all duration-300 group">
            <div className="relative">
              <Sparkles className="text-[#c5a059] animate-pulse" size={18} />
              <div className="absolute inset-0 bg-[#c5a059]/20 rounded-full blur-sm animate-ping"></div>
            </div>
            <span className="text-sm font-bold text-[#c5a059] uppercase tracking-[0.2em] group-hover:text-[#7ecce0] transition-colors duration-300">
              Early Access 0.4 - The Third Edict
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-[#c5a059] to-[#7ecce0] bg-clip-text text-transparent animate-gradient">
              PROMETHEUS
            </span>
            <br />
            <span className="text-white/90 text-4xl md:text-6xl font-light tracking-wide">
              PLANNER
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Master the arcane arts of Path of Exile 2. Forge legendary builds, conquer impossible challenges,
            and ascend to godhood with the most sophisticated planning tool ever created.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href={`/${locale}/builds`}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#c5a059] to-[#7ecce0] rounded-xl font-bold text-black text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#c5a059]/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#7ecce0] to-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3">
                <Rocket size={20} />
                Start Building
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            <Link
              href={`/${locale}/ai`}
              className="group px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl font-semibold text-white text-lg uppercase tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
            >
              <span className="flex items-center gap-3">
                <Zap size={20} />
                AI Assistant
                <Play size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </span>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-4 group-hover:border-white/20 transition-colors duration-300">
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* PREMIUM FEATURED BUILDS SECTION */}
      <section className="relative py-24 overflow-hidden">
        {/* Section Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b0f] via-[#050506] to-[#0a0b0f]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(197,160,89,0.1),_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(126,204,224,0.1),_transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c5a059]/10 to-[#7ecce0]/10 backdrop-blur-xl border border-[#c5a059]/20 px-6 py-3 rounded-full mb-8">
              <Crown className="text-[#c5a059] animate-pulse" size={20} />
              <span className="text-sm font-bold text-[#c5a059] uppercase tracking-[0.2em]">
                Masterpiece Builds
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-[#c5a059] to-[#7ecce0] bg-clip-text text-transparent">
                Legendary Creations
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Discover builds crafted by the most skilled exiles, each one a testament to strategic brilliance and unyielding determination.
            </p>
          </div>

          {/* Builds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBuilds.map((build, index) => (
              <div
                key={build.id}
                className={`group relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 200 + 800}ms` }}
              >
                <Link href={`/${locale}/builds/${build.id}`} className="block">
                  {/* Build Card */}
                  <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[#c5a059]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#c5a059]/20 group-hover:shadow-[#c5a059]/30">

                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={build.image}
                        alt={build.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Tier Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wide shadow-lg backdrop-blur-xl border ${
                          build.tier === 'S'
                            ? 'bg-[#c5a059]/90 text-black border-[#c5a059]/50'
                            : 'bg-[#7ecce0]/90 text-black border-[#7ecce0]/50'
                        }`}>
                          Tier {build.tier}
                        </div>
                      </div>

                      {/* Stats Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-xs text-white/80 uppercase tracking-wide font-bold">Damage</div>
                          <div className="text-xs text-white/80 uppercase tracking-wide font-bold">Survivability</div>
                          <div className="text-xs text-white/80 uppercase tracking-wide font-bold">Speed</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#e74c3c] to-[#c0392b] rounded-full transition-all duration-1000"
                              style={{ width: `${build.stats.damage}%` }}
                            ></div>
                          </div>
                          <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#2ecc71] to-[#27ae60] rounded-full transition-all duration-1000"
                              style={{ width: `${build.stats.survivability}%` }}
                            ></div>
                          </div>
                          <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#7ecce0] to-[#3498db] rounded-full transition-all duration-1000"
                              style={{ width: `${build.stats.speed}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#c5a059] to-[#7ecce0] rounded-lg flex items-center justify-center">
                          <Sword size={16} className="text-black" />
                        </div>
                        <span className="text-xs text-white/60 uppercase tracking-wide font-bold">
                          {build.class}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#c5a059] transition-colors duration-300">
                        {build.name}
                      </h3>

                      <p className="text-sm text-white/70 mb-4 leading-relaxed">
                        {build.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Star size={14} className="text-[#c5a059] fill-[#c5a059]" />
                          <span className="text-sm font-bold text-white">{build.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-white/60">
                          <Eye size={12} />
                          <span>{build.views}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {build.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-white/5 text-white/70 rounded-full border border-white/10 font-medium hover:bg-white/10 hover:border-white/20 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* View All Builds CTA */}
          <div className={`text-center mt-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '2000ms' }}>
            <Link
              href={`/${locale}/builds`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c5a059] to-[#7ecce0] rounded-xl font-bold text-black text-lg uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#c5a059]/25"
            >
              <span>Explore All Masterpieces</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* TRENDING GUIDES & META CLASSES SECTION */}
      <section className="relative py-24 bg-gradient-to-b from-[#0a0b0f] to-[#050506]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(155,89,182,0.1),_transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Trending Guides */}
            <div className="lg:col-span-2">
              <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '2200ms' }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] rounded-xl flex items-center justify-center">
                    <Scroll size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white">Wisdom Archives</h3>
                    <p className="text-white/60">Latest insights from the masters</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {trendingGuides.map((guide, index) => (
                    <div
                      key={index}
                      className={`group p-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-xl hover:border-[${guide.color}]/50 transition-all duration-500 hover:scale-[1.02] cursor-pointer`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center border border-white/20">
                            <guide.icon size={20} style={{ color: guide.color }} />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                            {guide.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-1">
                              <Eye size={14} />
                              <span>{guide.views} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{guide.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <ChevronRight size={20} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Link
                    href={`/${locale}/database`}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl font-semibold text-white uppercase tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
                  >
                    <BookOpen size={18} />
                    <span>Browse Complete Archives</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Meta Classes */}
            <div className="lg:col-span-1">
              <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '2400ms' }}>
                <div className="sticky top-24">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#e74c3c] to-[#c0392b] rounded-xl flex items-center justify-center">
                      <Trophy size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-white">Class Dominance</h3>
                      <p className="text-white/60">Current meta landscape</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {metaClasses.map((cls, index) => (
                      <div
                        key={index}
                        className={`p-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-xl transition-all duration-500`}
                        style={{ transitionDelay: `${index * 100 + 500}ms` }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center border border-white/20">
                              <cls.icon size={16} style={{ color: cls.color }} />
                            </div>
                            <span className="font-bold text-white">{cls.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {cls.trend === 'up' && <TrendingUp size={14} className="text-green-400" />}
                            {cls.trend === 'down' && <TrendingDown size={14} className="text-red-400" />}
                            {cls.trend === 'same' && <div className="w-3 h-0.5 bg-white/40 rounded"></div>}
                            <span className="text-sm font-bold text-white">{cls.popularity}%</span>
                          </div>
                        </div>

                        <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${cls.popularity}%`,
                              background: `linear-gradient(90deg, ${cls.color}, ${cls.color}dd)`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Link
                      href={`/${locale}/leaderboards`}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl font-semibold text-white uppercase tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
                    >
                      <BarChart3 size={18} />
                      <span>View Rankings</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM FEATURES SHOWCASE */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050506] to-[#0a0b0f]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(197,160,89,0.1),_transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '2600ms' }}>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#7ecce0]/10 to-[#9b59b6]/10 backdrop-blur-xl border border-[#7ecce0]/20 px-6 py-3 rounded-full mb-8">
              <Infinity className="text-[#7ecce0] animate-pulse" size={20} />
              <span className="text-sm font-bold text-[#7ecce0] uppercase tracking-[0.2em]">
                Infinite Possibilities
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-[#7ecce0] to-[#9b59b6] bg-clip-text text-transparent">
                Forge Your Destiny
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Every tool, every insight, every connection you need to transcend the boundaries of ordinary gameplay.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI Build Advisor",
                description: "Conversational AI that understands your playstyle and crafts personalized builds with surgical precision.",
                color: "#7ecce0",
                href: `/${locale}/ai`,
                features: ["GPT-4o Powered", "Personalized Recommendations", "Real-time Optimization"]
              },
              {
                icon: TrendingUp,
                title: "Live Economy Engine",
                description: "Real-time market data, price predictions, and trading insights that keep you ahead of the curve.",
                color: "#c5a059",
                href: `/${locale}/economy`,
                features: ["Live Price Feeds", "Market Analytics", "Trading Alerts"]
              },
              {
                icon: Users,
                title: "Elite Community",
                description: "Connect with legendary players, share forbidden knowledge, and ascend together in the eternal struggle.",
                color: "#9b59b6",
                href: `/${locale}/community`,
                features: ["Expert Discussions", "Build Showcases", "Tournament Networks"]
              },
              {
                icon: Target,
                title: "Precision Database",
                description: "Every item, every gem, every passive skill meticulously cataloged with advanced filtering and search.",
                color: "#e74c3c",
                href: `/${locale}/database`,
                features: ["Complete Item Database", "Advanced Filters", "Build Calculators"]
              },
              {
                icon: Trophy,
                title: "Hall of Legends",
                description: "Compete in tournaments, climb the leaderboards, and etch your name in the annals of history.",
                color: "#2ecc71",
                href: `/${locale}/leaderboards`,
                features: ["Global Rankings", "Tournament System", "Achievement Badges"]
              },
              {
                icon: Settings,
                title: "Customization Forge",
                description: "Tailor every aspect of your experience with premium settings and personalization options.",
                color: "#f39c12",
                href: `/${locale}/settings`,
                features: ["Theme Customization", "Notification Settings", "Privacy Controls"]
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 150 + 2800}ms` }}
              >
                <Link href={feature.href} className="block h-full">
                  <div className="h-full p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 group-hover:shadow-white/20">

                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{ background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)` }}
                      >
                        <feature.icon size={32} style={{ color: feature.color }} className="drop-shadow-lg" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-white/70 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Feature List */}
                    <div className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: feature.color }}></div>
                          <span className="text-sm text-white/60">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Arrow */}
                    <div className="mt-6 flex justify-end">
                      <ArrowRight size={20} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0f] via-[#050506] to-[#0f0f13]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(197,160,89,0.15),_transparent_70%)]"></div>

        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '3500ms' }}>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c5a059]/20 to-[#7ecce0]/20 backdrop-blur-xl border border-[#c5a059]/30 px-6 py-3 rounded-full mb-8">
              <Rocket className="text-[#c5a059] animate-pulse" size={20} />
              <span className="text-sm font-bold text-[#c5a059] uppercase tracking-[0.2em]">
                Begin Your Ascension
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-[#c5a059] to-[#7ecce0] bg-clip-text text-transparent">
                The Throne Awaits
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the ranks of the immortal. Your legend begins now.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href={`/${locale}/builds`}
                className="group relative px-10 py-5 bg-gradient-to-r from-[#c5a059] to-[#7ecce0] rounded-xl font-bold text-black text-xl uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#c5a059]/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7ecce0] to-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-4">
                  <Crown size={24} />
                  Claim Your Destiny
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Link>

              <Link
                href={`/${locale}/ai`}
                className="group px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl font-semibold text-white text-xl uppercase tracking-wide transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105"
              >
                <span className="flex items-center gap-4">
                  <Sparkles size={24} />
                  Seek Divine Guidance
                  <Play size={20} className="group-hover:scale-125 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 animate-float-slow">
            <Crown className="text-[#c5a059]/20" size={32} />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float-delayed-slow">
            <Gem className="text-[#9b59b6]/20" size={28} />
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-float-slow">
            <Lightning className="text-[#7ecce0]/20" size={30} />
          </div>
          <div className="absolute bottom-1/3 right-1/3 animate-float-delayed-slow">
            <Flame className="text-[#e74c3c]/20" size={26} />
          </div>
        </div>
      </section>
    </div>
  );
}

