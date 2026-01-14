'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Sword,
  Gamepad2,
  Users,
  BookOpen,
  Plus,
  Sparkles,
  TrendingUp,
  Star,
  Eye,
  Clock,
  ChevronRight,
  Play,
  Shield,
  Gem,
  Trophy,
  TrendingDown
} from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('home');
  const [selectedGame, setSelectedGame] = useState<'PoE 2' | 'Diablo IV' | null>(null);

  const trendingBuilds = [
    {
      title: 'Lightning Sorcerer',
      class: 'Sorcerer',
      rating: 4.8,
      author: 'StormMaster',
      tags: ['Lightning', 'Elemental', 'High Damage']
    },
    {
      title: 'Berserker Barbarian',
      class: 'Barbarian',
      rating: 4.9,
      author: 'RageLord',
      tags: ['Melee', 'Tank', 'Bleed']
    }
  ];

  const trendingGuides = [
    { title: 'Complete Lightning Guide', views: 15420, time: '12 min' },
    { title: 'Barbarian Endgame Build', views: 12850, time: '15 min' },
    { title: 'Economy Optimization', views: 9876, time: '8 min' }
  ];

  const metaClasses = [
    { name: 'Sorcerer', popularity: 85, trend: 'up', color: '#3b82f6' },
    { name: 'Barbarian', popularity: 78, trend: 'up', color: '#ef4444' },
    { name: 'Necromancer', popularity: 72, trend: 'down', color: '#8b5cf6' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b0f] via-[#050506] to-[#0a0b0f]">
      <h1>Test Page</h1>
      <p>This is a test to verify the build works.</p>
    </div>
  );
}