'use client';

import { Badge } from '@/components/ui/badge';
import { getConfidenceLevel } from '@/lib/matching/composite';

interface ConfidenceBadgeProps {
  score: number;
}

export function ConfidenceBadge({ score }: ConfidenceBadgeProps) {
  const level = getConfidenceLevel(score);

  const variant = level === 'high' ? 'success' : level === 'medium' ? 'warning' : 'destructive';
  const label = level === 'high' ? 'High' : level === 'medium' ? 'Medium' : 'Low';

  return (
    <Badge variant={variant}>
      {score}% {label}
    </Badge>
  );
}
