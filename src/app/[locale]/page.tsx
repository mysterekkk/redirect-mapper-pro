import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  ArrowRightLeft, Zap, BarChart3, Download,
  AlertCircle, Globe, Shield
} from 'lucide-react';

export default function LandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('landing');

  const features = [
    { icon: Zap, title: t('feature1Title'), desc: t('feature1Desc') },
    { icon: BarChart3, title: t('feature2Title'), desc: t('feature2Desc') },
    { icon: Download, title: t('feature3Title'), desc: t('feature3Desc') },
    { icon: AlertCircle, title: t('feature4Title'), desc: t('feature4Desc') },
    { icon: Globe, title: t('feature5Title'), desc: t('feature5Desc') },
    { icon: Shield, title: t('feature6Title'), desc: t('feature6Desc') },
  ];

  const steps = [t('howStep1'), t('howStep2'), t('howStep3'), t('howStep4')];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm text-muted-foreground">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span>{t('feature6Desc')}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {t('heroTitle')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            {t('heroSubtitle')}
          </p>
          <Link
            href={`/${locale}/app`}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 sm:px-8 sm:py-3 text-base sm:text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ArrowRightLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            {t('heroButton')}
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('featuresTitle')}</h2>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold mb-1 text-sm sm:text-base">{title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('howTitle')}</h2>
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base sm:text-lg">
                {i + 1}
              </div>
              <p className="text-xs sm:text-sm">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported formats */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">{t('formatsTitle')}</h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl mx-auto">
          {['.htaccess', 'nginx conf', 'Cloudflare CSV', 'CSV', 'JSON'].map((fmt) => (
            <span key={fmt} className="rounded-full border bg-muted px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium">
              {fmt}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 sm:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-2 text-center text-xs sm:text-sm text-muted-foreground">
          <p>
            {t('footerAuthor')}{' '}
            <a
              href="https://luroweb.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              LuroWeb - Łukasz Rosikoń
            </a>
          </p>
          <p>
            {t('footerOpenSource')} —{' '}
            <a
              href="https://github.com/mysterekkk/redirect-mapper-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              GitHub
            </a>
          </p>
          <p className="text-xs">MIT License</p>
        </div>
      </footer>
    </div>
  );
}
