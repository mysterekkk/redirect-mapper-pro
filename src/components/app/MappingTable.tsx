'use client';

import { useState } from 'react';
import { useMappingStore } from '@/stores/mapping-store';
import { ConfidenceBadge } from './ConfidenceBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Edit2, ArrowRight } from 'lucide-react';

export function MappingTable() {
  const { mappings, confirmMapping, rejectMapping, setManualTarget } = useMappingStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const activeMappings = mappings.filter(m => m.status !== 'rejected');

  const filtered = filter === 'all'
    ? activeMappings
    : activeMappings.filter(m => {
        if (filter === 'high') return m.confidence >= 80;
        if (filter === 'medium') return m.confidence >= 50 && m.confidence < 80;
        return m.confidence < 50;
      });

  if (mappings.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg">Redirect Mappings ({activeMappings.length})</CardTitle>
          <div className="flex gap-1">
            {(['all', 'high', 'medium', 'low'] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 pr-4 font-medium text-muted-foreground">Old URL</th>
                <th className="pb-2 pr-4 font-medium text-muted-foreground w-8"></th>
                <th className="pb-2 pr-4 font-medium text-muted-foreground">New URL</th>
                <th className="pb-2 pr-4 font-medium text-muted-foreground">Confidence</th>
                <th className="pb-2 pr-4 font-medium text-muted-foreground">Group</th>
                <th className="pb-2 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((mapping) => (
                <tr key={mapping.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-2 pr-4">
                    <code className="text-xs break-all">{mapping.oldUrl.pathname}</code>
                  </td>
                  <td className="py-2 pr-4">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </td>
                  <td className="py-2 pr-4">
                    {editingId === mapping.id ? (
                      <div className="flex gap-1">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-7 text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setManualTarget(mapping.id, editValue);
                              setEditingId(null);
                            }
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => {
                            setManualTarget(mapping.id, editValue);
                            setEditingId(null);
                          }}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <code className="text-xs break-all">
                        {mapping.manualNewUrl || mapping.newUrl?.pathname || '—'}
                      </code>
                    )}
                  </td>
                  <td className="py-2 pr-4">
                    <ConfidenceBadge score={mapping.confidence} />
                  </td>
                  <td className="py-2 pr-4">
                    <span className="text-xs text-muted-foreground capitalize">
                      {mapping.oldUrl.group || 'other'}
                    </span>
                  </td>
                  <td className="py-2">
                    <div className="flex gap-1">
                      {mapping.status !== 'confirmed' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-green-600 hover:text-green-700"
                          onClick={() => confirmMapping(mapping.id)}
                          title="Confirm"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                        onClick={() => rejectMapping(mapping.id)}
                        title="Reject"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() => {
                          setEditingId(mapping.id);
                          setEditValue(mapping.manualNewUrl || mapping.newUrl?.pathname || '');
                        }}
                        title="Edit target"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
