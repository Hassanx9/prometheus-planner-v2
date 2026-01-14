'use client';

import { useState, useEffect } from 'react';
import { Swords, Gamepad2 } from 'lucide-react';

type Game = 'PoE 2' | 'Diablo IV';

export function GameSwitcher() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('selectedGame');
    if (saved && (saved === 'PoE 2' || saved === 'Diablo IV')) {
      setSelectedGame(saved);
    }
  }, []);

  const handleGameChange = (game: Game | null) => {
    setSelectedGame(game);
    if (game) {
      localStorage.setItem('selectedGame', game);
    } else {
      localStorage.removeItem('selectedGame');
    }
  };

  const games = [
    { id: 'PoE 2', name: 'Path of Exile 2', icon: Swords },
    { id: 'Diablo IV', name: 'Diablo IV', icon: Gamepad2 },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-br from-[#1a1c2e] to-[#0f1116] border border-[#3d3d43] text-gray-300 hover:text-white hover:border-[#c5a059] transition-all text-sm rounded-lg shadow-lg hover:shadow-[#c5a059]/20"
      >
        {selectedGame ? (
          <>
            {selectedGame === 'PoE 2' ? (
              <Swords size={18} className="text-[#c5a059]" />
            ) : (
              <Gamepad2 size={18} className="text-[#c5a059]" />
            )}
            <span className="font-medium">{selectedGame}</span>
          </>
        ) : (
          <>
            <Gamepad2 size={18} className="text-gray-400" />
            <span className="font-medium">Select Game</span>
          </>
        )}
        <svg 
          className="w-3 h-3 ml-1 transition-transform group-hover:translate-y-0.5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-3 right-0 bg-[#1a1c2e] border border-[#3d3d43] shadow-2xl z-50 min-w-[200px] rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-1.5">
            {games.map((game) => {
              const Icon = game.icon;
              const isActive = selectedGame === game.id;
              return (
                <button
                  key={game.id}
                  onClick={() => {
                    handleGameChange(game.id as Game);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 flex items-center gap-3 rounded-lg
                    transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-[#c5a059]/20 to-[#c5a059]/5 text-[#c5a059] font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-[#0f1116]'
                    }
                  `}
                >
                  <Icon size={20} className={isActive ? 'text-[#c5a059]' : 'text-gray-400'} />
                  <span className="flex-1 font-medium">{game.name}</span>
                </button>
              );
            })}
            {selectedGame && (
              <button
                onClick={() => {
                  handleGameChange(null);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 flex items-center gap-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#0f1116] transition-all duration-200"
              >
                <span className="flex-1 font-medium">Clear Selection</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}