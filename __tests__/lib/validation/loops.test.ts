import { describe, it, expect } from 'vitest';
import { detectLoops } from '@/lib/validation/loops';
import type { RedirectMapping } from '@/types/mapping';
import type { UrlEntry } from '@/types/url';

function makeEntry(path: string, source: 'old' | 'new'): UrlEntry {
  return {
    id: `${source}-${path}`,
    originalUrl: path,
    normalizedUrl: path,
    pathname: path,
    slug: path.split('/').pop() || '',
    tokens: path.split('/').filter(Boolean),
    source,
  };
}

function makeMapping(id: string, oldPath: string, newPath: string): RedirectMapping {
  return {
    id,
    oldUrl: makeEntry(oldPath, 'old'),
    newUrl: makeEntry(newPath, 'new'),
    confidence: 90,
    scores: { levenshtein: 90, keyword: 90, structure: 90 },
    status: 'auto',
  };
}

describe('detectLoops', () => {
  it('detects a simple loop', () => {
    const mappings = [
      makeMapping('m1', '/a', '/b'),
      makeMapping('m2', '/b', '/a'),
    ];
    const issues = detectLoops(mappings);
    expect(issues.length).toBeGreaterThan(0);
    expect(issues[0].type).toBe('loop');
    expect(issues[0].severity).toBe('error');
  });

  it('returns empty for no loops', () => {
    const mappings = [
      makeMapping('m1', '/a', '/b'),
      makeMapping('m2', '/c', '/d'),
    ];
    const issues = detectLoops(mappings);
    expect(issues).toHaveLength(0);
  });
});
