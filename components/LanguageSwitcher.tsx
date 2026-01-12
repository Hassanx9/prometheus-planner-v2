'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇴🇲' },
  ];

  const switchLocale = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  const currentLang = languages.find((lang) => lang.code === locale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-[#141417] border border-[#3d3d43] text-gray-300 hover:text-[#c5a059] transition-colors text-sm"
      >
        <Globe size={16} />
        <span>{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 bg-[#141417] border border-[#3d3d43] shadow-2xl z-20 min-w-[150px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-[#0c0c0e] transition-colors ${
                  locale === lang.code
                    ? 'text-[#c5a059] bg-[#0c0c0e]'
                    : 'text-gray-300'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
