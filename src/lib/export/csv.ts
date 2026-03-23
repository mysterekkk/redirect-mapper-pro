import type { RedirectMapping } from '@/types/mapping';

function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export function generateCsv(mappings: RedirectMapping[]): string {
  const lines: string[] = [];

  lines.push('old_url,new_url,status_code,confidence,group,status');

  const active = mappings.filter(m => m.status !== 'rejected');

  for (const m of active) {
    const target = m.manualNewUrl || m.newUrl?.normalizedUrl || '';
    lines.push([
      escapeCsvField(m.oldUrl.originalUrl),
      escapeCsvField(target),
      '301',
      String(m.confidence),
      escapeCsvField(m.oldUrl.group || 'other'),
      m.status,
    ].join(','));
  }

  return lines.join('\n') + '\n';
}
