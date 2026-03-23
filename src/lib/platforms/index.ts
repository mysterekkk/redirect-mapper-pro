import type { PlatformType } from '@/types/export';

export interface PlatformPreset {
  id: PlatformType;
  name: string;
  description: string;
  urlPatterns: string[];
}

export const PLATFORM_PRESETS: PlatformPreset[] = [
  {
    id: 'wordpress',
    name: 'WordPress',
    description: 'Standard WordPress permalink structures',
    urlPatterns: ['/blog/', '/category/', '/tag/', '/author/', '/YYYY/MM/'],
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Shopify store URL patterns',
    urlPatterns: ['/products/', '/collections/', '/pages/', '/blogs/'],
  },
  {
    id: 'webflow',
    name: 'Webflow',
    description: 'Webflow CMS URL patterns',
    urlPatterns: ['/blog/', '/post/', '/[collection-slug]/'],
  },
  {
    id: 'framer',
    name: 'Framer',
    description: 'Framer site URL patterns',
    urlPatterns: ['/[page-slug]'],
  },
  {
    id: 'custom',
    name: 'Custom / Generic',
    description: 'No platform-specific patterns applied',
    urlPatterns: [],
  },
];

export function getPlatformPreset(id: PlatformType): PlatformPreset | undefined {
  return PLATFORM_PRESETS.find(p => p.id === id);
}
