import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#050506] text-gray-200">
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-[#c5a059] mb-2">
            Profile
          </h1>
          <p className="text-gray-400">
            Manage your profile and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#141417] border border-[#3d3d43] p-6">
              <h2 className="text-2xl font-serif text-[#c5a059] mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Username</label>
                  <input
                    type="text"
                    defaultValue="User123"
                    className="w-full px-4 py-3 bg-[#0c0c0e] border border-[#3d3d43] text-white focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="w-full px-4 py-3 bg-[#0c0c0e] border border-[#3d3d43] text-white focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 bg-[#0c0c0e] border border-[#3d3d43] text-white placeholder-gray-500 focus:border-[#c5a059] focus:outline-none resize-none"
                  />
                </div>
                <button className="px-6 py-3 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-[#141417] border border-[#3d3d43] p-6">
              <h2 className="text-2xl font-serif text-[#c5a059] mb-6">My Builds</h2>
              <p className="text-gray-400">
                View and manage your created builds
              </p>
              <div className="mt-4">
                <button className="px-6 py-3 bg-[#0c0c0e] border border-[#3d3d43] text-gray-300 hover:border-[#c5a059] hover:text-[#c5a059] transition-colors font-bold uppercase tracking-wider">
                  View All Builds
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#141417] border border-[#3d3d43] p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-[#0c0c0e] border border-[#3d3d43] rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-[#c5a059]">U</span>
                </div>
                <h3 className="text-xl font-serif text-[#c5a059]">User123</h3>
                <p className="text-sm text-gray-400">Member since 2024</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Builds Created</span>
                  <span className="text-white font-bold">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Favorites</span>
                  <span className="text-white font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Views</span>
                  <span className="text-white font-bold">1,234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
