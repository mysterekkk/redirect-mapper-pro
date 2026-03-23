'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useState } from 'react';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' },
  { code: 'es', label: 'ES' },
  { code: 'de', label: 'DE' },
  { code: 'fr', label: 'FR' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        className="gap-1"
      >
        <Globe className="h-4 w-4" />
        {locale.toUpperCase()}
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 rounded-md border bg-popover p-1 shadow-md">
            {LOCALES.map(({ code, label }) => (
              <button
                key={code}
                className={`block w-full rounded-sm px-3 py-1.5 text-left text-sm hover:bg-accent ${
                  locale === code ? 'bg-accent font-medium' : ''
                }`}
                onClick={() => switchLocale(code)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
