export type IssueSeverity = 'error' | 'warning' | 'info';
export type IssueType = 'loop' | 'chain' | 'duplicate' | 'self-redirect';

export interface ValidationIssue {
  type: IssueType;
  severity: IssueSeverity;
  message: string;
  affectedMappings: string[];
  details?: string;
}
