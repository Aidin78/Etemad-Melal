import type { Locale } from './types';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;

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
export const locales: Locale[] = ['fa', 'en'];

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'fa') return normalized === '/' ? '/' : normalized;
  if (normalized === '/') return '/en';
  return `/en${normalized}`;
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
