import { useTranslations } from 'next-intl';
import { BuildList } from '@/components/builds/BuildList';

export const dynamic = 'force-dynamic';

export default function BuildsPage() {
  const t = useTranslations('builds');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b0f] via-[#050506] to-[#0a0b0f]">
      <div className="max-w-[1600px] mx-auto px-8 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-4 py-2 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <span className="text-sm font-bold text-[#c5a059] uppercase tracking-wider">
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
        
        <BuildList />
      </div>
    </div>
  );
}
