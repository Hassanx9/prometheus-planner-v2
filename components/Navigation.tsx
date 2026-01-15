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
  Settings,
  GitBranch
} from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { GameSwitcher } from './GameSwitcher';
import { clsx } from 'clsx';

export function Navigation() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();

  const navItems = [
    { href: `/${locale}`, label: t('home'), icon: Sword },
    { href: `/${locale}/skill-tree`, label: t('skillTree'), icon: GitBranch },
    { href: `/${locale}/build-planner`, label: t('buildPlanner'), icon: BookOpen },
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
    <header className="border-b border-[#3d3d43]/50 bg-gradient-to-br from-[#0c0c0e] via-[#0a0b0f] to-[#0c0c0e] sticky top-0 z-50 shadow-premium-xl backdrop-blur-xl">
      <div className="max-w-[1900px] mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href={`/${locale}`} className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#c5a059] opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-12 h-12 border-2 border-[#c5a059] rotate-45 flex items-center justify-center bg-gradient-to-br from-[#1a1c2e] to-[#0f1116] shadow-lg group-hover:scale-110 transition-transform">
                <Sword size={24} className="text-[#c5a059] -rotate-45 group-hover:animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-gradient-gold font-serif text-2xl tracking-[0.15em] uppercase leading-none font-black">
                Prometheus
              </h1>
              <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-widest font-medium">
                {tCommon('tagline')}
              </p>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'relative px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2.5 rounded-lg group',
                  isActive
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#d4b16a] text-black shadow-premium hover:shadow-premium-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#1a1c2e] hover:to-[#0f1116] hover:shadow-lg'
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-[#c5a059] to-[#d4b16a] opacity-50 blur-xl"></span>
                )}
                <Icon size={16} className={clsx(
                  'relative transition-transform group-hover:scale-110',
                  isActive ? 'drop-shadow-lg' : ''
                )} />
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <GameSwitcher />
          <LanguageSwitcher />
          <Link
            href={`/${locale}/profile`}
            className="p-2.5 text-gray-400 hover:text-[#c5a059] transition-all rounded-lg hover:bg-[#1a1c2e] hover:shadow-lg"
          >
            <User size={22} />
          </Link>
          <Link
            href={`/${locale}/settings`}
            className="p-2.5 text-gray-400 hover:text-[#c5a059] transition-all rounded-lg hover:bg-[#1a1c2e] hover:shadow-lg"
          >
            <Settings size={22} />
          </Link>
        </div>
      </div>
    </header>
  );
}
