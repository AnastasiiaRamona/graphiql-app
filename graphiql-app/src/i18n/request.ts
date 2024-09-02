import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export type localeType = 'ru' | 'en';

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as localeType)) notFound();

  return {
    messages: (await import(`../../public/locales/${locale}.json`)).default,
  };
});
