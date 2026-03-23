/**
 * Analyze URL structure similarity based on depth, group, and domain.
 * Returns a score from 0 to 100.
 */
export function structureScore(
  depthA: number,
  depthB: number,
  groupA: string | undefined,
  groupB: string | undefined,
  domainA: string | null,
  domainB: string | null,
): number {
  let score = 0;

  // Depth similarity (max 40 points)
  const maxDepth = Math.max(depthA, depthB, 1);
  const depthDiff = Math.abs(depthA - depthB);
  score += Math.round((1 - depthDiff / maxDepth) * 40);

  // Group match (max 40 points)
  if (groupA && groupB && groupA === groupB) {
    score += 40;
  } else if (!groupA && !groupB) {
    score += 20;
  }

  // Domain match (max 20 points)
  if (domainA && domainB && domainA === domainB) {
    score += 20;
  } else if (!domainA || !domainB) {
    score += 10;
  }

  return Math.min(100, score);
}

export function getUrlDepth(pathname: string): number {
  return pathname.split('/').filter(Boolean).length;
}
