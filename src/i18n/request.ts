import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  let messages;
  switch (locale) {
    case 'pl':
      messages = (await import('../messages/pl.json')).default;
      break;
    case 'es':
      messages = (await import('../messages/es.json')).default;
      break;
    case 'de':
      messages = (await import('../messages/de.json')).default;
      break;
    case 'fr':
      messages = (await import('../messages/fr.json')).default;
      break;
    default:
      messages = (await import('../messages/en.json')).default;
      break;
  }

  return {
    locale,
    messages,
  };
});
