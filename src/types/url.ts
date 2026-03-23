export interface UrlEntry {
  id: string;
  originalUrl: string;
  normalizedUrl: string;
  pathname: string;
  slug: string;
  tokens: string[];
  source: 'old' | 'new';
  group?: string;
  metadata?: {
    lastmod?: string;
    priority?: number;
  };
}

export type UrlSource = 'paste' | 'csv' | 'sitemap';
