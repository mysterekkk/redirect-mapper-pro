import type { MatchScores, MatchWeights } from './types';
import { DEFAULT_WEIGHTS } from './types';

/**
 * Compute weighted composite confidence score from individual signal scores.
 * Returns a score from 0 to 100.
 */
export function compositeScore(
  scores: MatchScores,
  weights: MatchWeights = DEFAULT_WEIGHTS,
): number {
  const total =
    scores.levenshtein * weights.levenshtein +
    scores.keyword * weights.keyword +
    scores.structure * weights.structure;

  return Math.round(Math.min(100, Math.max(0, total)));
}

export function getConfidenceLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 80) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}
