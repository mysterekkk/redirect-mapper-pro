import { XMLParser } from 'fast-xml-parser';
import { createUrlEntry } from '@/lib/url-utils';
import type { UrlEntry } from '@/types/url';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  priority?: number | string;
}

/**
 * Parse a sitemap.xml file and extract URLs with metadata.
 */
export function parseSitemapXml(content: string, source: 'old' | 'new'): UrlEntry[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });

  const parsed = parser.parse(content);

  // Handle both sitemap and sitemapindex
  let urls: SitemapUrl[] = [];

  if (parsed.urlset?.url) {
    urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
  } else if (parsed.sitemapindex?.sitemap) {
    // Sitemap index - extract sitemap URLs
    const sitemaps = Array.isArray(parsed.sitemapindex.sitemap)
      ? parsed.sitemapindex.sitemap
      : [parsed.sitemapindex.sitemap];
    urls = sitemaps.map((s: { loc: string }) => ({ loc: s.loc }));
  }

  return urls
    .filter(u => u.loc)
    .map(u => {
      const entry = createUrlEntry(u.loc, source);
      entry.metadata = {
        lastmod: u.lastmod?.toString(),
        priority: typeof u.priority === 'string' ? parseFloat(u.priority) : u.priority,
      };
      return entry;
    });
}
