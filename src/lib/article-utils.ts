import type { Locale } from '../i18n/types';

/** Article collection id: `fa/slug` or `en/slug` */
export function parseArticleId(id: string): { locale: Locale; slug: string } {
  const slash = id.indexOf('/');
  if (slash > 0) {
    const locale = id.slice(0, slash);
    const slug = id.slice(slash + 1);
    if (locale === 'fa' || locale === 'en') return { locale, slug };
  }
  return { locale: 'fa', slug: id };
}

export function articleEntryId(locale: Locale, slug: string): string {
  return `${locale}/${slug}`;
}
