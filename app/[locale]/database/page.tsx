import { ItemDatabase } from '@/components/database/ItemDatabase';

export default function DatabasePage() {
  return (
    <div className="min-h-screen bg-[#050506] text-gray-200">
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-[#c5a059] mb-2">
            Item Database
          </h1>
          <p className="text-gray-400">
            Comprehensive database of all in-game items
          </p>
        </div>
        <ItemDatabase />
      </div>
    </div>
  );
}
