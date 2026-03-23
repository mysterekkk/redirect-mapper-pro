import type { RedirectMapping } from '@/types/mapping';
import type { ValidationIssue } from '@/types/validation';

/**
 * Detect duplicate source URLs and self-redirects.
 */
export function detectDuplicates(mappings: RedirectMapping[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const sourceMap = new Map<string, string[]>();

  for (const mapping of mappings) {
    if (mapping.status === 'rejected') continue;
    const source = mapping.oldUrl.normalizedUrl;

    if (!sourceMap.has(source)) {
      sourceMap.set(source, []);
    }
    sourceMap.get(source)!.push(mapping.id);

    // Check for self-redirect
    if (mapping.newUrl) {
      const target = mapping.manualNewUrl || mapping.newUrl.normalizedUrl;
      if (source === target) {
        issues.push({
          type: 'self-redirect',
          severity: 'error',
          message: `Self-redirect: ${source} redirects to itself`,
          affectedMappings: [mapping.id],
        });
      }
    }
  }

  // Check for duplicates
  for (const [source, mappingIds] of sourceMap) {
    if (mappingIds.length > 1) {
      issues.push({
        type: 'duplicate',
        severity: 'error',
        message: `Duplicate source URL: ${source} appears in ${mappingIds.length} rules`,
        affectedMappings: mappingIds,
      });
    }
  }

  return issues;
}
