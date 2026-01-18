'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Sword,
  Shield,
  Zap,
  Heart,
  Eye,
  Target,
  Save,
  Share2,
  Download,
  RotateCcw,
  ChevronRight,
  Flame,
  Snowflake,
  CloudLightning,
  Skull,
  Move,
  Crosshair,
  Sparkles,
  Info,
} from 'lucide-react';
import { CanvasSkillTree } from '@/components/builds/CanvasSkillTree';
import { StatTotals, CLASS_STARTS } from '@/lib/tree-data';

export default function BuildPlannerPage() {
  const t = useTranslations('builds');
  const locale = useLocale();

  const [selectedClass, setSelectedClass] = useState('Witch');
  const [buildName, setBuildName] = useState('My Build');
  const [level, setLevel] = useState(100);
  const [allocatedPoints, setAllocatedPoints] = useState(0);
  const [stats, setStats] = useState<StatTotals>({
    life: 0,
    mana: 0,
    energyShield: 0,
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    criticalChance: 0,
    attackSpeed: 0,
    castSpeed: 0,
    movementSpeed: 0,
    damagePhysical: 0,
    damageFire: 0,
    damageCold: 0,
    damageLightning: 0,
    damageChaos: 0,
    armour: 0,
    evasion: 0,
    blockChance: 0,
  });

  const handleStatsChange = useCallback((newStats: StatTotals) => {
    setStats(newStats);
  }, []);

  const handleNodeCountChange = useCallback((count: number) => {
    setAllocatedPoints(count);
  }, []);

  // Level presets for "Breadcrumb" leveling feature
  const levelPresets = [20, 40, 60, 80, 100];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b0f] via-[#050506] to-[#0a0b0f]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1c2e] to-[#0f1116] border-b border-[#3d3d43]/50">
        <div className="max-w-[1900px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-4 py-2 rounded-full mb-4">
                <Sparkles size={16} className="text-[#c5a059]" />
                <span className="text-sm font-bold text-[#c5a059] uppercase tracking-wider">
                  Full Passive Tree Planner
                </span>
              </div>
              <h1 className="text-4xl font-black text-white mb-2" data-testid="page-title">
                Path of Exile 2 Build Planner
              </h1>
              <p className="text-gray-400">
                Interactive skill tree with {(2546).toLocaleString()} nodes • Smart pathfinding • Real-time stat calculation
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/${locale}/builds`}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Browse Builds
              </Link>
              <Link
                href={`/${locale}/ai`}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#c5a059]/30 transition-all"
              >
                <Sparkles size={18} />
                AI Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1900px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Skill Tree Area */}
          <div className="xl:col-span-3 space-y-6">
            {/* Level Slider - "Breadcrumb" Feature */}
            <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-xl p-6 shadow-premium">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target size={20} className="text-[#c5a059]" />
                  Character Level Progression
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Level:</span>
                  <span className="text-2xl font-black text-[#c5a059]" data-testid="current-level">
                    {level}
                  </span>
                </div>
              </div>

              {/* Level Presets */}
              <div className="flex items-center gap-4 mb-4">
                {levelPresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setLevel(preset)}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${
                      level === preset
                        ? 'bg-[#c5a059] text-black'
                        : 'bg-[#0f1116] border border-[#3d3d43] text-gray-400 hover:border-[#c5a059] hover:text-white'
                    }`}
                    data-testid={`level-preset-${preset}`}
                  >
                    Lv.{preset}
                  </button>
                ))}
              </div>

              {/* Level Slider */}
              <input
                type="range"
                min="1"
                max="100"
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value))}
                className="w-full h-3 bg-[#0f1116] rounded-full appearance-none cursor-pointer accent-[#c5a059]"
                data-testid="level-slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Level 1</span>
                <span>Level 50</span>
                <span>Level 100</span>
              </div>
            </div>

            {/* Canvas Skill Tree */}
            <CanvasSkillTree
              onStatsChange={handleStatsChange}
              onNodeCountChange={handleNodeCountChange}
              selectedClass={selectedClass}
              level={level}
            />

            {/* Tips */}
            <div className="bg-[#1a1c2e]/50 border border-[#3d3d43]/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-[#7ecce0] mt-0.5" />
                <div className="text-sm text-gray-400">
                  <p className="font-bold text-gray-300 mb-1">Tips:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Click nodes to allocate/deallocate skill points</li>
                    <li>Use <strong>Smart Path Mode</strong> (target icon) to auto-path between nodes</li>
                    <li>Search for specific stats using the search bar</li>
                    <li>Scroll to zoom, drag to pan the tree</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Build Info */}
            <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-xl p-6 shadow-premium">
              <h3 className="text-lg font-bold text-white mb-4">Build Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Build Name</label>
                  <input
                    type="text"
                    value={buildName}
                    onChange={(e) => setBuildName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0f1116] border border-[#3d3d43] rounded-lg text-white focus:border-[#c5a059] focus:outline-none"
                    data-testid="build-name-input"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0f1116] border border-[#3d3d43] rounded-lg text-white focus:border-[#c5a059] focus:outline-none"
                    data-testid="class-select"
                  >
                    {Object.keys(CLASS_STARTS).map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 border-t border-[#3d3d43]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Skill Points Used</span>
                    <span className="text-lg font-bold text-[#c5a059]" data-testid="points-used">
                      {allocatedPoints}/{level}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#0f1116] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#c5a059] to-[#d4b16a] transition-all"
                      style={{ width: `${Math.min(100, (allocatedPoints / level) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Character Stats */}
            <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-xl p-6 shadow-premium">
              <h3 className="text-lg font-bold text-white mb-4">Character Stats</h3>

              <div className="space-y-4">
                {/* Defensive */}
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Defensive</h4>
                  <div className="space-y-2">
                    <StatRow icon={<Heart size={14} className="text-red-500" />} label="Life" value={`+${stats.life}%`} />
                    <StatRow icon={<Zap size={14} className="text-blue-400" />} label="Mana" value={`+${stats.mana}%`} />
                    <StatRow icon={<Shield size={14} className="text-purple-400" />} label="Energy Shield" value={`+${stats.energyShield}%`} />
                    <StatRow icon={<Shield size={14} className="text-orange-400" />} label="Armour" value={`+${stats.armour}%`} />
                    <StatRow icon={<Eye size={14} className="text-green-400" />} label="Evasion" value={`+${stats.evasion}%`} />
                  </div>
                </div>

                {/* Attributes */}
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Attributes</h4>
                  <div className="space-y-2">
                    <StatRow icon={<Sword size={14} className="text-red-400" />} label="Strength" value={`+${stats.strength}`} />
                    <StatRow icon={<Move size={14} className="text-green-400" />} label="Dexterity" value={`+${stats.dexterity}`} />
                    <StatRow icon={<Sparkles size={14} className="text-blue-400" />} label="Intelligence" value={`+${stats.intelligence}`} />
                  </div>
                </div>

                {/* Offensive */}
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Offensive</h4>
                  <div className="space-y-2">
                    <StatRow icon={<Crosshair size={14} className="text-yellow-400" />} label="Critical Chance" value={`+${stats.criticalChance}%`} />
                    <StatRow icon={<Zap size={14} className="text-yellow-400" />} label="Attack Speed" value={`+${stats.attackSpeed}%`} />
                    <StatRow icon={<Sparkles size={14} className="text-purple-400" />} label="Cast Speed" value={`+${stats.castSpeed}%`} />
                  </div>
                </div>

                {/* Damage Types */}
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Damage</h4>
                  <div className="space-y-2">
                    <StatRow icon={<Sword size={14} className="text-gray-400" />} label="Physical" value={`+${stats.damagePhysical}%`} />
                    <StatRow icon={<Flame size={14} className="text-orange-500" />} label="Fire" value={`+${stats.damageFire}%`} />
                    <StatRow icon={<Snowflake size={14} className="text-cyan-400" />} label="Cold" value={`+${stats.damageCold}%`} />
                    <StatRow icon={<CloudLightning size={14} className="text-yellow-300" />} label="Lightning" value={`+${stats.damageLightning}%`} />
                    <StatRow icon={<Skull size={14} className="text-purple-500" />} label="Chaos" value={`+${stats.damageChaos}%`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-xl p-6 shadow-premium">
              <h3 className="text-lg font-bold text-white mb-4">Actions</h3>

              <div className="space-y-3">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c5a059]/30 transition-all"
                  data-testid="save-build-btn"
                >
                  <Save size={18} />
                  Save Build
                </button>

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1116] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-[#c5a059] rounded-lg transition-all"
                  data-testid="share-build-btn"
                >
                  <Share2 size={18} />
                  Share Build
                </button>

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 bg-[#0f1116] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-[#c5a059] rounded-lg transition-all"
                  data-testid="export-build-btn"
                >
                  <Download size={18} />
                  Export Code
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#1a1c2e] border border-[#3d3d43] rounded-xl p-6 shadow-premium">
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href={`/${locale}/database`}
                  className="flex items-center justify-between p-3 bg-[#0f1116] rounded-lg hover:bg-[#1a1c2e] transition-all group"
                >
                  <span className="text-gray-400 group-hover:text-white">Item Database</span>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-[#c5a059]" />
                </Link>
                <Link
                  href={`/${locale}/builds`}
                  className="flex items-center justify-between p-3 bg-[#0f1116] rounded-lg hover:bg-[#1a1c2e] transition-all group"
                >
                  <span className="text-gray-400 group-hover:text-white">Community Builds</span>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-[#c5a059]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Row Component
function StatRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}
