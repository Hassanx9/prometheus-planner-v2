"use client";

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Zap, Sword, AlertTriangle, 
  TrendingUp, RefreshCw, Layers, ChevronRight,
  Target, ShieldAlert
} from 'lucide-react';

// --- INITIAL DATA: MERCENARY STARTING CLUSTER ---
const MOCK_NODES = [
  { id: 'start', x: 250, y: 250, label: 'Mercenary Origin', type: 'start' },
  { id: 'life1', x: 250, y: 180, label: '+20 Max Life', type: 'small' },
  { id: 'dmg1', x: 320, y: 250, label: '10% Phys Damage', type: 'small' },
  { id: 'acc1', x: 180, y: 250, label: 'Accuracy Rating', type: 'small' },
  { id: 'notable1', x: 320, y: 180, label: 'Lead Spitter', type: 'notable' },
];

export default function PrometheusPlanner() {
  const [weaponSet, setWeaponSet] = useState<'A' | 'B'>('A');
  const [allocated, setAllocated] = useState<string[]>(['start']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeSetA] = useState(['Oil Bomb', 'Faster Casting']);
  
  // --- DYNAMIC AI ORACLE LOGIC ---
  const [aiInsight, setAiInsight] = useState({
    msg: "System standing by. Allocate nodes to begin analysis.",
    type: 'neutral'
  });

  const runAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (allocated.length < 3) {
        setAiInsight({ msg: "Early build detected. Focus on 'Lead Spitter' for Crossbow scaling.", type: 'hint' });
      } else if (weaponSet === 'A') {
        setAiInsight({ msg: "Mace setup identified. Warning: Stun duration is 15% below threshold for Act 3 Bosses.", type: 'alert' });
      } else {
        setAiInsight({ msg: "Spear setup optimized for Lightning. Meta Suggestion: Socket 'Shock Proliferation'.", type: 'trend' });
      }
    }, 1000);
  };

  const toggleNode = (id: string) => {
    setAllocated(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Stats derived from active loadout
  const stats = useMemo(() => (
    weaponSet === 'A' 
      ? { dps: 124500 + (allocated.length * 1200), type: 'Physical', spirit: 35 }
      : { dps: 142000 + (allocated.length * 800), type: 'Lightning', spirit: 45 }
  ), [weaponSet, allocated]);

  return (
    <div className="min-h-screen bg-[#050506] text-gray-200 font-sans selection:bg-[#c5a059]">
      
      {/* HEADER */}
      <header className="border-b border-[#3d3d43] bg-[#0c0c0e] p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-[#c5a059] rotate-45 flex items-center justify-center bg-[#141417]">
            <Sword size={20} className="text-[#c5a059] -rotate-45" />
          </div>
          <h1 className="text-[#c5a059] font-serif text-xl tracking-[0.2em] uppercase">Prometheus</h1>
        </div>

        <div className="flex gap-8 items-center">
          <div className="hidden md:flex flex-col items-end gap-1">
            <p className="text-[9px] text-gray-500 uppercase font-black">Spirit Reserved</p>
            <div className="flex items-center gap-3">
              <div className="w-40 h-1.5 bg-black rounded-full border border-[#3d3d43] overflow-hidden">
                <div className="h-full bg-[#7ecce0] transition-all duration-700" style={{ width: `${stats.spirit}%` }} />
              </div>
              <span className="text-[#7ecce0] font-mono text-xs">{stats.spirit}/100</span>
            </div>
          </div>
          <button className="bg-[#c5a059] text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest shadow-lg">SHARE BUILD</button>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto grid grid-cols-12 gap-4 p-4 h-[calc(100vh-85px)]">
        
        {/* SIDEBAR */}
        <aside className="col-span-3 space-y-4">
          <section className="bg-[#141417] border border-[#3d3d43] p-5">
            <h3 className="text-[#c5a059] font-serif text-[10px] uppercase mb-4 flex items-center gap-2">
              <Zap size={12} /> Live Damage Profile
            </h3>
            <div className="text-center py-6 bg-black/60 rounded border border-white/5">
              <p className="text-5xl font-serif text-white font-bold tabular-nums">{stats.dps.toLocaleString()}</p>
              <p className="text-[9px] text-[#c5a059] mt-2 font-bold tracking-widest">{stats.type} DPS</p>
            </div>
          </section>

          <section className="bg-[#141417] border border-[#c5a059]/30 p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#c5a059] font-serif text-[10px] uppercase flex items-center gap-2">
                <Sparkles size={12} /> Strategic Oracle
              </h3>
              <button onClick={runAI} className="text-gray-500 hover:text-[#c5a059]"><RefreshCw size={14} className={isAnalyzing ? "animate-spin" : ""} /></button>
            </div>
            
            <div className={`p-3 border-l-2 text-[11px] leading-relaxed transition-all ${
              aiInsight.type === 'alert' ? 'bg-red-950/20 border-red-500' : 'bg-[#c5a059]/10 border-[#c5a059]'
            }`}>
              {aiInsight.msg}
            </div>
          </section>
        </aside>

        {/* PASSIVE TREE ENGINE (INTERACTIVE) */}
        <section className="col-span-9 flex flex-col gap-4">
          <div className="flex-1 bg-[#0c0c0e] border border-[#3d3d43] relative overflow-hidden rounded-sm group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none" />
            
            {/* SVG CONNECTIONS */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {MOCK_NODES.map(node => (
                node.id !== 'start' && (
                  <line 
                    key={node.id} 
                    x1={250} y1={250} x2={node.x} y2={node.y} 
                    stroke={allocated.includes(node.id) ? "#c5a059" : "#1e1e22"} 
                    strokeWidth={allocated.includes(node.id) ? 2 : 1}
                  />
                )
              ))}
            </svg>

            {/* NODES */}
            {MOCK_NODES.map(node => (
              <div 
                key={node.id}
                onClick={() => toggleNode(node.id)}
                className={`absolute w-4 h-4 rounded-full border cursor-pointer transition-all transform -translate-x-1/2 -translate-y-1/2 hover:scale-125
                  ${allocated.includes(node.id) ? 'bg-[#c5a059] border-white shadow-[0_0_15px_#c5a059]' : 'bg-[#141417] border-[#3d3d43]'}
                `}
                style={{ left: node.x, top: node.y }}
              >
                <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 uppercase tracking-tighter text-gray-500">
                  {node.label}
                </div>
              </div>
            ))}

            <div className="absolute top-6 right-6 text-[10px] text-gray-600 uppercase tracking-[0.2em] font-serif">
              Nodes Allocated: {allocated.length} / 121
            </div>

            <div className="absolute bottom-6 left-6 flex bg-black/80 border border-[#3d3d43] p-1 backdrop-blur-md">
              <button onClick={() => setWeaponSet('A')} className={`px-6 py-2 text-[10px] font-black ${weaponSet === 'A' ? 'bg-[#c5a059] text-black' : 'text-gray-500'}`}>LOADOUT A</button>
              <button onClick={() => setWeaponSet('B')} className={`px-6 py-2 text-[10px] font-black ${weaponSet === 'B' ? 'bg-[#7ecce0] text-black' : 'text-gray-500'}`}>LOADOUT B</button>
            </div>
          </div>

          {/* GEM TREE */}
          <div className="h-48 bg-[#141417] border border-[#3d3d43] p-5">
            <h3 className="text-[#c5a059] font-serif text-[10px] uppercase mb-4 flex items-center gap-2"><Layers size={12} /> Active Gem Clusters</h3>
            <div className="flex gap-4">
              {activeSetA.map((g, i) => (
                <div key={i} className="px-4 py-2 bg-black/40 border border-white/5 text-[11px] font-bold uppercase tracking-widest flex items-center gap-3">
                   <div className="w-2 h-2 bg-poe-gold rotate-45" /> {g}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
