'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useState } from 'react';

const LOCALES = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'pl', label: 'Polski', flag: 'PL' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'fr', label: 'Français', flag: 'FR' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    // Replace the locale segment in the pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/') || `/${newLocale}`;
    // Use window.location for a full page navigation to ensure SSG locale switch
    window.location.href = newPath;
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
        <span className="hidden sm:inline">{locale.toUpperCase()}</span>
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-md border bg-popover p-1 shadow-md">
            {LOCALES.map(({ code, label, flag }) => (
              <button
                key={code}
                className={`flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm hover:bg-accent transition-colors ${
                  locale === code ? 'bg-accent font-medium' : ''
                }`}
                onClick={() => switchLocale(code)}
              >
                <span className="text-xs font-bold text-muted-foreground w-5">{flag}</span>
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
