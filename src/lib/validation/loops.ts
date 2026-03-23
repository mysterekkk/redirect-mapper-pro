import type { RedirectMapping } from '@/types/mapping';
import type { ValidationIssue } from '@/types/validation';

/**
 * Detect redirect loops using DFS cycle detection.
 */
export function detectLoops(mappings: RedirectMapping[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const graph = new Map<string, { target: string; mappingId: string }>();

  for (const mapping of mappings) {
    if (mapping.status === 'rejected' || !mapping.newUrl) continue;
    const source = mapping.manualNewUrl
      ? mapping.oldUrl.normalizedUrl
      : mapping.oldUrl.normalizedUrl;
    const target = mapping.manualNewUrl || mapping.newUrl.normalizedUrl;
    graph.set(source, { target, mappingId: mapping.id });
  }

  const visited = new Set<string>();
  const inStack = new Set<string>();

  for (const [source] of graph) {
    if (visited.has(source)) continue;

    const path: string[] = [];
    const pathMappings: string[] = [];
    let current: string | undefined = source;

    while (current && !visited.has(current)) {
      if (inStack.has(current)) {
        // Found a cycle
        const cycleStart = path.indexOf(current);
        const cyclePath = path.slice(cycleStart);
        const cycleMappings = pathMappings.slice(cycleStart);

        issues.push({
          type: 'loop',
          severity: 'error',
          message: `Redirect loop detected: ${cyclePath.join(' → ')} → ${current}`,
          affectedMappings: cycleMappings,
          details: `${cyclePath.length} redirects form a loop`,
        });
        break;
      }

      inStack.add(current);
      path.push(current);

      const edge = graph.get(current);
      if (edge) {
        pathMappings.push(edge.mappingId);
        current = edge.target;
      } else {
        current = undefined;
      }
    }

    for (const node of path) {
      visited.add(node);
      inStack.delete(node);
    }
  }

  return issues;
}
