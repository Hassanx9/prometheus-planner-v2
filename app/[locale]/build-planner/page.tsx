'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Sword,
  Shield,
  Zap,
  Heart,
  ChevronDown,
  ChevronUp,
  Save,
  Share2,
  Download,
  Flame,
  Snowflake,
  CloudLightning,
  Skull,
  User,
  Sparkles,
} from 'lucide-react';
import { CanvasSkillTree } from '@/components/builds/CanvasSkillTree';
import { StatTotals, CLASS_STARTS } from '@/lib/tree-data';

export default function BuildPlannerPage() {
  const locale = useLocale();

  const [selectedClass, setSelectedClass] = useState('Witch');
  const [buildName, setBuildName] = useState('Untitled Build');
  const [level, setLevel] = useState(100);
  const [allocatedPoints, setAllocatedPoints] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    attributes: true,
    defensive: true,
    offensive: false,
    damage: false,
  });
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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-[#030304]">
      {/* Compact Header */}
      <div className="bg-[#0a0a0e] border-b border-[#1a1a22]">
        <div className="max-w-[1920px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Class Selector */}
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 bg-[#0d0d12] border border-[#2a2a32] rounded text-sm text-white focus:border-[#c5a059] focus:outline-none cursor-pointer"
                data-testid="class-select"
              >
                {Object.keys(CLASS_STARTS).map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>

              {/* Level */}
              <div className="flex items-center gap-2 bg-[#0d0d12] border border-[#2a2a32] rounded px-3 py-1.5">
                <span className="text-xs text-gray-500">Level</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={level}
                  onChange={(e) => setLevel(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-12 bg-transparent text-white text-sm font-bold text-center focus:outline-none"
                  data-testid="level-input"
                />
              </div>

              {/* Points Display */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Points:</span>
                <span className="text-sm font-bold text-[#c5a059]" data-testid="points-used">
                  {allocatedPoints}
                </span>
                <span className="text-xs text-gray-600">/ {level}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Build Name */}
              <input
                type="text"
                value={buildName}
                onChange={(e) => setBuildName(e.target.value)}
                className="px-3 py-1.5 bg-[#0d0d12] border border-[#2a2a32] rounded text-sm text-white w-48 focus:border-[#c5a059] focus:outline-none"
                data-testid="build-name-input"
              />

              {/* Actions */}
              <button
                className="p-1.5 bg-[#0d0d12] border border-[#2a2a32] hover:border-[#c5a059] text-gray-400 hover:text-[#c5a059] rounded transition-all"
                title="Save Build"
                data-testid="save-build-btn"
              >
                <Save size={16} />
              </button>
              <button
                className="p-1.5 bg-[#0d0d12] border border-[#2a2a32] hover:border-[#c5a059] text-gray-400 hover:text-[#c5a059] rounded transition-all"
                title="Share Build"
                data-testid="share-build-btn"
              >
                <Share2 size={16} />
              </button>
              <button
                className="p-1.5 bg-[#0d0d12] border border-[#2a2a32] hover:border-[#c5a059] text-gray-400 hover:text-[#c5a059] rounded transition-all"
                title="Export Code"
                data-testid="export-build-btn"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-57px)]">
        {/* Skill Tree - Main Area */}
        <div className="flex-1">
          <CanvasSkillTree
            onStatsChange={handleStatsChange}
            onNodeCountChange={handleNodeCountChange}
            selectedClass={selectedClass}
            level={level}
          />
        </div>

        {/* Right Sidebar - Stats Panel */}
        <div className="w-72 bg-[#0a0a0e] border-l border-[#1a1a22] overflow-y-auto">
          {/* Character Info */}
          <div className="p-4 border-b border-[#1a1a22]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1a1a22] rounded-lg flex items-center justify-center">
                <User size={24} className="text-[#c5a059]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{selectedClass}</h3>
                <p className="text-xs text-gray-500">Level {level}</p>
              </div>
            </div>
          </div>

          {/* Collapse All / Expand All */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#1a1a22]">
            <button
              onClick={() => setExpandedSections({ attributes: false, defensive: false, offensive: false, damage: false })}
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              COLLAPSE ALL
            </button>
            <button
              onClick={() => setExpandedSections({ attributes: true, defensive: true, offensive: true, damage: true })}
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              EXPAND ALL
            </button>
          </div>

          {/* Attributes Section */}
          <div className="border-b border-[#1a1a22]">
            <button
              onClick={() => toggleSection('attributes')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Attributes</span>
              {expandedSections.attributes ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
            </button>
            {expandedSections.attributes && (
              <div className="px-4 pb-3 space-y-2">
                <StatRowCompact 
                  icon={<Heart size={12} className="text-red-500" />} 
                  label="Strength" 
                  value={stats.strength}
                  color="text-red-400"
                />
                <StatRowCompact 
                  icon={<Zap size={12} className="text-green-500" />} 
                  label="Dexterity" 
                  value={stats.dexterity}
                  color="text-green-400"
                />
                <StatRowCompact 
                  icon={<Sparkles size={12} className="text-blue-500" />} 
                  label="Intelligence" 
                  value={stats.intelligence}
                  color="text-blue-400"
                />
              </div>
            )}
          </div>

          {/* Defensive Section */}
          <div className="border-b border-[#1a1a22]">
            <button
              onClick={() => toggleSection('defensive')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Defensive</span>
              {expandedSections.defensive ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
            </button>
            {expandedSections.defensive && (
              <div className="px-4 pb-3 space-y-2">
                <StatRowCompact 
                  icon={<Heart size={12} className="text-red-400" />} 
                  label="Life" 
                  value={stats.life}
                  suffix="%"
                />
                <StatRowCompact 
                  icon={<Zap size={12} className="text-blue-400" />} 
                  label="Mana" 
                  value={stats.mana}
                  suffix="%"
                />
                <StatRowCompact 
                  icon={<Shield size={12} className="text-purple-400" />} 
                  label="Energy Shield" 
                  value={stats.energyShield}
                  suffix="%"
                />
                <StatRowCompact 
                  icon={<Shield size={12} className="text-orange-400" />} 
                  label="Armour" 
                  value={stats.armour}
                  suffix="%"
                />
                <StatRowCompact 
                  icon={<Shield size={12} className="text-green-400" />} 
                  label="Evasion" 
                  value={stats.evasion}
                  suffix="%"
                />
              </div>
            )}
          </div>

          {/* Offensive Section */}
          <div className="border-b border-[#1a1a22]">
            <button
              onClick={() => toggleSection('offensive')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Offensive</span>
              {expandedSections.offensive ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
            </button>
            {expandedSections.offensive && (
              <div className="px-4 pb-3 space-y-2">
                <StatRowCompact 
                  icon={<Sword size={12} className="text-yellow-400" />} 
                  label="Critical Chance" 
                  value={stats.criticalChance}
                  suffix="%"
                />
                <StatRowCompact 
                  icon={<Zap size={12} className="text-yellow-400" />} 
                  label="Attack Speed" 
                  value={stats.attackSpeed}
                  suffix="%"
                />
                <StatRowCompact 
                  icon={<Sparkles size={12} className="text-purple-400" />} 
                  label="Cast Speed" 
                  value={stats.castSpeed}
                  suffix="%"
                />
              </div>
            )}
          </div>

          {/* Damage Section */}
          <div className="border-b border-[#1a1a22]">
            <button
              onClick={() => toggleSection('damage')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Damage</span>
              {expandedSections.damage ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
            </button>
            {expandedSections.damage && (
              <div className="px-4 pb-3 space-y-2">
                <StatRowCompact 
                  icon={<Sword size={12} className="text-gray-400" />} 
                  label="Physical" 
                  value={stats.damagePhysical}
                  suffix="%"
                />
                <StatRowCompact 
                  icon={<Flame size={12} className="text-orange-500" />} 
                  label="Fire" 
                  value={stats.damageFire}
                  suffix="%"
                />
                <StatRowCompact 
                  icon={<Snowflake size={12} className="text-cyan-400" />} 
                  label="Cold" 
                  value={stats.damageCold}
                  suffix="%"
                />
                <StatRowCompact 
                  icon={<CloudLightning size={12} className="text-yellow-300" />} 
                  label="Lightning" 
                  value={stats.damageLightning}
                  suffix="%"
                />
                <StatRowCompact 
                  icon={<Skull size={12} className="text-purple-500" />} 
                  label="Chaos" 
                  value={stats.damageChaos}
                  suffix="%"
                />
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-4">
            <div className="text-center">
              <p className="text-[10px] text-gray-600 mb-2">
                Click nodes to allocate points
              </p>
              <p className="text-[10px] text-gray-600">
                Use path mode for smart pathing
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1a1a22]">
              <Link
                href={`/${locale}/ai`}
                className="flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black text-xs font-bold rounded hover:opacity-90 transition-all"
              >
                <Sparkles size={14} />
                AI Build Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact Stat Row Component
function StatRowCompact({
  icon,
  label,
  value,
  suffix = '',
  color = 'text-white',
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <span className={`text-xs font-medium ${color}`}>
        +{value}{suffix}
      </span>
    </div>
  );
}
