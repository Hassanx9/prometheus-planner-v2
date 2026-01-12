'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bot, Send, Sparkles, Zap } from 'lucide-react';

export function AIGuide() {
  const t = useTranslations('ai');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: t('welcome') },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your build, I recommend focusing on defensive nodes first. Your current setup lacks sufficient life and resistances for endgame content.",
        "Consider adding more damage multipliers. Your build has good base damage but could benefit from increased critical strike chance.",
        "Your skill tree pathing looks optimal. The next step would be to optimize your gear with better affixes.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* AI Chat */}
      <div className="lg:col-span-2 bg-[#141417] border border-[#3d3d43] rounded-sm flex flex-col h-[600px]">
        <div className="p-4 border-b border-[#3d3d43] flex items-center gap-3">
          <Bot className="text-[#c5a059]" size={24} />
          <div>
            <h2 className="text-[#c5a059] font-serif text-lg">{t('title')}</h2>
            <p className="text-xs text-gray-500">{t('subtitle')}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded ${
                  message.role === 'user'
                    ? 'bg-[#c5a059] text-black'
                    : 'bg-[#0c0c0e] border border-[#3d3d43] text-gray-200'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#0c0c0e] border border-[#3d3d43] p-4 rounded">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-[#c5a059] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#3d3d43]">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('askQuestion')}
              className="flex-1 px-4 py-2 bg-[#0c0c0e] border border-[#3d3d43] text-white placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="px-6 py-2 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors flex items-center gap-2"
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="bg-[#141417] border border-[#3d3d43] p-6">
          <h3 className="text-[#c5a059] font-serif text-sm uppercase mb-4 flex items-center gap-2">
            <Sparkles size={16} />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full py-3 bg-[#0c0c0e] border border-[#3d3d43] text-left px-4 hover:border-[#c5a059] transition-colors">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#c5a059]" />
                <span className="text-sm">{t('analyzeBuild')}</span>
              </div>
            </button>
            <button className="w-full py-3 bg-[#0c0c0e] border border-[#3d3d43] text-left px-4 hover:border-[#c5a059] transition-colors">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#c5a059]" />
                <span className="text-sm">{t('optimizeGear')}</span>
              </div>
            </button>
            <button className="w-full py-3 bg-[#0c0c0e] border border-[#3d3d43] text-left px-4 hover:border-[#c5a059] transition-colors">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#c5a059]" />
                <span className="text-sm">{t('suggestImprovements')}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
