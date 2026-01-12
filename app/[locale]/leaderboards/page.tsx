import { useTranslations } from 'next-intl';
import { Leaderboards } from '@/components/leaderboards/Leaderboards';

export const dynamic = 'force-dynamic';

export default function LeaderboardsPage() {
  const t = useTranslations('leaderboards');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b0f] via-[#050506] to-[#0a0b0f]">
      <div className="max-w-[1600px] mx-auto px-8 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#9b59b6]/10 border border-[#9b59b6]/30 px-4 py-2 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9b59b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3h5v12h-5M16 3L9 9l-3-3L1 12"/>
              <path d="M16 12h5"/>
              <path d="M16 19h5"/>
              <path d="M7 21v-4"/>
              <path d="M7 14v-2"/>
              <path d="M7 7V3"/>
              <path d="M11 7h4"/>
              <path d="M11 12h4"/>
              <path d="M11 17h4"/>
            </svg>
            <span className="text-sm font-bold text-[#9b59b6] uppercase tracking-wider">
              {t('title')}
            </span>
          </div>
          
          <h1 className="text-6xl font-black text-white mb-6">
            {t('title')}
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
        
        <Leaderboards />
      </div>
    </div>
  );
}
