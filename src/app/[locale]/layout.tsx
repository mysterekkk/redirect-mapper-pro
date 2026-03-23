import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/layout/Header';

import enMessages from '@/messages/en.json';
import plMessages from '@/messages/pl.json';
import esMessages from '@/messages/es.json';
import deMessages from '@/messages/de.json';
import frMessages from '@/messages/fr.json';

const inter = Inter({ subsets: ['latin'] });

const allMessages: Record<string, typeof enMessages> = {
  en: enMessages,
  pl: plMessages,
  es: esMessages,
  de: deMessages,
  fr: frMessages,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = allMessages[locale] || allMessages.en;
  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    authors: [{ name: 'LuroWeb - Łukasz Rosikoń', url: 'https://luroweb.pl' }],
    openGraph: {
      title: messages.metadata.title,
      description: messages.metadata.description,
      type: 'website',
      locale,
    },
  };
}

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'pl' },
    { locale: 'es' },
    { locale: 'de' },
    { locale: 'fr' },
  ];
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = allMessages[locale] || allMessages.en;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
