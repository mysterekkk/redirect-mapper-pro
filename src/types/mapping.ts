import type { UrlEntry } from './url';

export interface RedirectMapping {
  id: string;
  oldUrl: UrlEntry;
  newUrl: UrlEntry | null;
  confidence: number;
  scores: {
    levenshtein: number;
    keyword: number;
    structure: number;
  };
  status: 'auto' | 'confirmed' | 'rejected' | 'manual';
  manualNewUrl?: string;
}

export interface OrphanUrl {
  url: UrlEntry;
  side: 'old' | 'new';
}
