export type ExportFormat = 'htaccess' | 'nginx' | 'cloudflare' | 'csv' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  domain?: string;
  includeComments?: boolean;
  groupByType?: boolean;
}

export type PlatformType = 'wordpress' | 'shopify' | 'webflow' | 'framer' | 'custom';
