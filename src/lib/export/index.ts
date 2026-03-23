import type { RedirectMapping } from '@/types/mapping';
import type { ExportOptions, ExportFormat } from '@/types/export';
import { generateHtaccess } from './htaccess';
import { generateNginx } from './nginx';
import { generateCloudflare } from './cloudflare';
import { generateCsv } from './csv';
import { generateJson } from './json';

const FORMAT_CONFIG: Record<ExportFormat, { extension: string; mimeType: string }> = {
  htaccess: { extension: '.htaccess', mimeType: 'text/plain' },
  nginx: { extension: 'nginx.conf', mimeType: 'text/plain' },
  cloudflare: { extension: 'cloudflare-redirects.csv', mimeType: 'text/csv' },
  csv: { extension: 'redirects.csv', mimeType: 'text/csv' },
  json: { extension: 'redirects.json', mimeType: 'application/json' },
};

export function exportMappings(
  mappings: RedirectMapping[],
  options: ExportOptions,
): { content: string; filename: string; mimeType: string } {
  let content: string;

  switch (options.format) {
    case 'htaccess':
      content = generateHtaccess(mappings, options);
      break;
    case 'nginx':
      content = generateNginx(mappings, options);
      break;
    case 'cloudflare':
      content = generateCloudflare(mappings, options);
      break;
    case 'csv':
      content = generateCsv(mappings);
      break;
    case 'json':
      content = generateJson(mappings);
      break;
    default:
      throw new Error(`Unsupported export format: ${options.format}`);
  }

  const config = FORMAT_CONFIG[options.format];
  return {
    content,
    filename: config.extension,
    mimeType: config.mimeType,
  };
}
