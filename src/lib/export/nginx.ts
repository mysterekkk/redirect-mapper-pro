import type { RedirectMapping } from '@/types/mapping';
import type { ExportOptions } from '@/types/export';

export function generateNginx(mappings: RedirectMapping[], options: ExportOptions): string {
  const active = mappings.filter(m => m.status !== 'rejected' && m.newUrl);
  const lines: string[] = [];

  if (options.includeComments !== false) {
    lines.push('# Redirect Mapper Pro - Generated nginx redirects');
    lines.push(`# Generated: ${new Date().toISOString().split('T')[0]}`);
    lines.push(`# Total rules: ${active.length}`);
    lines.push('# Place inside your server { } block');
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
        const escapedPath = m.oldUrl.pathname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        lines.push(`rewrite ^${escapedPath}$ ${target} permanent;`);
      }
      lines.push('');
    }
  } else {
    for (const m of active) {
      const target = m.manualNewUrl || m.newUrl!.normalizedUrl;
      const escapedPath = m.oldUrl.pathname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      lines.push(`rewrite ^${escapedPath}$ ${target} permanent;`);
    }
  }

  return lines.join('\n').trim() + '\n';
}
