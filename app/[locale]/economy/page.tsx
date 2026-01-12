import { useTranslations } from 'next-intl';
import { EconomyTracker } from '@/components/economy/EconomyTracker';

export const dynamic = 'force-dynamic';

export default function EconomyPage() {
  const t = useTranslations('economy');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b0f] via-[#050506] to-[#0a0b0f]">
      <div className="max-w-[1600px] mx-auto px-8 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#7ecce0]/10 border border-[#7ecce0]/30 px-4 py-2 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7ecce0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="2" x2="12" y2="22"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span className="text-sm font-bold text-[#7ecce0] uppercase tracking-wider">
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
        
        <EconomyTracker />
      </div>
    </div>
  );
}
