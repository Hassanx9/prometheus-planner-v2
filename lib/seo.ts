import { Build } from '@/types';

export function generateBuildSEOMeta(build: Build, locale: string) {
  const title = build.seoMeta?.title || `${build.name} - ${build.tier}-Tier ${build.category} Build Guide`;
  const description = build.seoMeta?.description || 
    `${build.name} is a ${build.tier}-Tier ${build.category.toLowerCase()} build for ${build.game}. ${build.description}`;
  const keywords = build.seoMeta?.keywords || [
    build.game.toLowerCase().replace(' ', ''),
    build.class.toLowerCase(),
    build.name.toLowerCase(),
    build.category.toLowerCase().replace(' ', ''),
    'build',
    'guide',
    'arpg',
  ];

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: 'article' as const,
      images: build.seoMeta?.ogImage ? [build.seoMeta.ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/builds/${build.id}`,
      languages: {
        'en': `/en/builds/${build.id}`,
        'ar': `/ar/builds/${build.id}`,
      },
    },
  };
}

export function generateItemSEOMeta(itemName: string, game: string, locale: string) {
  return {
    title: `${itemName} - ${game} Item Database`,
    description: `Complete information about ${itemName} in ${game}. Stats, drop location, and usage guide.`,
    keywords: [itemName.toLowerCase(), game.toLowerCase().replace(' ', ''), 'item', 'database', 'arpg'],
  };
}
