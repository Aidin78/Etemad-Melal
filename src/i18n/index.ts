import type { Locale, Translations } from './types';
import { fa } from './fa';
import { en } from './en';

const dictionaries: Record<Locale, Translations> = { fa, en };

export function getTranslations(locale: Locale): Translations {
  return dictionaries[locale] ?? fa;
}

export function getArticleDisplay(
  locale: Locale,
  slug: string,
  fallback: { title: string; excerpt: string; dateFa?: string },
) {
  if (locale === 'fa') {
    return { title: fallback.title, excerpt: fallback.excerpt, dateLabel: fallback.dateFa };
  }
  const meta = en.articlesMeta[slug];
  return {
    title: meta?.title ?? fallback.title,
    excerpt: meta?.excerpt ?? fallback.excerpt,
    dateLabel: fallback.dateFa,
  };
}

export * from './types';
export * from './utils';
export { fa, en };
