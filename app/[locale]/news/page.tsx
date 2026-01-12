import { useTranslations } from 'next-intl';
import { NewsSection } from '@/components/news/NewsSection';

export const dynamic = 'force-dynamic';

export default function NewsPage() {
  const t = useTranslations('news');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b0f] via-[#050506] to-[#0a0b0f]">
      <div className="max-w-[1600px] mx-auto px-8 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 px-4 py-2 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9m0 0a2 2 0 0 1 2-2h2"/>
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
        
        <NewsSection />
      </div>
    </div>
  );
}
