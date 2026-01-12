'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useState, useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇴🇲' },
  ];

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    
    startTransition(() => {
      // Get the current path without locale
      const segments = pathname.split('/').filter(Boolean);
      const pathWithoutLocale = segments.slice(1).join('/');
      
      // Build new path with new locale
      const newPath = `/${newLocale}${pathWithoutLocale ? '/' + pathWithoutLocale : ''}`;
      
      // Navigate and refresh
      router.push(newPath);
      router.refresh();
    });
  };

  const currentLang = languages.find((lang) => lang.code === locale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 bg-[#141417] border border-[#3d3d43] text-gray-300 hover:text-[#c5a059] transition-colors text-sm rounded disabled:opacity-50"
      >
        <Globe size={16} className={isPending ? 'animate-spin' : ''} />
        <span>{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 bg-[#141417] border border-[#3d3d43] shadow-2xl z-20 min-w-[150px] rounded overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                disabled={isPending}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-[#0c0c0e] transition-colors disabled:opacity-50 ${
                  locale === lang.code
                    ? 'text-[#c5a059] bg-[#0c0c0e] font-bold'
                    : 'text-gray-300'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
                {locale === lang.code && (
                  <span className="ml-auto text-xs text-[#c5a059]">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
