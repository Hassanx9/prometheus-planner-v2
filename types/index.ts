export type Game = 'PoE 2' | 'Diablo IV';

export type Tier = 'S' | 'A' | 'B' | 'C' | 'D';

export type BuildCategory = 'League Starter' | 'End-game' | 'Speed Farmer';

export type ItemType = 'Unique' | 'Legendary' | 'Rare' | 'Currency' | 'Common';

export interface Build {
  id: string;
  name: string;
  class: string;
  tier: Tier;
  category: BuildCategory;
  game: Game;
  author: string;
  authorId: string;
  views: number;
  upvotes: number;
  downvotes: number;
  comments: number;
  lastUpdated: string;
  description: string;
  fullDescription?: string;
  skillTree?: SkillTreeData; // Interactive skill tree data
  gemLinks?: GemLink[];
  craftingGuide?: CraftingStep[];
  gearPriority?: GearPriority[];
  gameplayVideo?: string;
  levelingGuide?: LevelingStep[];
  tags: string[];
  buildCode?: string; // PoB string or export code
  seoMeta?: SEOMeta;
}

export interface SkillTreeData {
  nodes: SkillNode[];
  connections: SkillConnection[];
  zoom?: number;
  pan?: { x: number; y: number };
}

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  type: 'small' | 'notable' | 'keystone' | 'start';
  stats?: string[];
  imageUrl?: string;
}

export interface SkillConnection {
  from: string;
  to: string;
}

export interface CraftingStep {
  step: number;
  title: string;
  description: string;
  materials: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface GearPriority {
  slot: string;
  priority: number; // 1-10
  stats: string[];
  explanation: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface GemLink {
  id: string;
  name: string;
  level: number;
  quality: number;
  links: string[];
  spiritCost?: number;
}

export interface LevelingStep {
  level: number;
  description: string;
  skillTreeSnapshot?: string;
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  game: Game;
  level: number;
  description: string;
  stats: ItemStat[];
  dropLocation?: string;
  imageUrl?: string;
}

export interface ItemStat {
  name: string;
  value: string | number;
  type: 'explicit' | 'implicit' | 'crafted';
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  builds: string[];
  favorites: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  buildId: string;
  userId: string;
  username: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  replies?: Comment[];
}
