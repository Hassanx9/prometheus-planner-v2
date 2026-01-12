import { BuildDetail } from '@/components/builds/BuildDetail';
import { Build } from '@/types';
import { generateBuildSEOMeta } from '@/lib/seo';

// Mock build data - will be replaced with API/database call
const mockBuild: Build = {
  id: '1',
  name: 'Lightning Spear Mercenary',
  class: 'Mercenary',
  tier: 'S',
  category: 'League Starter',
  game: 'PoE 2',
  author: 'ProGamer123',
  authorId: 'user1',
  views: 12500,
  upvotes: 892,
  downvotes: 45,
  comments: 123,
  lastUpdated: '2 days ago',
  description: 'High DPS lightning build focused on spear attacks',
  fullDescription: 'This Lightning Spear Mercenary build is perfect for league start. It focuses on maximizing lightning damage through the skill tree and proper gem linking. The build excels at clearing maps quickly while maintaining good single-target damage for bosses. With proper gear, this build can easily reach endgame content.',
  skillTree: {
    nodes: [
      { id: 'start', name: 'Mercenary Origin', description: 'Starting point', x: 400, y: 300, type: 'start' },
      { id: 'life1', name: '+20 Max Life', description: 'Increases maximum life', x: 400, y: 220, type: 'small', stats: ['+20 to Maximum Life'] },
      { id: 'dmg1', name: '10% Physical Damage', description: 'Increases physical damage', x: 480, y: 300, type: 'small', stats: ['10% increased Physical Damage'] },
      { id: 'notable1', name: 'Lead Spitter', description: 'Notable passive', x: 480, y: 220, type: 'notable', stats: ['30% increased Projectile Damage', '20% increased Attack Speed'] },
    ],
    connections: [
      { from: 'start', to: 'life1' },
      { from: 'start', to: 'dmg1' },
      { from: 'dmg1', to: 'notable1' },
      { from: 'life1', to: 'notable1' },
    ],
  },
  gemLinks: [
    {
      id: 'main',
      name: 'Lightning Spear',
      level: 20,
      quality: 20,
      spiritCost: 25,
      links: ['Added Lightning Damage', 'Faster Attacks', 'Elemental Focus'],
    },
  ],
  craftingGuide: [
    {
      step: 1,
      title: 'Craft the Base Weapon',
      description: 'Start with a high item level spear base. Use Essences of Wrath to guarantee lightning damage rolls.',
      materials: ['High-level Spear Base', 'Essence of Wrath', 'Orb of Alchemy'],
    },
    {
      step: 2,
      title: 'Add Critical Strike Modifiers',
      description: 'Use the Crafting Bench to add critical strike chance and multiplier.',
      materials: ['Crafting Bench', 'Exalted Orb'],
    },
  ],
  gearPriority: [
    {
      slot: 'Weapon',
      priority: 10,
      stats: ['Lightning Damage', 'Attack Speed', 'Critical Strike Chance'],
      explanation: 'Weapon is the most important slot. Prioritize high lightning damage and attack speed.',
    },
    {
      slot: 'Helmet',
      priority: 8,
      stats: ['Life', 'Resistances', 'Accuracy'],
      explanation: 'Helmet provides essential defensive stats and accuracy for attacks.',
    },
  ],
  levelingGuide: [
    { level: 20, description: 'Focus on life nodes and basic damage increases. Use any lightning skill available.' },
    { level: 50, description: 'Transition to Lightning Spear. Start pathing towards Lead Spitter notable.' },
    { level: 70, description: 'Complete your core skill tree. Focus on getting all essential notables.' },
    { level: 100, description: 'Optimize your tree for endgame. Fill out remaining small nodes for maximum efficiency.' },
  ],
  tags: ['lightning', 'spear', 'mercenary', 'league-starter'],
  buildCode: 'POE2_BUILD_CODE_HERE',
  seoMeta: {
    title: 'Lightning Spear Mercenary Build Guide - PoE 2',
    description: 'Best Lightning Spear Mercenary build for Path of Exile 2. S-Tier League Starter build with detailed guide.',
    keywords: ['poe2', 'mercenary', 'lightning', 'spear', 'build', 'guide'],
  },
};

export async function generateMetadata({ params }: { params: { id: string; locale: string } }) {
  // In production, fetch build from database/API
  const seoMeta = generateBuildSEOMeta(mockBuild, params.locale);
  
  return {
    ...seoMeta,
  };
}

export default function BuildDetailPage() {
  return <BuildDetail build={mockBuild} />;
}
