import type { RedirectMapping } from '@/types/mapping';
import type { ExportOptions } from '@/types/export';

/**
 * Generate Cloudflare Bulk Redirect CSV format.
 * No header row. Full absolute URLs required.
 * Format: source_url,target_url,status_code,preserve_query_string,include_subdomains,subpath_matching,preserve_path_suffix
 */
export function generateCloudflare(mappings: RedirectMapping[], options: ExportOptions): string {
  const active = mappings.filter(m => m.status !== 'rejected' && m.newUrl);
  const domain = options.domain || 'example.com';
  const lines: string[] = [];

  for (const m of active) {
    const sourcePath = m.oldUrl.pathname;
    const targetPath = m.manualNewUrl || m.newUrl!.normalizedUrl;

    const source = sourcePath.startsWith('http')
      ? sourcePath
      : `https://${domain}${sourcePath}`;
    const target = targetPath.startsWith('http')
      ? targetPath
      : `https://${domain}${targetPath}`;

    lines.push(`${source},${target},301,,,,`);
  }

  return lines.join('\n') + '\n';
}
