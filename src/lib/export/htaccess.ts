import type { RedirectMapping } from '@/types/mapping';
import type { ExportOptions } from '@/types/export';

export function generateHtaccess(mappings: RedirectMapping[], options: ExportOptions): string {
  const active = mappings.filter(m => m.status !== 'rejected' && m.newUrl);
  const lines: string[] = [];

  if (options.includeComments !== false) {
    lines.push('# Redirect Mapper Pro - Generated .htaccess redirects');
    lines.push(`# Generated: ${new Date().toISOString().split('T')[0]}`);
    lines.push(`# Total rules: ${active.length}`);
    lines.push('# https://github.com/LuroWeb/redirect-mapper-pro');
    lines.push('');
    lines.push('RewriteEngine On');
    lines.push('');
  }

  if (options.groupByType !== false) {
    const groups = new Map<string, RedirectMapping[]>();
    for (const m of active) {
      const group = m.oldUrl.group || 'other';
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group)!.push(m);
    }

    for (const [group, groupMappings] of groups) {
      if (options.includeComments !== false) {
        lines.push(`# ${group} redirects`);
      }
      for (const m of groupMappings) {
        const target = m.manualNewUrl || m.newUrl!.normalizedUrl;
        lines.push(`Redirect 301 ${m.oldUrl.pathname} ${target}`);
      }
      lines.push('');
    }
  } else {
    for (const m of active) {
      const target = m.manualNewUrl || m.newUrl!.normalizedUrl;
      lines.push(`Redirect 301 ${m.oldUrl.pathname} ${target}`);
    }
  }

  return lines.join('\n').trim() + '\n';
}
