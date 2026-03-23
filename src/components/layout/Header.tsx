'use client';

import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export function Header() {
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold">
          <ArrowRightLeft className="h-5 w-5 text-primary" />
          <span className="hidden sm:inline">Redirect Mapper Pro</span>
          <span className="sm:hidden">RMP</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/app`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            App
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
