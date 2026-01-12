'use client';

import { Trophy, Medal, TrendingUp } from 'lucide-react';

const mockLeaderboard = [
  { rank: 1, player: 'ProGamer123', level: 100, class: 'Mercenary', build: 'Lightning Spear', dps: 2500000, survivability: 95 },
  { rank: 2, player: 'BuildMaster', level: 100, class: 'Witch', build: 'Frost Build', dps: 2300000, survivability: 98 },
  { rank: 3, player: 'D4Expert', level: 100, class: 'Barbarian', build: 'Whirlwind', dps: 2200000, survivability: 92 },
];

export function Leaderboards() {
  return (
    <div className="space-y-6">
      <div className="bg-[#141417] border border-[#3d3d43] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0c0c0e] border-b border-[#3d3d43]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#c5a059]">Rank</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#c5a059]">Player</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#c5a059]">Level</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#c5a059]">Class</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#c5a059]">Build</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#c5a059]">DPS</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#c5a059]">Survivability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3d3d43]">
              {mockLeaderboard.map((entry) => (
                <tr key={entry.rank} className="hover:bg-[#0c0c0e] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {entry.rank === 1 && <Trophy className="text-yellow-500" size={20} />}
                      {entry.rank === 2 && <Medal className="text-gray-400" size={20} />}
                      {entry.rank === 3 && <Medal className="text-orange-600" size={20} />}
                      <span className="font-bold text-white">#{entry.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{entry.player}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{entry.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{entry.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#c5a059]">{entry.build}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{entry.dps.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-[#0c0c0e] border border-[#3d3d43] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#c5a059] transition-all"
                          style={{ width: `${entry.survivability}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm">{entry.survivability}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
