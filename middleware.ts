import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pl', 'es', 'de', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const config = {
  matcher: [
    '/',
    '/(en|pl|es|de|fr)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
