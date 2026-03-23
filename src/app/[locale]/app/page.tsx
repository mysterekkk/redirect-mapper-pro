'use client';

import { useTranslations } from 'next-intl';
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
  const t = useTranslations('app');
  const { isProcessing, progress, mappings } = useMappingStore();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6 max-w-6xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold">{t('title')}</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t('pastePlaceholder')}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">{t('platform')}</p>
        <PlatformPresetSelector />
      </div>

      <UrlInputPanel />

      {isProcessing && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{t('matching')}</p>
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
