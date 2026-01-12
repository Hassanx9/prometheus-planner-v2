import { CommunityHub } from '@/components/community/CommunityHub';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-gray-200">
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-[#c5a059] mb-2">
            Community
          </h1>
          <p className="text-gray-400">
            Share and discover builds from the community
          </p>
        </div>
        <CommunityHub />
      </div>
    </div>
  );
}
