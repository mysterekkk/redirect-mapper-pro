import type { RedirectMapping } from '@/types/mapping';
import type { ValidationIssue } from '@/types/validation';

/**
 * Detect redirect chains (A→B→C) and suggest collapsing.
 */
export function detectChains(mappings: RedirectMapping[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Build source→target map
  const targetMap = new Map<string, { target: string; mappingId: string }>();

  for (const mapping of mappings) {
    if (mapping.status === 'rejected' || !mapping.newUrl) continue;
    const target = mapping.manualNewUrl || mapping.newUrl.normalizedUrl;
    targetMap.set(mapping.oldUrl.normalizedUrl, { target, mappingId: mapping.id });
  }

  // Check each mapping's target to see if it's also a source
  for (const mapping of mappings) {
    if (mapping.status === 'rejected' || !mapping.newUrl) continue;
    const target = mapping.manualNewUrl || mapping.newUrl.normalizedUrl;
    const nextHop = targetMap.get(target);

    if (nextHop) {
      // Chain detected: mapping.source → target → nextHop.target
      const chain = [mapping.oldUrl.normalizedUrl, target, nextHop.target];
      const chainMappings = [mapping.id, nextHop.mappingId];

      // Follow the chain further
      let current = nextHop.target;
      const visited = new Set(chain);
      while (targetMap.has(current) && !visited.has(targetMap.get(current)!.target)) {
        const next = targetMap.get(current)!;
        chain.push(next.target);
        chainMappings.push(next.mappingId);
        visited.add(next.target);
        current = next.target;
      }

      issues.push({
        type: 'chain',
        severity: 'warning',
        message: `Redirect chain: ${chain.join(' → ')}`,
        affectedMappings: chainMappings,
        details: `Consider redirecting directly to ${chain[chain.length - 1]}`,
      });
    }
  }

  return issues;
}
