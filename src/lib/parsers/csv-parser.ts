import Papa from 'papaparse';
import { createUrlEntry } from '@/lib/url-utils';
import type { UrlEntry } from '@/types/url';

/**
 * Parse a CSV file and extract URLs.
 * Looks for columns named: url, URL, source, target, old_url, new_url, path, permalink, loc
 */
const URL_COLUMN_NAMES = [
  'url', 'URL', 'Url',
  'source', 'Source',
  'target', 'Target',
  'old_url', 'new_url',
  'path', 'Path',
  'permalink', 'Permalink',
  'loc', 'address', 'Address',
];

export function parseCsvFile(content: string, source: 'old' | 'new'): UrlEntry[] {
  const result = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.trim(),
  });

  if (!result.data || result.data.length === 0) {
    // Try without header
    const noHeader = Papa.parse(content, {
      header: false,
      skipEmptyLines: true,
    });
    return (noHeader.data as string[][])
      .map(row => row[0]?.trim())
      .filter(Boolean)
      .filter(url => url!.startsWith('/') || url!.startsWith('http'))
      .map(url => createUrlEntry(url!, source));
  }

  // Find the URL column
  const headers = Object.keys(result.data[0] as Record<string, string>);
  const urlColumn = headers.find(h => URL_COLUMN_NAMES.includes(h)) || headers[0];

  return (result.data as Record<string, string>[])
    .map(row => row[urlColumn]?.trim())
    .filter(Boolean)
    .filter(url => url!.startsWith('/') || url!.startsWith('http'))
    .map(url => createUrlEntry(url!, source));
}
