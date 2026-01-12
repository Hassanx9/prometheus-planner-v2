'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const mockCurrency = [
  { name: 'Chaos Orb', price: 1.0, change: 0.05, trend: 'up' },
  { name: 'Divine Orb', price: 180.0, change: -2.5, trend: 'down' },
  { name: 'Exalted Orb', price: 12.0, change: 0.0, trend: 'neutral' },
];

export function EconomyTracker() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCurrency.map((currency) => (
          <div
            key={currency.name}
            className="bg-[#141417] border border-[#3d3d43] p-6 hover:border-[#c5a059] transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-serif text-[#c5a059] mb-2">{currency.name}</h3>
                <p className="text-3xl font-bold text-white">{currency.price.toFixed(2)}</p>
              </div>
              <div className={`flex items-center gap-1 ${
                currency.trend === 'up' ? 'text-green-500' :
                currency.trend === 'down' ? 'text-red-500' :
                'text-gray-500'
              }`}>
                {currency.trend === 'up' && <TrendingUp size={20} />}
                {currency.trend === 'down' && <TrendingDown size={20} />}
                {currency.trend === 'neutral' && <Minus size={20} />}
                <span className="text-sm font-bold">
                  {currency.change > 0 ? '+' : ''}{currency.change.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Last updated: Just now
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#141417] border border-[#3d3d43] p-8 text-center">
        <p className="text-gray-400">
          Real-time economy data integration coming soon...
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Will integrate with poe.ninja API for live price tracking
        </p>
      </div>
    </div>
  );
}
