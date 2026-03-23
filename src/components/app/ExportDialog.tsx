'use client';

import { useState } from 'react';
import { useMappingStore } from '@/stores/mapping-store';
import { useSettingsStore } from '@/stores/settings-store';
import { exportMappings } from '@/lib/export';
import { downloadFile } from '@/lib/download';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { ExportFormat } from '@/types/export';
import { Download, FileCode, Server, Cloud, FileSpreadsheet, FileJson } from 'lucide-react';

const FORMAT_OPTIONS: { id: ExportFormat; label: string; icon: typeof FileCode; desc: string }[] = [
  { id: 'htaccess', label: 'Apache .htaccess', icon: FileCode, desc: 'Redirect 301 rules for Apache servers' },
  { id: 'nginx', label: 'nginx conf', icon: Server, desc: 'Rewrite rules for nginx servers' },
  { id: 'cloudflare', label: 'Cloudflare CSV', icon: Cloud, desc: 'Bulk redirect CSV for Cloudflare' },
  { id: 'csv', label: 'Generic CSV', icon: FileSpreadsheet, desc: 'CSV with confidence scores and groups' },
  { id: 'json', label: 'JSON', icon: FileJson, desc: 'Full mapping data as JSON' },
];

export function ExportPanel() {
  const { mappings } = useMappingStore();
  const { exportFormat, setExportFormat, domain, setDomain, includeComments, groupByType } = useSettingsStore();
  const [showDomainInput, setShowDomainInput] = useState(false);

  const activeMappings = mappings.filter(m => m.status !== 'rejected' && m.newUrl);

  if (mappings.length === 0) return null;

  const handleExport = () => {
    if (exportFormat === 'cloudflare' && !domain) {
      setShowDomainInput(true);
      return;
    }

    const result = exportMappings(mappings, {
      format: exportFormat,
      domain,
      includeComments,
      groupByType,
    });

    downloadFile(result.content, result.filename, result.mimeType);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Export Redirects</CardTitle>
        <CardDescription>
          {activeMappings.length} rules ready for export
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {FORMAT_OPTIONS.map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-accent ${
                exportFormat === id ? 'border-primary bg-accent' : 'border-border'
              }`}
              onClick={() => setExportFormat(id)}
            >
              <Icon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </button>
          ))}
        </div>

        {(showDomainInput || exportFormat === 'cloudflare') && (
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter domain (e.g., example.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="max-w-sm"
            />
          </div>
        )}

        <Button onClick={handleExport} disabled={activeMappings.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Download {FORMAT_OPTIONS.find(f => f.id === exportFormat)?.label}
        </Button>
      </CardContent>
    </Card>
  );
}
