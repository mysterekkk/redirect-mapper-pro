import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UrlEntry } from '@/types/url';
import { parseUrlText } from '@/lib/parsers/url-parser';
import { groupUrls } from '@/lib/grouping';

interface UrlStore {
  oldUrls: UrlEntry[];
  newUrls: UrlEntry[];
  oldUrlsRaw: string;
  newUrlsRaw: string;
  platform: string | undefined;

  setOldUrlsRaw: (text: string) => void;
  setNewUrlsRaw: (text: string) => void;
  addOldUrls: (entries: UrlEntry[]) => void;
  addNewUrls: (entries: UrlEntry[]) => void;
  setPlatform: (platform: string | undefined) => void;
  parseAndGroup: () => void;
  clearAll: () => void;
}

export const useUrlStore = create<UrlStore>()(
  persist(
    (set, get) => ({
      oldUrls: [],
      newUrls: [],
      oldUrlsRaw: '',
      newUrlsRaw: '',
      platform: undefined,

      setOldUrlsRaw: (text) => set({ oldUrlsRaw: text }),
      setNewUrlsRaw: (text) => set({ newUrlsRaw: text }),

      addOldUrls: (entries) =>
        set((state) => ({ oldUrls: [...state.oldUrls, ...entries] })),

      addNewUrls: (entries) =>
        set((state) => ({ newUrls: [...state.newUrls, ...entries] })),

      setPlatform: (platform) => set({ platform }),

      parseAndGroup: () => {
        const state = get();
        let oldUrls = parseUrlText(state.oldUrlsRaw, 'old');
        let newUrls = parseUrlText(state.newUrlsRaw, 'new');

        // Add file-imported URLs
        oldUrls = [...oldUrls, ...state.oldUrls.filter(u => !oldUrls.some(o => o.originalUrl === u.originalUrl))];
        newUrls = [...newUrls, ...state.newUrls.filter(u => !newUrls.some(n => n.originalUrl === u.originalUrl))];

        // Group
        groupUrls(oldUrls, state.platform);
        groupUrls(newUrls, state.platform);

        set({ oldUrls, newUrls });
      },

      clearAll: () =>
        set({
          oldUrls: [],
          newUrls: [],
          oldUrlsRaw: '',
          newUrlsRaw: '',
        }),
    }),
    {
      name: 'redirect-mapper-urls',
      partialize: (state) => ({
        oldUrlsRaw: state.oldUrlsRaw,
        newUrlsRaw: state.newUrlsRaw,
        platform: state.platform,
      }),
    },
  ),
);
