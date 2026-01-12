'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Globe, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇴🇲' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-language-switcher]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  const handleLocaleChange = async (newLocale: string) => {
    if (newLocale === locale || isChanging) return;

    try {
      setIsChanging(true);
      setIsOpen(false);

      // Simple and reliable: just replace the locale in the URL
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
      
      // Force a hard navigation to ensure proper locale switching
      window.location.href = newPath;
    } catch (error) {
      console.error('Error switching locale:', error);
      setIsChanging(false);
    }
  };

  const currentLang = languages.find((lang) => lang.code === locale);

  return (
    <div className="relative" data-language-switcher>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        disabled={isChanging}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-br from-[#1a1c2e] to-[#0f1116] border border-[#3d3d43] text-gray-300 hover:text-white hover:border-[#c5a059] transition-all text-sm rounded-lg shadow-lg hover:shadow-[#c5a059]/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Globe 
          size={18} 
          className={`transition-transform group-hover:scale-110 ${isChanging ? 'animate-spin text-[#c5a059]' : ''}`} 
        />
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLang?.name}</span>
        {!isChanging && (
          <svg 
            className="w-3 h-3 ml-1 transition-transform group-hover:translate-y-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-3 right-0 bg-[#1a1c2e] border border-[#3d3d43] shadow-2xl z-50 min-w-[180px] rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-1.5">
            {languages.map((lang) => {
              const isActive = locale === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocaleChange(lang.code);
                  }}
                  disabled={isChanging}
                  className={`
                    w-full text-left px-4 py-3 flex items-center gap-3 rounded-lg
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-[#c5a059]/20 to-[#c5a059]/5 text-[#c5a059] font-bold shadow-lg shadow-[#c5a059]/10'
                        : 'text-gray-300 hover:text-white hover:bg-[#0f1116]'
                    }
                  `}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="flex-1 font-medium">{lang.name}</span>
                  {isActive && (
                    <Check size={18} className="text-[#c5a059] animate-in zoom-in duration-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
