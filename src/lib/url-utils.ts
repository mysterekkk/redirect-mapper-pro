import { nanoid } from 'nanoid';
import type { UrlEntry } from '@/types/url';

const TRACKING_PARAMS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'fbclid', 'gclid', 'gclsrc', 'dclid', 'msclkid',
  'mc_cid', 'mc_eid', 'ref', '_ga', '_gl',
]);

export function normalizeUrl(rawUrl: string): string {
  let url = rawUrl.trim();
  if (!url) return '';

  // Try to parse as full URL
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://placeholder.com${url.startsWith('/') ? '' : '/'}${url}`);

    // Remove tracking params
    const params = new URLSearchParams(parsed.search);
    for (const key of [...params.keys()]) {
      if (TRACKING_PARAMS.has(key.toLowerCase())) {
        params.delete(key);
      }
    }

    let pathname = decodeURIComponent(parsed.pathname).toLowerCase();

    // Remove trailing slash (except root)
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }

    const search = params.toString();
    return pathname + (search ? `?${search}` : '');
  } catch {
    // Fallback: basic normalization for malformed URLs
    let normalized = url.toLowerCase().trim();
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  }
}

export function extractPathname(rawUrl: string): string {
  try {
    const url = new URL(rawUrl.startsWith('http') ? rawUrl : `https://placeholder.com${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`);
    let pathname = decodeURIComponent(url.pathname).toLowerCase();
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    return pathname;
  } catch {
    return rawUrl.toLowerCase().trim();
  }
}

export function extractSlug(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  return segments[segments.length - 1] || '';
}

export function tokenize(pathname: string): string[] {
  return pathname
    .split(/[/\-_.]/)
    .filter(Boolean)
    .map(t => t.toLowerCase());
}

export function createUrlEntry(rawUrl: string, source: 'old' | 'new'): UrlEntry {
  const normalizedUrl = normalizeUrl(rawUrl);
  const pathname = extractPathname(rawUrl);
  const slug = extractSlug(pathname);
  const tokens = tokenize(pathname);

  return {
    id: nanoid(),
    originalUrl: rawUrl.trim(),
    normalizedUrl,
    pathname,
    slug,
    tokens,
    source,
  };
}

export function extractDomain(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
    return url.hostname;
  } catch {
    return null;
  }
}
