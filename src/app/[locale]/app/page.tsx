'use client';

import { UrlInputPanel } from '@/components/app/UrlInputPanel';
import { MappingTable } from '@/components/app/MappingTable';
import { StatsBar } from '@/components/app/StatsBar';
import { OrphanPanel } from '@/components/app/OrphanPanel';
import { ValidationPanel } from '@/components/app/ValidationPanel';
import { ExportPanel } from '@/components/app/ExportDialog';
import { PlatformPresetSelector } from '@/components/app/PlatformPresetSelector';
import { useMappingStore } from '@/stores/mapping-store';
import { Progress } from '@/components/ui/progress';

export default function AppPage() {
  const { isProcessing, progress, mappings } = useMappingStore();

  return (
    <div className="container px-4 py-8 space-y-6 max-w-6xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Redirect Mapper Pro</h1>
        <p className="text-sm text-muted-foreground">
          Paste your old and new URLs, match them intelligently, and export redirect rules.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Platform Preset</p>
        <PlatformPresetSelector />
      </div>

      <UrlInputPanel />

      {isProcessing && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Matching URLs...</p>
          <Progress value={progress} />
        </div>
      )}

      {mappings.length > 0 && (
        <>
          <StatsBar />
          <ValidationPanel />
          <MappingTable />
          <OrphanPanel />
          <ExportPanel />
        </>
      )}
    </div>
  );
}
