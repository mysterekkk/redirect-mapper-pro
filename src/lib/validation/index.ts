import type { RedirectMapping } from '@/types/mapping';
import type { ValidationIssue } from '@/types/validation';
import { detectLoops } from './loops';
import { detectChains } from './chains';
import { detectDuplicates } from './duplicates';

export function validateMappings(mappings: RedirectMapping[]): ValidationIssue[] {
  const activeMappings = mappings.filter(m => m.status !== 'rejected');

  return [
    ...detectLoops(activeMappings),
    ...detectChains(activeMappings),
    ...detectDuplicates(activeMappings),
  ];
}
