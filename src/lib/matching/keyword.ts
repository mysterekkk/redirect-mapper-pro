/**
 * Compute keyword similarity using Jaccard index on URL tokens.
 * Bonus points for exact slug match.
 * Returns a score from 0 to 100.
 */
export function keywordScore(
  tokensA: string[],
  tokensB: string[],
  slugA: string,
  slugB: string,
): number {
  if (tokensA.length === 0 && tokensB.length === 0) return 100;
  if (tokensA.length === 0 || tokensB.length === 0) return 0;

  const setA = new Set(tokensA);
  const setB = new Set(tokensB);

  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) intersection++;
  }

  const union = new Set([...setA, ...setB]).size;
  if (union === 0) return 0;

  let score = (intersection / union) * 100;

  // Bonus for exact slug match
  if (slugA && slugB && slugA === slugB) {
    score = Math.min(100, score + 20);
  }

  return Math.round(score);
}
