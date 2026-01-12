"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Zap, Sword, AlertTriangle, 
  TrendingUp, RefreshCw, Layers, ChevronRight 
} from 'lucide-react';

const INITIAL_GEMS = [
  { id: 'g1', name: 'Oil Bomb', type: 'Active', spirit: 25, supports: ['Faster Casting', 'Increased Area'] },
  { id: 'g2', name: 'Whirling Blades', type: 'Active', spirit: 10, supports: ['Faster Attacks'] },
];

export default function PrometheusPlanner() {
  const [weaponSet, setWeaponSet] = useState<'A' | 'B'>('A');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeGems] = useState(INITIAL_GEMS);

  const stats = weaponSet === 'A' 
    ? { dps: 124500, type: 'Physical (Mace)', crit: '24.5%', speed: '1.85', spiritReserved: 35 }
    : { dps: 142000, type: 'Lightning (Spear)', crit: '18.2%', speed: '2.10', spiritReserved: 45 };

  const runAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-gray-200 font-sans selection:bg-[#c5a059] selection:text-black">
      
      <header className="border-b border-[#3d3d43] bg-[#0c0c0e] p-4 flex justify-between items-center sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-[#c5a059] rotate-45 flex items-center justify-center bg-[#141417] shadow-[0_0_15px_rgba(197,160,89,0.2)]">
            <Sword size={20} className="text-[#c5a059] -rotate-45" />
          </div>
          <div>
            <h1 className="text-[#c5a059] font-serif text-xl tracking-[0.2em] uppercase leading-none">Prometheus</h1>
            <p className="text-[9px] text-gray-500 tracking-widest uppercase mt-1">Strategic Build Planner // PoE2 Turnkey</p>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <div className="hidden md:flex flex-col items-end gap-1">
            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Spirit Reservation</p>
            <div className="flex items-center gap-3">
              <div className="w-40 h-1.5 bg-black rounded-full border border-[#3d3d43] overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-[#7ecce0] transition-all duration-700 shadow-[0_0_8px_#7ecce0]" 
                  style={{ width: `${stats.spiritReserved}%` }} 
                />
              </div>
              <span className="text-[#7ecce0] font-mono text-xs">{stats.spiritReserved}/100</span>
            </div>
          </div>
          <button className="bg-[#c5a059] text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg">
            Share Build
          </button>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto grid grid-cols-12 gap-4 p-4 h-[calc(100vh-85px)]">
        
        <aside className="col-span-12 lg:col-span-3 space-y-4 overflow-y-auto">
          <section className="bg-[#141417] border border-[#3d3d43] p-5 rounded-sm relative">
            <h3 className="text-[#c5a059] font-serif text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Zap size={12} /> Live Damage Profile
            </h3>
            <div className="text-center py-6 bg-black/60 rounded border border-white/5">
              <p className="text-5xl font-serif text-white font-bold tracking-tighter tabular-nums">
                {stats.dps.toLocaleString()}
              </p>
              <p className="text-[9px] text-[#c5a059] uppercase mt-2 font-bold tracking-widest">{stats.type} DPS</p>
            </div>
          </section>

          <section className="bg-[#141417] border border-[#c5a059]/30 p-5 shadow-lg rounded-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#c5a059] font-serif text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                <Sparkles size={12} /> Strategic Oracle
              </h3>
              <button onClick={runAI} className="text-gray-500 hover:text-[#c5a059]">
                <RefreshCw size={14} className={isAnalyzing ? "animate-spin text-[#c5a059]" : ""} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-red-950/20 border-l-2 border-red-500 flex gap-3">
                <AlertTriangle size={16} className="text-red-500 shrink-0" />
                <p className="text-[11px] leading-relaxed">
                  <span className="text-red-400 font-black uppercase tracking-tighter mr-1">Alert:</span> 
                  Build lacks Armour. Act 3 Bosses will "One-Shot" this character.
                </p>
              </div>
            </div>
          </section>
        </aside>

        <section className="col-span-12 lg:col-span-9 flex flex-col gap-4">
          <div className="flex-1 bg-[#0c0c0e] border border-[#3d3d43] relative overflow-hidden rounded-sm flex items-center justify-center">
             <div className="text-center bg-black/60 px-8 py-4 backdrop-blur-sm border border-white/5">
                <p className="text-[#c5a059] font-serif uppercase tracking-[0.6em] text-xl">Passive Tree Engine</p>
                <p className="text-[9px] text-gray-600 uppercase mt-2 tracking-widest">1,452 Nodes Loaded // 42 Allocated</p>
             </div>

            <div className="absolute bottom-6 left-6 flex items-center gap-1 bg-black/80 border border-[#3d3d43] p-1 rounded-sm shadow-2xl">
              <button 
                onClick={() => setWeaponSet('A')}
                className={`px-6 py-2 text-[10px] font-black tracking-widest transition-all ${weaponSet === 'A' ? 'bg-[#c5a059] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                LOADOUT A
              </button>
              <button 
                onClick={() => setWeaponSet('B')}
                className={`px-6 py-2 text-[10px] font-black tracking-widest transition-all ${weaponSet === 'B' ? 'bg-[#7ecce0] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                LOADOUT B
              </button>
            </div>
          </div>

          <div className="h-64 bg-[#141417] border border-[#3d3d43] p-5 rounded-sm overflow-hidden flex flex-col">
            <h3 className="text-[#c5a059] font-serif text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Layers size={12} /> Gem Tree Hierarchy
            </h3>
            
            <div className="flex-1 flex gap-6 overflow-x-auto pb-2">
              {activeGems.map((gem) => (
                <div key={gem.id} className="min-w-[200px] bg-black/40 border border-white/5 p-3 flex flex-col gap-3 relative group transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1a1a1c] border border-[#c5a059] rotate-45 flex items-center justify-center shrink-0">
                      <div className="-rotate-45 text-[#c5a059]"><Zap size={16}/></div>
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase text-white">{gem.name}</p>
                      <p className="text-[9px] text-[#7ecce0] font-mono">-{gem.spirit} Spirit</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 pl-6 relative">
                    <div className="absolute left-2 top-0 bottom-2 w-px bg-[#3d3d43]" />
                    {gem.supports.map((sup, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] text-gray-400 py-1 hover:text-white cursor-pointer">
                        <ChevronRight size={10} className="text-[#c5a059]" />
                        {sup}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 w-full h-6 bg-[#0c0c0e] border-t border-[#3d3d43] px-4 flex items-center justify-between text-[9px] font-mono uppercase text-gray-600">
        <span>Engine Online // PoE2 Build Ver: 0.1.4-EA</span>
        <span className="text-[#c5a059]">GHOST NODES ACTIVE: Following Leveling Guide ACT 2</span>
      </footer>
    </div>
  );
}
