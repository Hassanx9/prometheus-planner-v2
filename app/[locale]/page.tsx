"use client";

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Sparkles, Zap, Sword, AlertTriangle, 
  TrendingUp, RefreshCw, Layers, ChevronRight,
  Target, ShieldAlert, Hexagon
} from 'lucide-react';

// --- DATA: THE MERCENARY STARTING CLUSTER ---
const PASSIVE_NODES = [
  { id: 'start', x: 400, y: 300, label: 'MERCENARY ORIGIN', type: 'start', connections: ['life1', 'dmg1', 'acc1'] },
  { id: 'life1', x: 400, y: 220, label: '+20 MAX LIFE', type: 'small', connections: ['notable1'] },
  { id: 'dmg1', x: 480, y: 300, label: '10% PHYS DAMAGE', type: 'small', connections: ['notable1'] },
  { id: 'acc1', x: 320, y: 300, label: 'ACCURACY RATING', type: 'small', connections: [] },
  { id: 'notable1', x: 480, y: 220, label: 'LEAD SPITTER', type: 'notable', connections: ['end1'] },
  { id: 'end1', x: 550, y: 150, label: 'CROSSBOW MASTERY', type: 'notable', connections: [] },
];

export default function HomePage() {
  const t = useTranslations('ai');
  const tCommon = useTranslations('common');
  
  const [weaponSet, setWeaponSet] = useState<'A' | 'B'>('A');
  const [allocated, setAllocated] = useState<string[]>(['start']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState({
    msg: t('welcome'),
    type: 'neutral' as 'neutral' | 'alert' | 'trend'
  });

  // --- INTERACTIVE LOGIC ---
  const toggleNode = (id: string) => {
    setAllocated(prev => {
      const isAllocated = prev.includes(id);
      if (id === 'start') return prev; // Cannot de-allocate start
      return isAllocated ? prev.filter(i => i !== id) : [...prev, id];
    });
  };

  const runAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (!allocated.includes('notable1')) {
        setAiInsight({ msg: "CRITICAL: You are missing 'Lead Spitter'. Crossbow damage will fall off in Act 2.", type: 'alert' });
      } else if (weaponSet === 'A') {
        setAiInsight({ msg: "Mace Specialization detected. Focus on 'Crushing Blows' next for stun synergy.", type: 'trend' });
      } else {
        setAiInsight({ msg: "Spear Loadout active. AI suggests pathing to 'Lightning Reflexes' for evasion.", type: 'trend' });
      }
    }, 800);
  };

  // --- DYNAMIC CALCULATIONS ---
  const stats = useMemo(() => {
    const base = weaponSet === 'A' ? 124500 : 142000;
    const bonus = allocated.length * 2500;
    return {
      dps: base + bonus,
      type: weaponSet === 'A' ? 'Physical' : 'Lightning',
      spirit: weaponSet === 'A' ? 35 : 48,
      nodes: allocated.length
    };
  }, [weaponSet, allocated]);

  return (
    <div className="min-h-screen bg-[#050506] text-gray-200 font-sans selection:bg-[#c5a059]">
      
      <main className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 pb-8">
        
        {/* SIDEBAR: ANALYTICS */}
        <aside className="lg:col-span-3 space-y-4">
          
          <section className="bg-[#141417] border border-[#3d3d43] p-5 rounded-sm relative bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
            <h3 className="text-[#c5a059] font-serif text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Zap size={12} /> {t('liveDamageEngine')}
            </h3>
            <div className="text-center py-6 bg-black/60 rounded border border-white/5 shadow-inner">
              <p className="text-5xl font-serif text-white font-bold tracking-tighter tabular-nums transition-all">
                {stats.dps.toLocaleString()}
              </p>
              <p className="text-[9px] text-[#c5a059] uppercase mt-2 font-bold tracking-widest">{stats.type} DPS</p>
            </div>
          </section>

          <section className="bg-[#141417] border border-[#c5a059]/30 p-5 shadow-lg rounded-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#c5a059] font-serif text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                <Sparkles size={12} /> {t('strategicOracle')}
              </h3>
              <button onClick={runAI} className="text-gray-500 hover:text-[#c5a059]">
                <RefreshCw size={14} className={isAnalyzing ? "animate-spin text-[#c5a059]" : ""} />
              </button>
            </div>
            
            <div className={`p-3 border-l-2 text-[11px] leading-relaxed transition-all duration-500 ${
              aiInsight.type === 'alert' ? 'bg-red-950/20 border-red-500' : 'bg-[#c5a059]/10 border-[#c5a059]'
            }`}>
              {aiInsight.msg}
            </div>
          </section>
        </aside>

        {/* CENTER: INTERACTIVE TREE */}
        <section className="lg:col-span-9 flex flex-col gap-4">
          
          <div className="min-h-[600px] bg-[#0c0c0e] border border-[#3d3d43] relative overflow-hidden rounded-sm shadow-inner group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none" />
            
            {/* SVG CONNECTION LINES */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
              {PASSIVE_NODES.map(node => 
                node.connections.map(connId => {
                  const target = PASSIVE_NODES.find(n => n.id === connId);
                  if (!target) return null;
                  const isLinkActive = allocated.includes(node.id) && allocated.includes(target.id);
                  return (
                    <line 
                      key={`${node.id}-${connId}`}
                      x1={node.x} y1={node.y} x2={target.x} y2={target.y}
                      stroke={isLinkActive ? "#c5a059" : "#1e1e22"}
                      strokeWidth={isLinkActive ? 3 : 1}
                      className="transition-all duration-500"
                    />
                  );
                })
              )}
            </svg>

            {/* INTERACTIVE NODES */}
            {PASSIVE_NODES.map(node => (
              <div 
                key={node.id}
                onClick={() => toggleNode(node.id)}
                className={`absolute w-4 h-4 rounded-full border cursor-pointer transition-all transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 z-10
                  ${allocated.includes(node.id) ? 'bg-[#c5a059] border-white shadow-[0_0_15px_#c5a059]' : 'bg-[#141417] border-[#3d3d43]'}
                  ${node.type === 'start' ? 'w-8 h-8 ring-4 ring-[#c5a059]/20' : ''}
                  ${node.type === 'notable' ? 'scale-125' : ''}
                `}
                style={{ left: node.x, top: node.y }}
              >
                <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] whitespace-nowrap opacity-40 group-hover:opacity-100 uppercase tracking-tighter text-white font-bold bg-black/60 px-1">
                  {node.label}
                </div>
              </div>
            ))}

            <div className="absolute top-6 right-6 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-serif bg-black/40 p-2">
              Nodes Allocated: {stats.nodes} / 121
            </div>

            <div className="absolute bottom-6 left-6 flex bg-black/80 border border-[#3d3d43] p-1 backdrop-blur-md shadow-2xl">
              <button 
                onClick={() => setWeaponSet('A')}
                className={`px-6 py-2 text-[10px] font-black tracking-widest transition-all ${weaponSet === 'A' ? 'bg-[#c5a059] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                LOADOUT A (Mace)
              </button>
              <button 
                onClick={() => setWeaponSet('B')}
                className={`px-6 py-2 text-[10px] font-black tracking-widest transition-all ${weaponSet === 'B' ? 'bg-[#7ecce0] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                LOADOUT B (Spear)
              </button>
            </div>
          </div>

          {/* LOWER PANEL: GEM CLUSTERS */}
          <div className="h-40 bg-[#141417] border border-[#3d3d43] p-5 rounded-sm overflow-hidden">
            <h3 className="text-[#c5a059] font-serif text-[10px] uppercase mb-4 flex items-center gap-2">
              <Layers size={12} /> Active Gem Clusters
            </h3>
            <div className="flex gap-4">
              <div className="px-4 py-3 bg-black/40 border-l-2 border-[#c5a059] flex items-center gap-3">
                 <Hexagon size={16} className="text-[#c5a059] fill-[#c5a059]/20" />
                 <div>
                   <p className="text-[11px] font-black uppercase text-white">Oil Bomb</p>
                   <p className="text-[9px] text-gray-500 italic">25 Spirit Reserved</p>
                 </div>
              </div>
              <div className="px-4 py-3 bg-black/40 border-l-2 border-[#7ecce0] flex items-center gap-3">
                 <Zap size={16} className="text-[#7ecce0]" />
                 <div>
                   <p className="text-[11px] font-black uppercase text-white">Whirling Blades</p>
                   <p className="text-[9px] text-gray-500 italic">10 Spirit Reserved</p>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 w-full h-6 bg-[#0c0c0e] border-t border-[#3d3d43] px-4 flex items-center justify-between text-[9px] font-mono uppercase text-gray-500">
        <span className="flex items-center gap-2 tracking-widest"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> Engine Online // PoE2-EA Build Ver: 0.1.4</span>
        <span className="text-[#c5a059] animate-pulse font-bold">GHOST NODES ACTIVE: Following Leveling Guide ACT 2</span>
      </footer>
    </div>
  );
}
