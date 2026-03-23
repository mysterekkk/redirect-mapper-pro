'use client';

import { useMappingStore } from '@/stores/mapping-store';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export function StatsBar() {
  const { mappings, orphans, validationIssues } = useMappingStore();

  if (mappings.length === 0) return null;

  const total = mappings.length;
  const matched = mappings.filter(m => m.newUrl && m.status !== 'rejected').length;
  const highConf = mappings.filter(m => m.confidence >= 80).length;
  const avgConf = total > 0
    ? Math.round(mappings.reduce((sum, m) => sum + m.confidence, 0) / total)
    : 0;

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-4">
      <Card>
        <CardContent className="flex items-center gap-2 p-4">
          <ArrowRight className="h-5 w-5 text-primary" />
          <div>
            <p className="text-2xl font-bold">{matched}/{total}</p>
            <p className="text-xs text-muted-foreground">Matched</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-2 p-4">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div>
            <p className="text-2xl font-bold">{highConf}</p>
            <p className="text-xs text-muted-foreground">High confidence</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-2 p-4">
          <XCircle className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-2xl font-bold">{orphans.length}</p>
            <p className="text-xs text-muted-foreground">Orphans</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-2 p-4">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <div>
            <p className="text-2xl font-bold">{avgConf}%</p>
            <p className="text-xs text-muted-foreground">Avg confidence</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
