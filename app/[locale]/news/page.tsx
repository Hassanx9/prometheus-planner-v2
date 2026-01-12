import { NewsSection } from '@/components/news/NewsSection';

export const dynamic = 'force-dynamic';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-gray-200">
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-[#c5a059] mb-2">
            News & Patch Notes
          </h1>
          <p className="text-gray-400">
            Latest updates and expert analysis
          </p>
        </div>
        <NewsSection />
      </div>
    </div>
  );
}
