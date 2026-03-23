import { distance } from 'fastest-levenshtein';

/**
 * Compute normalized Levenshtein similarity between two pathnames.
 * Returns a score from 0 to 100 where 100 = identical.
 */
export function levenshteinScore(pathA: string, pathB: string): number {
  if (pathA === pathB) return 100;
  if (!pathA || !pathB) return 0;

  const dist = distance(pathA, pathB);
  const maxLen = Math.max(pathA.length, pathB.length);
  if (maxLen === 0) return 100;

  return Math.round((1 - dist / maxLen) * 100);
}
