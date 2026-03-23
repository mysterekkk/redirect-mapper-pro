'use client';

import { useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUrlStore } from '@/stores/url-store';
import { useMappingStore } from '@/stores/mapping-store';
import { useSettingsStore } from '@/stores/settings-store';
import { parseCsvFile } from '@/lib/parsers/csv-parser';
import { parseSitemapXml } from '@/lib/parsers/sitemap-parser';
import { Upload, ArrowRightLeft, Trash2 } from 'lucide-react';

export function UrlInputPanel() {
  const {
    oldUrlsRaw, newUrlsRaw, setOldUrlsRaw, setNewUrlsRaw,
    addOldUrls, addNewUrls, parseAndGroup, clearAll, oldUrls, newUrls,
  } = useUrlStore();
  const { runMatching, clearMappings, isProcessing } = useMappingStore();
  const { weights, confidenceThreshold } = useSettingsStore();

  const oldFileRef = useRef<HTMLInputElement>(null);
  const newFileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    (file: File, source: 'old' | 'new') => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        let entries;

        if (file.name.endsWith('.xml')) {
          entries = parseSitemapXml(content, source);
        } else {
          entries = parseCsvFile(content, source);
        }

        if (source === 'old') addOldUrls(entries);
        else addNewUrls(entries);
      };
      reader.readAsText(file);
    },
    [addOldUrls, addNewUrls],
  );

  const handleMatch = useCallback(() => {
    parseAndGroup();
    const state = useUrlStore.getState();
    runMatching(state.oldUrls, state.newUrls, weights, confidenceThreshold);
  }, [parseAndGroup, runMatching, weights, confidenceThreshold]);

  const handleClear = useCallback(() => {
    clearAll();
    clearMappings();
  }, [clearAll, clearMappings]);

  const oldCount = oldUrlsRaw.split('\n').filter(l => l.trim()).length + oldUrls.filter(u => !oldUrlsRaw.includes(u.originalUrl)).length;
  const newCount = newUrlsRaw.split('\n').filter(l => l.trim()).length + newUrls.filter(u => !newUrlsRaw.includes(u.originalUrl)).length;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Old URLs (Source)</CardTitle>
          <CardDescription>
            Paste or upload the URLs from your old site
            {oldCount > 0 && <span className="ml-2 font-medium text-foreground">({oldCount} URLs)</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Paste URLs, one per line...&#10;/old-page-one&#10;/blog/old-post&#10;https://old-site.com/page"
            className="min-h-[200px] font-mono text-sm"
            value={oldUrlsRaw}
            onChange={(e) => setOldUrlsRaw(e.target.value)}
          />
          <input
            ref={oldFileRef}
            type="file"
            accept=".csv,.txt,.xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, 'old');
              e.target.value = '';
            }}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => oldFileRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV / Sitemap
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">New URLs (Target)</CardTitle>
          <CardDescription>
            Paste or upload the URLs from your new site
            {newCount > 0 && <span className="ml-2 font-medium text-foreground">({newCount} URLs)</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Paste URLs, one per line...&#10;/new-page-one&#10;/blog/new-post&#10;https://new-site.com/page"
            className="min-h-[200px] font-mono text-sm"
            value={newUrlsRaw}
            onChange={(e) => setNewUrlsRaw(e.target.value)}
          />
          <input
            ref={newFileRef}
            type="file"
            accept=".csv,.txt,.xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, 'new');
              e.target.value = '';
            }}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => newFileRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV / Sitemap
          </Button>
        </CardContent>
      </Card>

      <div className="md:col-span-2 flex gap-3 justify-center">
        <Button
          size="lg"
          onClick={handleMatch}
          disabled={isProcessing || (!oldUrlsRaw.trim() && oldUrls.length === 0)}
        >
          <ArrowRightLeft className="mr-2 h-5 w-5" />
          {isProcessing ? 'Matching...' : 'Match URLs'}
        </Button>
        <Button variant="outline" size="lg" onClick={handleClear}>
          <Trash2 className="mr-2 h-5 w-5" />
          Clear All
        </Button>
      </div>
    </div>
  );
}
