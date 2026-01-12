'use client';

import { GearPriority } from '@/types';
import { TrendingUp } from 'lucide-react';

interface GearPriorityChartProps {
  priorities: GearPriority[];
}

export function GearPriorityChart({ priorities }: GearPriorityChartProps) {
  const sortedPriorities = [...priorities].sort((a, b) => b.priority - a.priority);

  return (
    <div className="space-y-6">
      <div className="bg-[#141417] border border-[#3d3d43] p-6">
        <h2 className="text-2xl font-serif text-[#c5a059] mb-6 flex items-center gap-2">
          <TrendingUp size={24} />
          Gear Priority & Stat Focus
        </h2>

        <div className="space-y-6">
          {sortedPriorities.map((item, index) => (
            <div
              key={index}
              className="bg-[#0c0c0e] border border-[#3d3d43] p-6 hover:border-[#c5a059] transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-serif text-[#c5a059]">{item.slot}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Priority:</span>
                  <span className="text-2xl font-black text-[#c5a059]">{item.priority}/10</span>
                </div>
              </div>

              {/* Priority Bar */}
              <div className="mb-4">
                <div className="w-full h-3 bg-[#141417] border border-[#3d3d43] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#c5a059] to-[#d4b069] transition-all"
                    style={{ width: `${(item.priority / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              {item.stats && item.stats.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">Priority Stats:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.stats.map((stat, statIndex) => (
                      <span
                        key={statIndex}
                        className="px-3 py-1 bg-[#141417] border border-[#3d3d43] text-sm text-gray-300"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Explanation */}
              <p className="text-gray-300 text-sm leading-relaxed">{item.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
