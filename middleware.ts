import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pl', 'es', 'de', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … if they contain a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
