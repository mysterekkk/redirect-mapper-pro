'use client';

import { useSettingsStore } from '@/stores/settings-store';
import { PLATFORM_PRESETS } from '@/lib/platforms';
import type { PlatformType } from '@/types/export';

export function PlatformPresetSelector() {
  const { platform, setPlatform } = useSettingsStore();

  return (
    <div className="flex flex-wrap gap-2">
      {PLATFORM_PRESETS.map((preset) => (
        <button
          key={preset.id}
          className={`rounded-full border px-3 py-1 text-sm transition-colors hover:bg-accent ${
            platform === preset.id
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border text-muted-foreground'
          }`}
          onClick={() => setPlatform(platform === preset.id ? null : preset.id as PlatformType)}
          title={preset.description}
        >
          {preset.name}
        </button>
      ))}
    </div>
  );
}
