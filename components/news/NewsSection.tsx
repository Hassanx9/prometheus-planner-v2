'use client';

import { Newspaper, Calendar, User } from 'lucide-react';

const mockNews = [
  {
    id: 1,
    title: 'PoE 2 Patch 1.2.0 - Major Balance Changes',
    author: 'Admin',
    date: '2024-01-15',
    excerpt: 'Significant changes to skill trees and item drops in the latest patch...',
    category: 'Patch Notes',
  },
  {
    id: 2,
    title: 'Diablo IV Season 3 Meta Analysis',
    author: 'BuildMaster',
    date: '2024-01-14',
    excerpt: 'Breaking down the current meta and top-performing builds...',
    category: 'Meta Analysis',
  },
];

export function NewsSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockNews.map((article) => (
          <article
            key={article.id}
            className="bg-[#141417] border border-[#3d3d43] p-6 hover:border-[#c5a059] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-3">
              <Newspaper size={16} className="text-[#c5a059]" />
              <span className="text-xs text-gray-500 uppercase">{article.category}</span>
            </div>
            <h2 className="text-2xl font-serif text-[#c5a059] mb-3">{article.title}</h2>
            <p className="text-gray-400 mb-4">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{article.date}</span>
              </div>
            </div>
            <button className="mt-4 text-[#c5a059] hover:text-[#d4b069] transition-colors text-sm font-bold uppercase tracking-wider">
              Read More →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
