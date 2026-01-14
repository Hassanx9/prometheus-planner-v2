'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Sword, Shield, Zap, Heart, Eye, Target,
  Settings, Save, Share2, Download, RotateCcw
} from 'lucide-react';

// Mock skill tree data - expanded to represent a more realistic PoE 2 skill tree
const skillTreeNodes = [
  // Starting area
  { id: 1, name: 'Melee Attack', x: 200, y: 200, type: 'active', allocated: true, description: 'Basic melee attack' },
  { id: 2, name: 'Projectile Attack', x: 300, y: 200, type: 'active', allocated: false, description: 'Basic ranged attack' },
  
  // Strength path
  { id: 3, name: 'Brutal Force', x: 150, y: 300, type: 'passive', allocated: true, description: '+20% Physical Damage' },
  { id: 4, name: 'Iron Grip', x: 100, y: 350, type: 'passive', allocated: false, description: '+15% Attack Speed' },
  { id: 5, name: 'Sunder', x: 200, y: 350, type: 'active', allocated: false, description: 'Area attack that deals physical damage' },
  
  // Intelligence path
  { id: 6, name: 'Arcane Surge', x: 350, y: 300, type: 'passive', allocated: false, description: '+25% Spell Damage' },
  { id: 7, name: 'Clarity', x: 400, y: 350, type: 'active', allocated: false, description: 'Aura that grants mana regeneration' },
  { id: 8, name: 'Frost Bolt', x: 300, y: 350, type: 'active', allocated: false, description: 'Projectile that deals cold damage' },
  
  // Dexterity path
  { id: 9, name: 'Precision', x: 250, y: 400, type: 'passive', allocated: false, description: '+20% Accuracy Rating' },
  { id: 10, name: 'Fleet Footed', x: 200, y: 450, type: 'passive', allocated: false, description: '+10% Movement Speed' },
  { id: 11, name: 'Explosive Arrow', x: 300, y: 450, type: 'active', allocated: false, description: 'Arrow that explodes on impact' },
  
  // Hybrid nodes
  { id: 12, name: 'Elemental Mastery', x: 250, y: 250, type: 'passive', allocated: false, description: '+15% Elemental Damage' },
  { id: 13, name: 'Combat Focus', x: 250, y: 150, type: 'passive', allocated: false, description: '+10% Critical Strike Chance' },
  
  // Advanced skills
  { id: 14, name: 'Chain Lightning', x: 400, y: 400, type: 'active', allocated: false, description: 'Lightning that chains between enemies' },
  { id: 15, name: 'Whirling Blades', x: 150, y: 450, type: 'active', allocated: false, description: 'Spinning attack that damages nearby enemies' },
  { id: 16, name: 'Bone Chill', x: 350, y: 450, type: 'passive', allocated: false, description: 'Enemies take extra damage when chilled' },
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
  const [selectedClass, setSelectedClass] = useState('Marauder');
  const [buildName, setBuildName] = useState('My Marauder Build');
  const [allocatedPoints, setAllocatedPoints] = useState(25);
  const [hoveredNode, setHoveredNode] = useState<typeof skillTreeNodes[0] | null>(null);

  const handleNodeClick = (node: typeof skillTreeNodes[0]) => {
    // Toggle allocation
    const updatedNodes = skillTreeNodes.map(n => 
      n.id === node.id ? { ...n, allocated: !n.allocated } : n
    );
    // Update allocated points count
    const allocatedCount = updatedNodes.filter(n => n.allocated).length;
    setAllocatedPoints(allocatedCount);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Main Skill Tree Area */}
      <div className="xl:col-span-3">
        <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-2xl p-8 shadow-premium-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Path of Exile 2 Skill Tree</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Skill Points Used:</span>
              <span className="text-lg font-bold text-[#c5a059]">{allocatedPoints}/100</span>
            </div>
          </div>

          {/* Skill Tree Canvas */}
          <div className="relative bg-gradient-to-br from-[#0f1116] to-[#1a1c2e] border border-[#3d3d43] rounded-xl h-[600px] overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" className="text-[#3d3d43]">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Skill Nodes */}
            {skillTreeNodes.map((node) => (
              <div
                key={node.id}
                className={`absolute w-16 h-16 rounded-full border-3 cursor-pointer transition-all hover:scale-110 ${
                  node.allocated
                    ? 'bg-[#c5a059] border-[#c5a059] shadow-lg shadow-[#c5a059]/50'
                    : node.type === 'active'
                    ? 'bg-[#1a1c2e] border-[#7ecce0] hover:border-[#c5a059]'
                    : 'bg-[#1a1c2e] border-[#3d3d43] hover:border-[#c5a059]'
                }`}
                style={{ left: node.x - 32, top: node.y - 32 }}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className="w-full h-full flex items-center justify-center text-white text-lg">
                  {node.type === 'active' ? '⚡' : '⬡'}
                </div>
              </div>
            ))}

            {/* Node Tooltip */}
            {hoveredNode && (
              <div className="absolute top-4 left-4 bg-[#1a1c2e] border border-[#3d3d43] rounded-lg p-4 shadow-premium-xl z-10 max-w-xs">
                <h4 className="text-white font-bold mb-2">{hoveredNode.name}</h4>
                <p className="text-gray-400 text-sm mb-2">{hoveredNode.description}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    hoveredNode.type === 'active' 
                      ? 'bg-[#7ecce0]/20 text-[#7ecce0]' 
                      : 'bg-[#c5a059]/20 text-[#c5a059]'
                  }`}>
                    {hoveredNode.type === 'active' ? 'Active Skill' : 'Passive'}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    hoveredNode.allocated 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {hoveredNode.allocated ? 'Allocated' : 'Available'}
                  </span>
                </div>
              </div>
            )}

            {/* Skill Tree Connections - More comprehensive */}
            <svg className="absolute inset-0 pointer-events-none">
              {/* Starting connections */}
              <line x1="200" y1="232" x2="200" y2="268" stroke="#3d3d43" strokeWidth="2" />
              <line x1="300" y1="232" x2="300" y2="268" stroke="#3d3d43" strokeWidth="2" />
              
              {/* Strength path */}
              <line x1="200" y1="300" x2="182" y2="332" stroke="#3d3d43" strokeWidth="2" />
              <line x1="182" y1="332" x2="132" y2="382" stroke="#3d3d43" strokeWidth="2" />
              <line x1="200" y1="300" x2="232" y2="332" stroke="#3d3d43" strokeWidth="2" />
              
              {/* Intelligence path */}
              <line x1="300" y1="300" x2="332" y2="332" stroke="#3d3d43" strokeWidth="2" />
              <line x1="332" y1="332" x2="382" y2="382" stroke="#3d3d43" strokeWidth="2" />
              <line x1="300" y1="300" x2="268" y2="332" stroke="#3d3d43" strokeWidth="2" />
              
              {/* Dexterity path */}
              <line x1="250" y1="400" x2="232" y2="432" stroke="#3d3d43" strokeWidth="2" />
              <line x1="250" y1="400" x2="268" y2="432" stroke="#3d3d43" strokeWidth="2" />
              
              {/* Hybrid connections */}
              <line x1="250" y1="200" x2="250" y2="218" stroke="#3d3d43" strokeWidth="2" />
              <line x1="250" y1="282" x2="250" y2="318" stroke="#3d3d43" strokeWidth="2" />
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
                <option>Marauder</option>
                <option>Duelist</option>
                <option>Ranger</option>
                <option>Shadow</option>
                <option>Witch</option>
                <option>Templar</option>
                <option>Scion</option>
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