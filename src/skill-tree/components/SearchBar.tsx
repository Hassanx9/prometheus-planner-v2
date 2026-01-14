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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search nodes..."
          className="w-full pl-10 pr-10 py-2.5 bg-[#141417] border border-[#3d3d43] text-gray-200 placeholder-gray-500 focus:border-[#c5a059] focus:outline-none transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {/* Search results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-[#0c0c0e] border border-[#3d3d43] shadow-premium-xl max-h-96 overflow-y-auto custom-scrollbar">
          {results.map((node, index) => (
            <button
              key={node.id}
              onClick={() => handleSelectResult(node)}
              className={`w-full text-left px-4 py-3 transition-colors border-b border-[#3d3d43] last:border-b-0 ${
                index === selectedIndex
                  ? 'bg-[#1a1c2e] border-l-2 border-l-[#c5a059]'
                  : 'hover:bg-[#141417]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-200 truncate">{node.name}</h4>
                    <span
                      className={`px-2 py-0.5 text-xs font-bold uppercase ${
                        node.type === 'keystone'
                          ? 'bg-[#c5a059] text-black'
                          : node.type === 'notable'
                          ? 'bg-[#7ecce0] text-black'
                          : 'bg-[#3d3d43] text-gray-300'
                      }`}
                    >
                      {node.type}
                    </span>
                  </div>
                  {node.description && (
                    <p className="text-sm text-gray-400 line-clamp-2">{node.description}</p>
                  )}
                  {node.stats && node.stats.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {node.stats.slice(0, 2).map((stat, idx) => (
                        <li key={idx} className="text-xs text-[#7ecce0]">
                          • {stat.name}
                        </li>
                      ))}
                      {node.stats.length > 2 && (
                        <li className="text-xs text-gray-500">
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
