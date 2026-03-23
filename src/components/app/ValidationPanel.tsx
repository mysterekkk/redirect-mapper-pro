'use client';

import { useMappingStore } from '@/stores/mapping-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, XCircle, Info } from 'lucide-react';

const ICON_MAP = {
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const SEVERITY_VARIANT = {
  error: 'destructive' as const,
  warning: 'warning' as const,
  info: 'secondary' as const,
};

export function ValidationPanel() {
  const { validationIssues } = useMappingStore();

  if (validationIssues.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg">Validation Issues ({validationIssues.length})</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {validationIssues.map((issue, i) => {
            const Icon = ICON_MAP[issue.severity];
            return (
              <li key={i} className="flex items-start gap-2">
                <Icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={SEVERITY_VARIANT[issue.severity]} className="text-xs">
                      {issue.type}
                    </Badge>
                    <span className="text-sm">{issue.message}</span>
                  </div>
                  {issue.details && (
                    <p className="text-xs text-muted-foreground mt-1">{issue.details}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
