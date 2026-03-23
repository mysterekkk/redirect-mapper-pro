import { nanoid } from 'nanoid';
import type { UrlEntry } from '@/types/url';
import type { RedirectMapping, OrphanUrl } from '@/types/mapping';
import type { MatchWeights, ScoredPair } from './types';
import { DEFAULT_WEIGHTS, DEFAULT_CONFIDENCE_THRESHOLD } from './types';
import { levenshteinScore } from './levenshtein';
import { keywordScore } from './keyword';
import { structureScore, getUrlDepth } from './structure';
import { compositeScore } from './composite';
import { extractDomain } from '@/lib/url-utils';

export interface MatchResult {
  mappings: RedirectMapping[];
  orphans: OrphanUrl[];
}

/**
 * Match old URLs to new URLs using composite scoring.
 * Uses greedy best-match assignment.
 */
export function matchUrls(
  oldUrls: UrlEntry[],
  newUrls: UrlEntry[],
  weights: MatchWeights = DEFAULT_WEIGHTS,
  threshold: number = DEFAULT_CONFIDENCE_THRESHOLD,
  onProgress?: (percent: number) => void,
): MatchResult {
  if (oldUrls.length === 0) {
    return {
      mappings: [],
      orphans: newUrls.map(url => ({ url, side: 'new' as const })),
    };
  }

  if (newUrls.length === 0) {
    return {
      mappings: oldUrls.map(oldUrl => ({
        id: nanoid(),
        oldUrl,
        newUrl: null,
        confidence: 0,
        scores: { levenshtein: 0, keyword: 0, structure: 0 },
        status: 'auto' as const,
      })),
      orphans: [],
    };
  }

  // Compute all pairwise scores
  const scoredPairs: ScoredPair[] = [];
  const totalPairs = oldUrls.length * newUrls.length;
  let computed = 0;

  for (const oldUrl of oldUrls) {
    const oldDomain = extractDomain(oldUrl.originalUrl);
    const oldDepth = getUrlDepth(oldUrl.pathname);

    for (const newUrl of newUrls) {
      const newDomain = extractDomain(newUrl.originalUrl);
      const newDepth = getUrlDepth(newUrl.pathname);

      const scores = {
        levenshtein: levenshteinScore(oldUrl.pathname, newUrl.pathname),
        keyword: keywordScore(oldUrl.tokens, newUrl.tokens, oldUrl.slug, newUrl.slug),
        structure: structureScore(oldDepth, newDepth, oldUrl.group, newUrl.group, oldDomain, newDomain),
      };

      const composite = compositeScore(scores, weights);

      if (composite >= threshold) {
        scoredPairs.push({
          oldUrlId: oldUrl.id,
          newUrlId: newUrl.id,
          scores,
          composite,
        });
      }

      computed++;
      if (onProgress && computed % 100 === 0) {
        onProgress(Math.round((computed / totalPairs) * 100));
      }
    }
  }

  // Sort by composite score descending
  scoredPairs.sort((a, b) => b.composite - a.composite);

  // Greedy best-match assignment
  const assignedOld = new Set<string>();
  const assignedNew = new Set<string>();
  const assignments = new Map<string, ScoredPair>();

  for (const pair of scoredPairs) {
    if (assignedOld.has(pair.oldUrlId) || assignedNew.has(pair.newUrlId)) continue;
    assignments.set(pair.oldUrlId, pair);
    assignedOld.add(pair.oldUrlId);
    assignedNew.add(pair.newUrlId);
  }

  // Build result
  const oldUrlMap = new Map(oldUrls.map(u => [u.id, u]));
  const newUrlMap = new Map(newUrls.map(u => [u.id, u]));

  const mappings: RedirectMapping[] = oldUrls.map(oldUrl => {
    const assignment = assignments.get(oldUrl.id);
    if (assignment) {
      return {
        id: nanoid(),
        oldUrl,
        newUrl: newUrlMap.get(assignment.newUrlId)!,
        confidence: assignment.composite,
        scores: assignment.scores,
        status: 'auto' as const,
      };
    }
    return {
      id: nanoid(),
      oldUrl,
      newUrl: null,
      confidence: 0,
      scores: { levenshtein: 0, keyword: 0, structure: 0 },
      status: 'auto' as const,
    };
  });

  const orphans: OrphanUrl[] = [];

  // Old URLs without matches (confidence 0)
  for (const mapping of mappings) {
    if (!mapping.newUrl) {
      orphans.push({ url: mapping.oldUrl, side: 'old' });
    }
  }

  // New URLs not assigned
  for (const newUrl of newUrls) {
    if (!assignedNew.has(newUrl.id)) {
      orphans.push({ url: newUrl, side: 'new' });
    }
  }

  if (onProgress) onProgress(100);

  return { mappings, orphans };
}
