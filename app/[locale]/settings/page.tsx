export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-gray-200">
      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-[#c5a059] mb-2">
            Settings
          </h1>
          <p className="text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="max-w-4xl space-y-6">
          {/* Account Settings */}
          <div className="bg-[#141417] border border-[#3d3d43] p-6">
            <h2 className="text-2xl font-serif text-[#c5a059] mb-6">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Change Password</label>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full px-4 py-3 bg-[#0c0c0e] border border-[#3d3d43] text-white placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full px-4 py-3 bg-[#0c0c0e] border border-[#3d3d43] text-white placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 bg-[#0c0c0e] border border-[#3d3d43] text-white placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <button className="mt-4 px-6 py-3 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-[#141417] border border-[#3d3d43] p-6">
            <h2 className="text-2xl font-serif text-[#c5a059] mb-6">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold mb-1">Email Notifications</h3>
                  <p className="text-sm text-gray-400">Receive email updates about your builds</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[#0c0c0e] border border-[#3d3d43] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#c5a059] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c5a059]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold mb-1">Build Updates</h3>
                  <p className="text-sm text-gray-400">Get notified when your builds receive comments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[#0c0c0e] border border-[#3d3d43] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#c5a059] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c5a059]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold mb-1">Newsletter</h3>
                  <p className="text-sm text-gray-400">Receive weekly build recommendations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#0c0c0e] border border-[#3d3d43] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#c5a059] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c5a059]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-[#141417] border border-[#3d3d43] p-6">
            <h2 className="text-2xl font-serif text-[#c5a059] mb-6">Privacy Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold mb-1">Public Profile</h3>
                  <p className="text-sm text-gray-400">Allow others to view your profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[#0c0c0e] border border-[#3d3d43] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#c5a059] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c5a059]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold mb-1">Show Email</h3>
                  <p className="text-sm text-gray-400">Display your email on your profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#0c0c0e] border border-[#3d3d43] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#c5a059] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c5a059]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#141417] border border-red-500/50 p-6">
            <h2 className="text-2xl font-serif text-red-500 mb-6">Danger Zone</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-bold mb-2">Delete Account</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="px-6 py-3 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
