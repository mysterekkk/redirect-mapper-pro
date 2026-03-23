'use client';

import { useMappingStore } from '@/stores/mapping-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

export function OrphanPanel() {
  const { orphans } = useMappingStore();

  if (orphans.length === 0) return null;

  const oldOrphans = orphans.filter(o => o.side === 'old');
  const newOrphans = orphans.filter(o => o.side === 'new');

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          <CardTitle className="text-lg">Unmatched URLs ({orphans.length})</CardTitle>
        </div>
        <CardDescription>These URLs could not be automatically matched</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {oldOrphans.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">
              Old URLs without matches
              <Badge variant="secondary" className="ml-2">{oldOrphans.length}</Badge>
            </h4>
            <ul className="space-y-1">
              {oldOrphans.map((o) => (
                <li key={o.url.id} className="text-xs font-mono text-muted-foreground">
                  {o.url.pathname}
                </li>
              ))}
            </ul>
          </div>
        )}
        {newOrphans.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">
              New URLs without sources
              <Badge variant="secondary" className="ml-2">{newOrphans.length}</Badge>
            </h4>
            <ul className="space-y-1">
              {newOrphans.map((o) => (
                <li key={o.url.id} className="text-xs font-mono text-muted-foreground">
                  {o.url.pathname}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
