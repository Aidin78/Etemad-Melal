import type { Locale } from './types';

export const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export const defaultLocale: Locale = 'fa';

/** Western digits → Persian when locale is fa */
export function toLocaleDigits(value: string | number, locale: Locale): string {
  const str = String(value);
  if (locale !== 'fa') return str;
  return str.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
}

/** Two-digit box index for timeline cards (e.g. ۰۱, ۰۲) */
export function formatBoxIndex(index: number, locale: Locale): string {
  return toLocaleDigits(String(index).padStart(2, '0'), locale);
}

/** Long date in the locale's calendar. In UTC: content dates are date-only, so the build machine's timezone must not shift them */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(localeHreflang(locale), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'fa') return normalized;
  // Root links put their query/hash straight after the prefix: /en#contact, never /en/#contact
  return `/en${normalized.replace(/^\/(?=[?#]|$)/, '')}`;
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fa';
}

export function alternateLocalePath(locale: Locale, pathname: string): string {
  const other: Locale = locale === 'fa' ? 'en' : 'fa';
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return localePath(other, stripped);
}

export function localeHreflang(locale: Locale): string {
  return locale === 'fa' ? 'fa-IR' : 'en';
}

export function ogLocale(locale: Locale): string {
  return locale === 'fa' ? 'fa_IR' : 'en_US';
}
