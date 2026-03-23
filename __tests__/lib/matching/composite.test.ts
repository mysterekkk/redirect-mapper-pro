import { describe, it, expect } from 'vitest';
import { compositeScore, getConfidenceLevel } from '@/lib/matching/composite';
import { DEFAULT_WEIGHTS } from '@/lib/matching/types';

describe('compositeScore', () => {
  it('computes weighted average', () => {
    const score = compositeScore(
      { levenshtein: 100, keyword: 100, structure: 100 },
      DEFAULT_WEIGHTS,
    );
    expect(score).toBe(100);
  });

  it('returns 0 for all-zero scores', () => {
    expect(compositeScore(
      { levenshtein: 0, keyword: 0, structure: 0 },
      DEFAULT_WEIGHTS,
    )).toBe(0);
  });

  it('respects weights', () => {
    const score = compositeScore(
      { levenshtein: 100, keyword: 0, structure: 0 },
      { levenshtein: 1, keyword: 0, structure: 0 },
    );
    expect(score).toBe(100);
  });

  it('clamps to 0-100', () => {
    expect(compositeScore(
      { levenshtein: 200, keyword: 200, structure: 200 },
      DEFAULT_WEIGHTS,
    )).toBe(100);
  });
});

describe('getConfidenceLevel', () => {
  it('returns high for >= 80', () => {
    expect(getConfidenceLevel(80)).toBe('high');
    expect(getConfidenceLevel(100)).toBe('high');
  });

  it('returns medium for 50-79', () => {
    expect(getConfidenceLevel(50)).toBe('medium');
    expect(getConfidenceLevel(79)).toBe('medium');
  });

  it('returns low for < 50', () => {
    expect(getConfidenceLevel(0)).toBe('low');
    expect(getConfidenceLevel(49)).toBe('low');
  });
});
