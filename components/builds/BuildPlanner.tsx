'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Sword, Shield, Zap, Heart, Eye, Target,
  Settings, Save, Share2, Download, RotateCcw
} from 'lucide-react';

// Mock skill tree data
const skillTreeNodes = [
  { id: 1, name: 'Lightning Strike', x: 100, y: 100, type: 'active', allocated: true },
  { id: 2, name: 'Chain Lightning', x: 200, y: 150, type: 'active', allocated: false },
  { id: 3, name: 'Lightning Mastery', x: 150, y: 200, type: 'passive', allocated: true },
  { id: 4, name: 'Storm Call', x: 300, y: 100, type: 'active', allocated: false },
  { id: 5, name: 'Elemental Focus', x: 250, y: 250, type: 'passive', allocated: true },
];

const gearSlots = [
  { name: 'Helmet', icon: '🪖' },
  { name: 'Amulet', icon: '📿' },
  { name: 'Chest', icon: '🦺' },
  { name: 'Gloves', icon: '🧤' },
  { name: 'Ring 1', icon: '💍' },
  { name: 'Ring 2', icon: '💍' },
  { name: 'Belt', icon: '🪢' },
  { name: 'Boots', icon: '🥾' },
  { name: 'Weapon 1', icon: '⚔️' },
  { name: 'Weapon 2', icon: '🗡️' },
  { name: 'Off-hand', icon: '🛡️' },
];

export function BuildPlanner() {
  const t = useTranslations('builds');
  const [selectedClass, setSelectedClass] = useState('Mercenary');
  const [buildName, setBuildName] = useState('My Lightning Build');
  const [allocatedPoints, setAllocatedPoints] = useState(25);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Main Skill Tree Area */}
      <div className="xl:col-span-3">
        <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-2xl p-8 shadow-premium-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Skill Tree</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Points Allocated:</span>
              <span className="text-lg font-bold text-[#c5a059]">{allocatedPoints}</span>
            </div>
          </div>

          {/* Skill Tree Canvas */}
          <div className="relative bg-gradient-to-br from-[#0f1116] to-[#1a1c2e] border border-[#3d3d43] rounded-xl h-[600px] overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" className="text-[#3d3d43]">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Skill Nodes */}
            {skillTreeNodes.map((node) => (
              <div
                key={node.id}
                className={`absolute w-12 h-12 rounded-full border-2 cursor-pointer transition-all hover:scale-110 ${
                  node.allocated
                    ? 'bg-[#c5a059] border-[#c5a059] shadow-lg shadow-[#c5a059]/50'
                    : 'bg-[#1a1c2e] border-[#3d3d43] hover:border-[#c5a059]'
                }`}
                style={{ left: node.x, top: node.y }}
                title={node.name}
              >
                <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                  {node.type === 'active' ? '⚡' : '⬡'}
                </div>
              </div>
            ))}

            {/* Connections */}
            <svg className="absolute inset-0 pointer-events-none">
              <line x1="112" y1="112" x2="212" y2="162" stroke="#3d3d43" strokeWidth="2" />
              <line x1="162" y1="212" x2="112" y2="112" stroke="#3d3d43" strokeWidth="2" />
              <line x1="262" y1="262" x2="162" y2="212" stroke="#3d3d43" strokeWidth="2" />
            </svg>
          </div>

          {/* Skill Tree Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-[#c5a059]/10 hover:bg-[#c5a059]/20 border border-[#c5a059]/30 hover:border-[#c5a059] text-[#c5a059] rounded-lg transition-all">
                Reset Tree
              </button>
              <button className="px-4 py-2 bg-[#c5a059]/10 hover:bg-[#c5a059]/20 border border-[#c5a059]/30 hover:border-[#c5a059] text-[#c5a059] rounded-lg transition-all">
                Import PoB
              </button>
            </div>
            <div className="text-sm text-gray-400">
              Click nodes to allocate points
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-8">
        {/* Build Info */}
        <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-2xl p-6 shadow-premium-xl">
          <h3 className="text-lg font-bold text-white mb-4">Build Information</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Build Name</label>
              <input
                type="text"
                value={buildName}
                onChange={(e) => setBuildName(e.target.value)}
                className="w-full px-3 py-2 bg-[#0f1116] border border-[#3d3d43] rounded-lg text-white focus:border-[#c5a059] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 bg-[#0f1116] border border-[#3d3d43] rounded-lg text-white focus:border-[#c5a059] focus:outline-none"
              >
                <option>Mercenary</option>
                <option>Sorcerer</option>
                <option>Warrior</option>
                <option>Ranger</option>
                <option>Monk</option>
                <option>Witch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gear Slots */}
        <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-2xl p-6 shadow-premium-xl">
          <h3 className="text-lg font-bold text-white mb-4">Equipment</h3>

          <div className="grid grid-cols-2 gap-3">
            {gearSlots.map((slot) => (
              <div
                key={slot.name}
                className="aspect-square bg-[#0f1116] border border-[#3d3d43] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#c5a059] transition-all group"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                  {slot.icon}
                </div>
                <span className="text-xs text-gray-400 text-center">{slot.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Preview */}
        <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-2xl p-6 shadow-premium-xl">
          <h3 className="text-lg font-bold text-white mb-4">Character Stats</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-red-500" />
                <span className="text-sm text-gray-400">Life</span>
              </div>
              <span className="text-white font-medium">1,247</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-blue-500" />
                <span className="text-sm text-gray-400">Energy Shield</span>
              </div>
              <span className="text-white font-medium">892</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-yellow-500" />
                <span className="text-sm text-gray-400">Lightning Damage</span>
              </div>
              <span className="text-white font-medium">234-456</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-green-500" />
                <span className="text-sm text-gray-400">Accuracy</span>
              </div>
              <span className="text-white font-medium">1,892</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-2xl p-6 shadow-premium-xl">
          <h3 className="text-lg font-bold text-white mb-4">Actions</h3>

          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c5a059]/30 transition-all">
              <Save size={18} />
              Save Build
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1116] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-[#c5a059] rounded-lg transition-all">
              <Share2 size={18} />
              Share Build
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1116] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-[#c5a059] rounded-lg transition-all">
              <Download size={18} />
              Export PoB
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}