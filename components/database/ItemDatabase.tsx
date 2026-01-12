'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Filter, Package } from 'lucide-react';

// Mock data
const mockItems = [
  {
    id: 1,
    name: 'Shavronne\'s Wrappings',
    type: 'Unique',
    game: 'PoE 2',
    level: 68,
    description: 'Energy Shield based unique chest',
  },
  {
    id: 2,
    name: 'Headhunter',
    type: 'Unique',
    game: 'PoE 2',
    level: 40,
    description: 'Legendary belt that steals mods from rare monsters',
  },
  {
    id: 3,
    name: 'Harlequin Crest',
    type: 'Unique',
    game: 'Diablo IV',
    level: 80,
    description: 'Unique helmet with powerful defensive stats',
  },
];

export function ItemDatabase() {
  const t = useTranslations('database');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredItems = mockItems.filter((item) => {
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedType && item.type !== selectedType) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder={t('searchItems')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#141417] border border-[#3d3d43] text-white placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {['Unique', 'Legendary', 'Rare', 'Currency'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={`px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                selectedType === type
                  ? 'bg-[#c5a059] text-black'
                  : 'bg-[#141417] border border-[#3d3d43] text-gray-400 hover:text-[#c5a059]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#141417] border border-[#3d3d43] p-6 hover:border-[#c5a059] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={16} className="text-[#c5a059]" />
                  <span className="text-xs text-gray-500 uppercase">{item.type}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{item.game}</span>
                </div>
                <h3 className="text-xl font-serif text-[#c5a059] mb-2">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                <div className="text-xs text-gray-500">
                  <span>Level Requirement: {item.level}</span>
                </div>
              </div>
            </div>
            <button className="w-full py-2 bg-[#c5a059] text-black font-bold uppercase tracking-wider text-sm hover:bg-[#d4b069] transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
