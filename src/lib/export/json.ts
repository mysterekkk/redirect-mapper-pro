import type { RedirectMapping } from '@/types/mapping';

export function generateJson(mappings: RedirectMapping[]): string {
  const active = mappings.filter(m => m.status !== 'rejected');

  const data = active.map(m => ({
    source: m.oldUrl.originalUrl,
    target: m.manualNewUrl || m.newUrl?.normalizedUrl || null,
    statusCode: 301,
    confidence: m.confidence,
    scores: m.scores,
    group: m.oldUrl.group || 'other',
    status: m.status,
  }));

  return JSON.stringify(data, null, 2) + '\n';
}
