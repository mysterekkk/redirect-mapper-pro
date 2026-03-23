import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

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
  const messages = await getMessages() as Record<string, Record<string, string>>;
  return {
    title: messages?.metadata?.title || 'Redirect Mapper Pro',
    description: messages?.metadata?.description || 'Free open-source tool for website migration redirect mapping',
    authors: [{ name: 'LuroWeb - Łukasz Rosikoń', url: 'https://luroweb.pl' }],
    openGraph: {
      title: messages?.metadata?.title || 'Redirect Mapper Pro',
      description: messages?.metadata?.description || '',
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

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
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
