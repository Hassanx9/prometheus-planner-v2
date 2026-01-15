/**
 * SearchBar - Search and filter UI for skill tree
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { getSkillTreeService } from '../services/skillService';
import type { SkillNode } from '../models/skill';

interface SearchBarProps {
  onNodeSelect?: (nodeId: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onNodeSelect,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SkillNode[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const service = getSkillTreeService();
  
  /**
   * Perform search
   */
  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    
    const searchResults = service.searchNodes(searchQuery, 10);
    setResults(searchResults);
    setIsOpen(searchResults.length > 0);
    setSelectedIndex(0);
  }, [service]);
  
  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
  };
  
  /**
   * Handle result selection
   */
  const handleSelectResult = (node: SkillNode) => {
    setQuery(node.name);
    setIsOpen(false);
    onNodeSelect?.(node.id);
  };
  
  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelectResult(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };
  
  /**
   * Clear search
   */
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };
  
  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className={`relative ${className}`} onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search nodes..."
          className="w-full pl-12 pr-12 py-3.5 bg-gradient-to-r from-[#141417] to-[#0f1014] border border-[#2a2d35] text-gray-200 placeholder-gray-600 focus:border-[#d4b16a] focus:outline-none focus:ring-2 focus:ring-[#d4b16a]/20 transition-all duration-200 shadow-lg"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {/* Search results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gradient-to-b from-[#0f1014] to-[#0a0b0f] border-2 border-[#2a2d35] shadow-2xl max-h-96 overflow-y-auto custom-scrollbar">
          {results.map((node, index) => (
            <button
              key={node.id}
              onClick={() => handleSelectResult(node)}
              className={`w-full text-left px-5 py-4 transition-all duration-150 border-b border-[#2a2d35] last:border-b-0 ${
                index === selectedIndex
                  ? 'bg-gradient-to-r from-[#1a1c2e] to-[#141417] border-l-4 border-l-[#d4b16a] shadow-md'
                  : 'hover:bg-[#141417]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="font-semibold text-gray-100 truncate text-base">{node.name}</h4>
                    <span
                      className={`px-2.5 py-1 text-xs font-bold uppercase shadow-md ${
                        node.type === 'keystone'
                          ? 'bg-gradient-to-r from-[#d4b16a] to-[#c5a059] text-black'
                          : node.type === 'notable'
                          ? 'bg-gradient-to-r from-[#88e3f5] to-[#7ecce0] text-black'
                          : 'bg-[#2a2d35] text-gray-400'
                      }`}
                    >
                      {node.type}
                    </span>
                  </div>
                  {node.description && (
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{node.description}</p>
                  )}
                  {node.stats && node.stats.length > 0 && (
                    <ul className="mt-2.5 space-y-1">
                      {node.stats.slice(0, 2).map((stat, idx) => (
                        <li key={idx} className="text-sm text-[#88e3f5] flex items-center gap-1.5">
                          <span className="text-[#d4b16a]">▸</span> {stat.name}
                        </li>
                      ))}
                      {node.stats.length > 2 && (
                        <li className="text-xs text-gray-600 italic">
                          +{node.stats.length - 2} more stats
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
