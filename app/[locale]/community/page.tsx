import { Sparkles, TrendingUp, Users, Trophy, BookOpen, Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#0a0b0f] text-gray-200">
      {/* Hero Banner */}
      <section className="relative h-[400px] bg-gradient-to-br from-[#1a1c2e] via-[#0f1116] to-[#0a0b0f] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#c5a059]/10 via-transparent to-[#7ecce0]/10"></div>
        
        <div className="relative max-w-[1800px] mx-auto px-8 h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-[#c5a059]" size={32} />
            <h1 className="text-5xl font-black text-white tracking-tight">
              Path of Exile 2 Builds, Guides & More
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl">
            Prometheus is your #1 source for trusted Path of Exile 2 builds, guides and the latest meta rankings.
          </p>
        </div>
      </section>

      {/* Featured Card - Build Tracker */}
      <section className="max-w-[1800px] mx-auto px-8 -mt-16 mb-12">
        <div className="relative h-[280px] bg-gradient-to-r from-[#1e1f2e] to-[#252738] rounded-lg overflow-hidden border border-[#3d3d43] shadow-2xl group hover:border-[#c5a059] transition-all">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
          
          <div className="relative h-full flex items-center px-12">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-white mb-3">Build Tracker Updated</h2>
              <p className="text-gray-300 mb-6 max-w-xl">
                Tracking is now supported for all 0.4 League builds! Click here to learn more.
              </p>
              <button className="px-8 py-3 bg-[#c5a059] hover:bg-[#d4b16a] text-black font-black text-sm uppercase tracking-wider rounded transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Start Tracking
              </button>
            </div>
            <div className="hidden lg:block w-[400px] h-[200px] bg-[#2a2c3e] rounded-lg border border-[#3d3d43] p-4">
              <div className="text-xs text-gray-500 mb-2">Build Tracker Preview</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-[#1a1c2e]/50 p-2 rounded">
                  <div className="w-8 h-8 bg-[#c5a059] rounded"></div>
                  <div className="flex-1">
                    <div className="text-xs text-white font-bold">Mercenary</div>
                    <div className="text-[10px] text-gray-500">Crossbow Build</div>
                  </div>
                  <div className="text-xs text-green-400 font-bold">Tracking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-[1800px] mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Verified Builds */}
          <div className="bg-[#1a1c2e] rounded-lg border border-[#3d3d43] overflow-hidden hover:border-[#c5a059] transition-all group">
            <div className="h-[160px] bg-gradient-to-br from-[#2a2c3e] to-[#1a1c2e] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative h-full flex items-center justify-center">
                <Trophy className="text-[#c5a059]" size={48} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-black text-white mb-2">Verified Builds</h3>
              <p className="text-sm text-gray-400 mb-4">
                Check out builds made from our team of trusted partners and creators
              </p>
              <button className="w-full py-3 bg-[#c5a059] hover:bg-[#d4b16a] text-black font-black text-sm uppercase tracking-wider rounded transition-all">
                Go to Builds Page
              </button>
            </div>
          </div>

          {/* PoE 2 Guides */}
          <div className="bg-[#1a1c2e] rounded-lg border border-[#3d3d43] overflow-hidden hover:border-[#7ecce0] transition-all group">
            <div className="h-[160px] bg-gradient-to-br from-[#2a2c3e] to-[#1a1c2e] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative h-full flex items-center justify-center">
                <BookOpen className="text-[#7ecce0]" size={48} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-black text-white mb-2">PoE 2 Guides</h3>
              <p className="text-sm text-gray-400 mb-4">
                Discover all of our guide content to learn more about the game!
              </p>
              <button className="w-full py-3 bg-[#7ecce0] hover:bg-[#8dd6ea] text-black font-black text-sm uppercase tracking-wider rounded transition-all">
                Go to Guides Page
              </button>
            </div>
          </div>

          {/* Version 0.4 Content */}
          <div className="bg-[#1a1c2e] rounded-lg border border-[#3d3d43] overflow-hidden hover:border-[#9b59b6] transition-all group">
            <div className="h-[160px] bg-gradient-to-br from-[#2a2c3e] to-[#1a1c2e] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=800')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative h-full flex items-center justify-center">
                <Zap className="text-[#9b59b6]" size={48} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-black text-white mb-2">Version 0.4 Content Revealed!</h3>
              <p className="text-sm text-gray-400 mb-4">
                Check out all the new things coming to Update 0.3, The Third Edict!
              </p>
              <button className="w-full py-3 bg-[#9b59b6] hover:bg-[#a569c3] text-white font-black text-sm uppercase tracking-wider rounded transition-all">
                Reveal Summary Page
              </button>
            </div>
          </div>
        </div>

        {/* Build Lists - 3 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Builds */}
          <div className="bg-[#1a1c2e] rounded-lg border border-[#3d3d43] p-6">
            <h3 className="text-lg font-black text-[#c5a059] mb-4 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp size={18} />
              Featured Builds
            </h3>
            <div className="space-y-3">
              {[
                { name: '[0.4] Shaman BEAR Druid Build - L...', date: 'Updated on Jan 9, 2026' },
                { name: '0.4 Fulgrim Poisonburst Pathfinder', date: 'Updated on Jan 7, 2026' },
                { name: "[0.4] Woolie's WOLFMAN - Druid L...", date: 'Updated on Dec 29, 2025' },
              ].map((build, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-[#0f1116] hover:bg-[#14151c] rounded border border-[#2a2c3e] hover:border-[#c5a059] transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c5a059] to-[#d4b16a] rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate group-hover:text-[#c5a059] transition-colors">{build.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{build.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beginner Guides */}
          <div className="bg-[#1a1c2e] rounded-lg border border-[#3d3d43] p-6">
            <h3 className="text-lg font-black text-[#7ecce0] mb-4 uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={18} />
              Beginner Guides
            </h3>
            <div className="space-y-3">
              {[
                { name: 'How To: Campaign Martial Weapons', date: 'Updated on Dec 11, 2025' },
                { name: 'Campaign Layout Guide: Act 4', date: 'Updated on Dec 8, 2025' },
                { name: 'Campaign Layout Guide: Act 1', date: 'Updated on Dec 4, 2025' },
              ].map((guide, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-[#0f1116] hover:bg-[#14151c] rounded border border-[#2a2c3e] hover:border-[#7ecce0] transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7ecce0] to-[#8dd6ea] rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate group-hover:text-[#7ecce0] transition-colors">{guide.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{guide.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Classes */}
          <div className="bg-[#1a1c2e] rounded-lg border border-[#3d3d43] p-6">
            <h3 className="text-lg font-black text-[#9b59b6] mb-4 uppercase tracking-wider flex items-center gap-2">
              <Users size={18} />
              Latest Classes
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Disciple of Varunastra Ascendancy ...', date: 'Updated on Dec 12, 2025' },
                { name: 'Druid - Release Date, Overview, Ski...', date: 'Updated on Dec 12, 2025' },
                { name: 'Shaman Ascendancy Class: Tree &...', date: 'Updated on Dec 12, 2025' },
              ].map((classItem, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-[#0f1116] hover:bg-[#14151c] rounded border border-[#2a2c3e] hover:border-[#9b59b6] transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9b59b6] to-[#a569c3] rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate group-hover:text-[#9b59b6] transition-colors">{classItem.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{classItem.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
