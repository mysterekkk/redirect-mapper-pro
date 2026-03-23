import type { GroupPattern } from './patterns';
import { DEFAULT_PATTERNS, PLATFORM_PATTERNS } from './patterns';

export function classifyUrl(pathname: string, platform?: string): string {
  const patterns = platform && PLATFORM_PATTERNS[platform]
    ? PLATFORM_PATTERNS[platform]
    : DEFAULT_PATTERNS;

  for (const group of patterns) {
    for (const pattern of group.patterns) {
      if (pattern.test(pathname)) {
        return group.name;
      }
    }
  }

  return 'other';
}
