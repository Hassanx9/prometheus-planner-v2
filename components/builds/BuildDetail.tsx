'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { 
  Download, Upload, Share2, ThumbsUp, MessageCircle, 
  Eye, Clock, TrendingUp, Hammer, Package, Target,
  ChevronRight, Play, BookOpen, ExternalLink
} from 'lucide-react';
import { Build } from '@/types';
import { GemLinksViewer } from './GemLinksViewer';
import { CraftingGuide } from './CraftingGuide';
import { GearPriorityChart } from './GearPriorityChart';
import { BuildImportExport } from './BuildImportExport';
import { clsx } from 'clsx';

interface BuildDetailProps {
  build: Build;
}

export function BuildDetail({ build }: BuildDetailProps) {
  const t = useTranslations('builds');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'overview' | 'skillTree' | 'gems' | 'crafting' | 'gear' | 'leveling'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'skillTree', label: 'Skill Tree', icon: Target },
    { id: 'gems', label: 'Gem Links', icon: Package },
    { id: 'crafting', label: 'Crafting Guide', icon: Hammer },
    { id: 'gear', label: 'Gear Priority', icon: TrendingUp },
    { id: 'leveling', label: 'Leveling Guide', icon: Clock },
    { id: 'import', label: 'Import/Export', icon: Download },
  ];

  return (
    <div className="min-h-screen bg-[#050506] text-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#0c0c0e] to-[#050506] border-b border-[#3d3d43]">
        <div className="max-w-[1800px] mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Build Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-4 py-2 text-sm font-black uppercase ${
                  build.tier === 'S' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  build.tier === 'A' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  build.tier === 'B' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                  build.tier === 'C' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                  'bg-gradient-to-r from-gray-500 to-slate-500'
                } text-white`}>
                  {build.tier}-Tier
                </span>
                <span className="px-4 py-2 bg-[#141417] border border-[#3d3d43] text-sm uppercase text-gray-400">
                  {build.category}
                </span>
                <span className="px-4 py-2 bg-[#141417] border border-[#3d3d43] text-sm uppercase text-gray-400">
                  {build.game}
                </span>
              </div>
              
              <h1 className="text-5xl font-serif text-[#c5a059] mb-4">{build.name}</h1>
              <p className="text-xl text-gray-300 mb-6">{build.description}</p>
              
              {build.fullDescription && (
                <p className="text-gray-400 leading-relaxed mb-6">{build.fullDescription}</p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Eye size={18} className="text-gray-500" />
                  <span className="text-gray-400">{build.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp size={18} className="text-gray-500" />
                  <span className="text-gray-400">{build.upvotes.toLocaleString()} upvotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} className="text-gray-500" />
                  <span className="text-gray-400">{build.comments} comments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-gray-500" />
                  <span className="text-gray-400">Updated {build.lastUpdated}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors flex items-center gap-2">
                  <Download size={18} />
                  Export Build
                </button>
                <button className="px-6 py-3 bg-[#141417] border border-[#3d3d43] text-gray-300 font-bold uppercase tracking-wider hover:border-[#c5a059] hover:text-[#c5a059] transition-colors flex items-center gap-2">
                  <Upload size={18} />
                  Import Build
                </button>
                <button className="px-6 py-3 bg-[#141417] border border-[#3d3d43] text-gray-300 font-bold uppercase tracking-wider hover:border-[#c5a059] hover:text-[#c5a059] transition-colors flex items-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
                {build.gameplayVideo && (
                  <button className="px-6 py-3 bg-[#141417] border border-[#3d3d43] text-gray-300 font-bold uppercase tracking-wider hover:border-[#c5a059] hover:text-[#c5a059] transition-colors flex items-center gap-2">
                    <Play size={18} />
                    Gameplay Preview
                  </button>
                )}
              </div>
            </div>

            {/* Author Card */}
            <div className="lg:w-80">
              <div className="bg-[#141417] border border-[#3d3d43] p-6">
                <h3 className="text-[#c5a059] font-serif text-sm uppercase mb-4">Build Author</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#0c0c0e] border border-[#3d3d43] rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#c5a059]">{build.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-bold">{build.author}</p>
                    <p className="text-sm text-gray-500">Build Creator</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-[#0c0c0e] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-[#c5a059] transition-colors text-sm font-bold uppercase">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#0c0c0e] border-b border-[#3d3d43] sticky top-[73px] z-40">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto custom-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={clsx(
                    'px-6 py-4 font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 whitespace-nowrap',
                    activeTab === tab.id
                      ? 'border-[#c5a059] text-[#c5a059]'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  )}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-[#141417] border border-[#3d3d43] p-8">
              <h2 className="text-2xl font-serif text-[#c5a059] mb-4">Build Overview</h2>
              {build.fullDescription ? (
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed">{build.fullDescription}</p>
                </div>
              ) : (
                <p className="text-gray-300 leading-relaxed">{build.description}</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'skillTree' && (
          <div className="bg-[#0c0c0e] border border-[#3d3d43] p-12 text-center">
            <Target className="mx-auto mb-6 text-[#c5a059]" size={64} />
            <h3 className="text-2xl font-bold text-gradient-gold mb-4">
              Interactive Skill Tree
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Plan your character's passive skill tree with our advanced interactive planner. 
              Features smooth pan/zoom, automatic pathfinding, undo/redo, and real-time stat calculations.
            </p>
            <Link
              href={`/${locale}/skill-tree`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black font-bold uppercase tracking-wider hover:shadow-premium-xl transition-all"
            >
              <span>Open Skill Tree Planner</span>
              <ExternalLink size={20} />
            </Link>
            {build.buildCode && (
              <p className="mt-6 text-sm text-gray-500">
                Build code: <code className="bg-[#141417] px-3 py-1 text-[#c5a059]">{build.buildCode}</code>
              </p>
            )}
          </div>
        )}

        {activeTab === 'gems' && build.gemLinks && (
          <GemLinksViewer gemLinks={build.gemLinks} />
        )}

        {activeTab === 'crafting' && build.craftingGuide && (
          <CraftingGuide steps={build.craftingGuide} />
        )}

        {activeTab === 'gear' && build.gearPriority && (
          <GearPriorityChart priorities={build.gearPriority} />
        )}

        {activeTab === 'leveling' && build.levelingGuide && (
          <div className="space-y-6">
            {build.levelingGuide.map((step, index) => (
              <div key={index} className="bg-[#141417] border border-[#3d3d43] p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c5a059] text-black font-black text-xl flex items-center justify-center flex-shrink-0">
                    {step.level}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif text-[#c5a059] mb-2">Level {step.level}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'import' && (
          <BuildImportExport
            buildCode={build.buildCode}
            onImport={(code) => {
              console.log('Importing build:', code);
              // Handle import logic here
            }}
            onExport={() => build.buildCode || ''}
          />
        )}
      </div>
    </div>
  );
}
