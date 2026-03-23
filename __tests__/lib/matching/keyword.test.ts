import { describe, it, expect } from 'vitest';
import { keywordScore } from '@/lib/matching/keyword';

describe('keywordScore', () => {
  it('returns 100 for identical tokens', () => {
    const tokens = ['blog', 'my', 'post'];
    expect(keywordScore(tokens, tokens, 'post', 'post')).toBe(100);
  });

  it('returns 0 for completely different tokens', () => {
    expect(keywordScore(['blog', 'post'], ['shop', 'item'], 'post', 'item')).toBe(0);
  });

  it('returns partial score for overlapping tokens', () => {
    const score = keywordScore(
      ['blog', 'my', 'great', 'post'],
      ['blog', 'my', 'new', 'post'],
      'post', 'post',
    );
    expect(score).toBeGreaterThan(50);
  });

  it('gives bonus for exact slug match', () => {
    const withoutSlug = keywordScore(['a', 'b'], ['a', 'c'], 'b', 'c');
    const withSlug = keywordScore(['a', 'b'], ['a', 'c'], 'same', 'same');
    expect(withSlug).toBeGreaterThan(withoutSlug);
  });

  it('handles empty arrays', () => {
    expect(keywordScore([], [], '', '')).toBe(100);
    expect(keywordScore(['a'], [], 'a', '')).toBe(0);
  });
});
