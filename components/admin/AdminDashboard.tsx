'use client';

import { useState } from 'react';
import { 
  Settings, BookOpen, Database, Bot, Users, 
  TrendingUp, FileText, RefreshCw, Plus,
  Edit, Trash2, Eye, Download, Upload
} from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'builds' | 'items' | 'ai' | 'users' | 'sync'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'builds', label: 'Builds', icon: BookOpen },
    { id: 'items', label: 'Items', icon: Database },
    { id: 'ai', label: 'AI Knowledge', icon: Bot },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'sync', label: 'Data Sync', icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen bg-[#050506] text-gray-200">
      {/* Header */}
      <div className="bg-[#0c0c0e] border-b border-[#3d3d43] sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-4 py-4">
          <h1 className="text-3xl font-serif text-[#c5a059]">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage builds, items, and platform settings</p>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#141417] border border-[#3d3d43] rounded-sm p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#c5a059] text-black'
                        : 'text-gray-400 hover:text-[#c5a059] hover:bg-[#0c0c0e]'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-bold uppercase text-sm tracking-wider">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#141417] border border-[#3d3d43] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <BookOpen className="text-[#c5a059]" size={24} />
                      <span className="text-3xl font-black text-[#c5a059]">127</span>
                    </div>
                    <h3 className="text-sm font-bold uppercase text-gray-400">Total Builds</h3>
                  </div>
                  <div className="bg-[#141417] border border-[#3d3d43] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Database className="text-[#c5a059]" size={24} />
                      <span className="text-3xl font-black text-[#c5a059]">2,458</span>
                    </div>
                    <h3 className="text-sm font-bold uppercase text-gray-400">Total Items</h3>
                  </div>
                  <div className="bg-[#141417] border border-[#3d3d43] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="text-[#c5a059]" size={24} />
                      <span className="text-3xl font-black text-[#c5a059]">8,923</span>
                    </div>
                    <h3 className="text-sm font-bold uppercase text-gray-400">Active Users</h3>
                  </div>
                </div>

                <div className="bg-[#141417] border border-[#3d3d43] p-6">
                  <h2 className="text-xl font-serif text-[#c5a059] mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 bg-[#0c0c0e] border border-[#3d3d43] hover:border-[#c5a059] transition-colors flex items-center gap-3">
                      <Plus size={20} className="text-[#c5a059]" />
                      <span className="font-bold uppercase text-sm">Create Build</span>
                    </button>
                    <button className="p-4 bg-[#0c0c0e] border border-[#3d3d43] hover:border-[#c5a059] transition-colors flex items-center gap-3">
                      <Upload size={20} className="text-[#c5a059]" />
                      <span className="font-bold uppercase text-sm">Import Items</span>
                    </button>
                    <button className="p-4 bg-[#0c0c0e] border border-[#3d3d43] hover:border-[#c5a059] transition-colors flex items-center gap-3">
                      <RefreshCw size={20} className="text-[#c5a059]" />
                      <span className="font-bold uppercase text-sm">Sync Data</span>
                    </button>
                    <button className="p-4 bg-[#0c0c0e] border border-[#3d3d43] hover:border-[#c5a059] transition-colors flex items-center gap-3">
                      <Bot size={20} className="text-[#c5a059]" />
                      <span className="font-bold uppercase text-sm">Update AI Knowledge</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'builds' && (
              <div className="bg-[#141417] border border-[#3d3d43] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-[#c5a059]">Manage Builds</h2>
                  <button className="px-6 py-3 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors flex items-center gap-2">
                    <Plus size={18} />
                    Add Build
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Mock build list */}
                  {[1, 2, 3].map((id) => (
                    <div key={id} className="bg-[#0c0c0e] border border-[#3d3d43] p-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-serif text-[#c5a059]">Build Name {id}</h3>
                        <p className="text-sm text-gray-400">S-Tier • League Starter • PoE 2</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-[#141417] border border-[#3d3d43] hover:border-[#c5a059] transition-colors">
                          <Eye size={18} className="text-gray-300" />
                        </button>
                        <button className="p-2 bg-[#141417] border border-[#3d3d43] hover:border-[#c5a059] transition-colors">
                          <Edit size={18} className="text-gray-300" />
                        </button>
                        <button className="p-2 bg-[#141417] border border-[#3d3d43] hover:border-red-500 transition-colors">
                          <Trash2 size={18} className="text-gray-300" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sync' && (
              <div className="bg-[#141417] border border-[#3d3d43] p-6">
                <h2 className="text-2xl font-serif text-[#c5a059] mb-6">Automated Data Sync</h2>
                <div className="space-y-4">
                  <div className="bg-[#0c0c0e] border border-[#3d3d43] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-serif text-[#c5a059] mb-2">Item Database Sync</h3>
                        <p className="text-sm text-gray-400">Sync items from game APIs</p>
                      </div>
                      <button className="px-6 py-3 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors">
                        Sync Now
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Last synced: 2 hours ago • Next sync: In 6 hours
                    </div>
                  </div>

                  <div className="bg-[#0c0c0e] border border-[#3d3d43] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-serif text-[#c5a059] mb-2">Patch Notes Sync</h3>
                        <p className="text-sm text-gray-400">Automatically fetch and translate patch notes</p>
                      </div>
                      <button className="px-6 py-3 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors">
                        Sync Now
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Last synced: 1 day ago • Next sync: In 12 hours
                    </div>
                  </div>

                  <div className="bg-[#0c0c0e] border border-[#3d3d43] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-serif text-[#c5a059] mb-2">Economy Data Sync</h3>
                        <p className="text-sm text-gray-400">Sync prices from poe.ninja API</p>
                      </div>
                      <button className="px-6 py-3 bg-[#c5a059] text-black font-bold uppercase tracking-wider hover:bg-[#d4b069] transition-colors">
                        Sync Now
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Last synced: 30 minutes ago • Next sync: In 30 minutes
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="bg-[#141417] border border-[#3d3d43] p-6">
                <h2 className="text-2xl font-serif text-[#c5a059] mb-6">AI Knowledge Base</h2>
                <p className="text-gray-400 mb-6">
                  Manage the AI assistant's knowledge base for PoE 2 and Diablo IV mechanics.
                </p>
                <div className="space-y-4">
                  <button className="w-full p-4 bg-[#0c0c0e] border border-[#3d3d43] hover:border-[#c5a059] transition-colors text-left">
                    <h3 className="text-lg font-serif text-[#c5a059] mb-2">Update Game Mechanics</h3>
                    <p className="text-sm text-gray-400">Refresh AI knowledge with latest game mechanics</p>
                  </button>
                  <button className="w-full p-4 bg-[#0c0c0e] border border-[#3d3d43] hover:border-[#c5a059] transition-colors text-left">
                    <h3 className="text-lg font-serif text-[#c5a059] mb-2">Add Custom Knowledge</h3>
                    <p className="text-sm text-gray-400">Manually add information to the AI knowledge base</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
