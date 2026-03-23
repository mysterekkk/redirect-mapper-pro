import { createUrlEntry } from '@/lib/url-utils';
import type { UrlEntry } from '@/types/url';

/**
 * Parse raw text input into URL entries.
 * Accepts one URL per line, ignoring empty lines and comments.
 */
export function parseUrlText(text: string, source: 'old' | 'new'): UrlEntry[] {
  if (!text.trim()) return [];

  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && !line.startsWith('//'))
    .map(line => {
      // Handle CSV-like input (take first column)
      const parts = line.split(',');
      const url = parts[0].trim();
      return url;
    })
    .filter(url => {
      // Basic URL validation
      if (!url) return false;
      if (url.startsWith('/')) return true;
      try {
        new URL(url.startsWith('http') ? url : `https://${url}`);
        return true;
      } catch {
        return false;
      }
    })
    .map(url => createUrlEntry(url, source));
}
