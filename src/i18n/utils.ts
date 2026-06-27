import type { Locale } from './types';

export const defaultLocale: Locale = 'fa';
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
