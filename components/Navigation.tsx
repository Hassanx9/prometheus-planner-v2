'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sword, 
  BookOpen, 
  Bot, 
  Users, 
  Trophy, 
  TrendingUp, 
  Newspaper,
  User,
  Settings
} from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { clsx } from 'clsx';

export function Navigation() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();

  const navItems = [
    { href: `/${locale}`, label: t('home'), icon: Sword },
    { href: `/${locale}/builds`, label: t('builds'), icon: BookOpen },
    { href: `/${locale}/database`, label: t('database'), icon: BookOpen },
    { href: `/${locale}/ai`, label: t('aiGuide'), icon: Bot },
    { href: `/${locale}/community`, label: t('community'), icon: Users },
    { href: `/${locale}/leaderboards`, label: t('leaderboards'), icon: Trophy },
    { href: `/${locale}/economy`, label: t('economy'), icon: TrendingUp },
    { href: `/${locale}/news`, label: t('news'), icon: Newspaper },
  ];

  const isRTL = locale === 'ar';

  return (
    <header className="border-b border-[#3d3d43] bg-[#0c0c0e] sticky top-0 z-50 shadow-2xl">
      <div className="max-w-[1800px] mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}`} className="flex items-center gap-4">
            <div className="w-10 h-10 border border-[#c5a059] rotate-45 flex items-center justify-center bg-[#141417]">
              <Sword size={20} className="text-[#c5a059] -rotate-45" />
            </div>
            <div>
              <h1 className="text-[#c5a059] font-serif text-xl tracking-[0.2em] uppercase leading-none">
                Prometheus
              </h1>
              <p className="text-[9px] text-gray-500 uppercase mt-1">
                {tCommon('tagline')}
              </p>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2',
                  isActive
                    ? 'bg-[#c5a059] text-black'
                    : 'text-gray-400 hover:text-[#c5a059] hover:bg-[#141417]'
                )}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/profile`}
            className="p-2 text-gray-400 hover:text-[#c5a059] transition-colors"
          >
            <User size={20} />
          </Link>
          <Link
            href={`/${locale}/settings`}
            className="p-2 text-gray-400 hover:text-[#c5a059] transition-colors"
          >
            <Settings size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
