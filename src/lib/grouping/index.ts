import type { UrlEntry } from '@/types/url';
import { classifyUrl } from './classifier';

export function groupUrls(urls: UrlEntry[], platform?: string): Map<string, UrlEntry[]> {
  const groups = new Map<string, UrlEntry[]>();

  for (const url of urls) {
    const group = classifyUrl(url.pathname, platform);
    url.group = group;

    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group)!.push(url);
  }

  return groups;
}

export { classifyUrl } from './classifier';
