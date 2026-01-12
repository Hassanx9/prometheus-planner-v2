'use client';

import { GemLink } from '@/types';
import { Package, Link2, Zap } from 'lucide-react';

interface GemLinksViewerProps {
  gemLinks: GemLink[];
}

export function GemLinksViewer({ gemLinks }: GemLinksViewerProps) {
  return (
    <div className="space-y-6">
      <div className="bg-[#141417] border border-[#3d3d43] p-6">
        <h2 className="text-2xl font-serif text-[#c5a059] mb-6 flex items-center gap-2">
          <Package size={24} />
          Gem Links Setup
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gemLinks.map((gem, index) => (
            <div
              key={gem.id}
              className="bg-[#0c0c0e] border border-[#3d3d43] p-6 hover:border-[#c5a059] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-serif text-[#c5a059] mb-2">{gem.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Level {gem.level}</span>
                    {gem.quality > 0 && <span>Quality {gem.quality}%</span>}
                    {gem.spiritCost && (
                      <span className="flex items-center gap-1 text-[#7ecce0]">
                        <Zap size={14} />
                        {gem.spiritCost} Spirit
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {gem.links && gem.links.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#3d3d43]">
                  <h4 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                    <Link2 size={14} />
                    Linked Gems ({gem.links.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {gem.links.map((link, linkIndex) => (
                      <span
                        key={linkIndex}
                        className="px-3 py-1 bg-[#141417] border border-[#3d3d43] text-sm text-gray-300"
                      >
                        {link}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
