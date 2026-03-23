import { describe, it, expect } from 'vitest';
import { generateHtaccess } from '@/lib/export/htaccess';
import type { RedirectMapping } from '@/types/mapping';
import type { UrlEntry } from '@/types/url';

function makeMapping(oldPath: string, newPath: string, group = 'other'): RedirectMapping {
  const oldUrl: UrlEntry = {
    id: 'old-1',
    originalUrl: oldPath,
    normalizedUrl: oldPath,
    pathname: oldPath,
    slug: oldPath.split('/').pop() || '',
    tokens: oldPath.split('/').filter(Boolean),
    source: 'old',
    group,
  };
  const newUrl: UrlEntry = {
    id: 'new-1',
    originalUrl: newPath,
    normalizedUrl: newPath,
    pathname: newPath,
    slug: newPath.split('/').pop() || '',
    tokens: newPath.split('/').filter(Boolean),
    source: 'new',
  };
  return {
    id: 'mapping-1',
    oldUrl,
    newUrl,
    confidence: 90,
    scores: { levenshtein: 90, keyword: 90, structure: 90 },
    status: 'auto',
  };
}

describe('generateHtaccess', () => {
  it('generates valid Redirect 301 rules', () => {
    const mappings = [makeMapping('/old-page', '/new-page')];
    const output = generateHtaccess(mappings, { format: 'htaccess' });

    expect(output).toContain('Redirect 301 /old-page /new-page');
    expect(output).toContain('RewriteEngine On');
  });

  it('excludes rejected mappings', () => {
    const mappings = [
      { ...makeMapping('/old-page', '/new-page'), status: 'rejected' as const },
    ];
    const output = generateHtaccess(mappings, { format: 'htaccess', includeComments: false });
    expect(output).not.toContain('/old-page');
  });

  it('omits comments when includeComments is false', () => {
    const mappings = [makeMapping('/old', '/new')];
    const output = generateHtaccess(mappings, { format: 'htaccess', includeComments: false });
    expect(output).not.toContain('#');
  });
});
