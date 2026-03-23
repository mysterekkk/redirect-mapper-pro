import { create } from 'zustand';
import type { RedirectMapping, OrphanUrl } from '@/types/mapping';
import type { ValidationIssue } from '@/types/validation';
import type { MatchWeights } from '@/lib/matching/types';
import { DEFAULT_WEIGHTS, DEFAULT_CONFIDENCE_THRESHOLD } from '@/lib/matching/types';
import { matchUrls } from '@/lib/matching';
import { validateMappings } from '@/lib/validation';
import type { UrlEntry } from '@/types/url';

interface MappingStore {
  mappings: RedirectMapping[];
  orphans: OrphanUrl[];
  validationIssues: ValidationIssue[];
  isProcessing: boolean;
  progress: number;

  runMatching: (
    oldUrls: UrlEntry[],
    newUrls: UrlEntry[],
    weights?: MatchWeights,
    threshold?: number,
  ) => void;
  confirmMapping: (id: string) => void;
  rejectMapping: (id: string) => void;
  setManualTarget: (id: string, newUrl: string) => void;
  clearMappings: () => void;
}

export const useMappingStore = create<MappingStore>()((set, get) => ({
  mappings: [],
  orphans: [],
  validationIssues: [],
  isProcessing: false,
  progress: 0,

  runMatching: (oldUrls, newUrls, weights = DEFAULT_WEIGHTS, threshold = DEFAULT_CONFIDENCE_THRESHOLD) => {
    set({ isProcessing: true, progress: 0 });

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const result = matchUrls(oldUrls, newUrls, weights, threshold, (percent) => {
        set({ progress: percent });
      });

      const issues = validateMappings(result.mappings);

      set({
        mappings: result.mappings,
        orphans: result.orphans,
        validationIssues: issues,
        isProcessing: false,
        progress: 100,
      });
    }, 0);
  },

  confirmMapping: (id) =>
    set((state) => ({
      mappings: state.mappings.map((m) =>
        m.id === id ? { ...m, status: 'confirmed' as const } : m,
      ),
    })),

  rejectMapping: (id) => {
    set((state) => {
      const updated = state.mappings.map((m) =>
        m.id === id ? { ...m, status: 'rejected' as const } : m,
      );
      return {
        mappings: updated,
        validationIssues: validateMappings(updated),
      };
    });
  },

  setManualTarget: (id, newUrl) =>
    set((state) => {
      const updated = state.mappings.map((m) =>
        m.id === id ? { ...m, manualNewUrl: newUrl, status: 'manual' as const } : m,
      );
      return {
        mappings: updated,
        validationIssues: validateMappings(updated),
      };
    }),

  clearMappings: () =>
    set({
      mappings: [],
      orphans: [],
      validationIssues: [],
      isProcessing: false,
      progress: 0,
    }),
}));
