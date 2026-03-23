import { describe, it, expect } from 'vitest';
import { levenshteinScore } from '@/lib/matching/levenshtein';

describe('levenshteinScore', () => {
  it('returns 100 for identical strings', () => {
    expect(levenshteinScore('/blog/post-one', '/blog/post-one')).toBe(100);
  });

  it('returns 0 for empty input', () => {
    expect(levenshteinScore('', '/blog')).toBe(0);
    expect(levenshteinScore('/blog', '')).toBe(0);
  });

  it('returns high score for similar paths', () => {
    const score = levenshteinScore('/blog/my-post', '/blog/my-post-updated');
    expect(score).toBeGreaterThan(60);
  });

  it('returns low score for very different paths', () => {
    const score = levenshteinScore('/about', '/products/electronics/laptop');
    expect(score).toBeLessThan(30);
  });

  it('is case-independent when inputs are already normalized', () => {
    const score = levenshteinScore('/blog/post', '/blog/post');
    expect(score).toBe(100);
  });
});
