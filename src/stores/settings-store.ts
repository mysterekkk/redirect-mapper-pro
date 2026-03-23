import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PlatformType, ExportFormat } from '@/types/export';
import type { MatchWeights } from '@/lib/matching/types';
import { DEFAULT_WEIGHTS, DEFAULT_CONFIDENCE_THRESHOLD } from '@/lib/matching/types';

interface SettingsStore {
  weights: MatchWeights;
  confidenceThreshold: number;
  platform: PlatformType | null;
  domain: string;
  exportFormat: ExportFormat;
  includeComments: boolean;
  groupByType: boolean;

  setWeights: (weights: Partial<MatchWeights>) => void;
  setConfidenceThreshold: (threshold: number) => void;
  setPlatform: (platform: PlatformType | null) => void;
  setDomain: (domain: string) => void;
  setExportFormat: (format: ExportFormat) => void;
  setIncludeComments: (include: boolean) => void;
  setGroupByType: (group: boolean) => void;
  resetDefaults: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      weights: { ...DEFAULT_WEIGHTS },
      confidenceThreshold: DEFAULT_CONFIDENCE_THRESHOLD,
      platform: null,
      domain: '',
      exportFormat: 'htaccess' as ExportFormat,
      includeComments: true,
      groupByType: true,

      setWeights: (weights) =>
        set((state) => ({
          weights: { ...state.weights, ...weights },
        })),

      setConfidenceThreshold: (threshold) =>
        set({ confidenceThreshold: threshold }),

      setPlatform: (platform) => set({ platform }),
      setDomain: (domain) => set({ domain }),
      setExportFormat: (format) => set({ exportFormat: format }),
      setIncludeComments: (include) => set({ includeComments: include }),
      setGroupByType: (group) => set({ groupByType: group }),

      resetDefaults: () =>
        set({
          weights: { ...DEFAULT_WEIGHTS },
          confidenceThreshold: DEFAULT_CONFIDENCE_THRESHOLD,
          platform: null,
          domain: '',
          exportFormat: 'htaccess',
          includeComments: true,
          groupByType: true,
        }),
    }),
    { name: 'redirect-mapper-settings' },
  ),
);
