export interface MatchScores {
  levenshtein: number;
  keyword: number;
  structure: number;
}

export interface ScoredPair {
  oldUrlId: string;
  newUrlId: string;
  scores: MatchScores;
  composite: number;
}

export interface MatchWeights {
  levenshtein: number;
  keyword: number;
  structure: number;
}

export const DEFAULT_WEIGHTS: MatchWeights = {
  levenshtein: 0.40,
  keyword: 0.35,
  structure: 0.25,
};

export const DEFAULT_CONFIDENCE_THRESHOLD = 30;
