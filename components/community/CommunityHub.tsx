'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Users, TrendingUp, Star, Clock, Plus } from 'lucide-react';

export function CommunityHub() {
  const t = useTranslations('community');
  const [activeTab, setActiveTab] = useState<'trending' | 'topRated' | 'newest'>('trending');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#3d3d43]">
        <button
          onClick={() => setActiveTab('trending')}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'trending'
              ? 'border-[#c5a059] text-[#c5a059]'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>{t('trending')}</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('topRated')}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'topRated'
              ? 'border-[#c5a059] text-[#c5a059]'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Star size={16} />
            <span>{t('topRated')}</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('newest')}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'newest'
              ? 'border-[#c5a059] text-[#c5a059]'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{t('newest')}</span>
          </div>
        </button>
      </div>

      {/* Create Build Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors flex items-center gap-2">
          <Plus size={20} />
          {t('createBuild')}
        </button>
      </div>

      {/* Community Content */}
      <div className="bg-[#141417] border border-[#3d3d43] p-8 text-center">
        <Users size={48} className="text-[#c5a059] mx-auto mb-4" />
        <h3 className="text-xl font-serif text-[#c5a059] mb-2">Community Hub</h3>
        <p className="text-gray-400">
          Share your builds, get feedback, and discover amazing builds from the community.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Community features coming soon...
        </p>
      </div>
    </div>
  );
}
