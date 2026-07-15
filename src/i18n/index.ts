import type { Locale, Translations } from './types';
import { fa } from './fa';
import { en } from './en';

const dictionaries: Record<Locale, Translations> = { fa, en };

export function getTranslations(locale: Locale): Translations {
  return dictionaries[locale] ?? fa;
}

function formatArticleDate(locale: Locale, date: Date, dateFa?: string): string {
  if (locale === 'fa') return dateFa ?? '';
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

export function getArticleDisplay(
  locale: Locale,
  slug: string,
  fallback: { title: string; excerpt: string; date: Date; dateFa?: string },
) {
  const dateLabel = formatArticleDate(locale, fallback.date, fallback.dateFa);

  if (locale === 'fa') {
    return { title: fallback.title, excerpt: fallback.excerpt, dateLabel };
  }

  const meta = en.articlesMeta[slug];
  return {
    title: meta?.title ?? fallback.title,
    excerpt: meta?.excerpt ?? fallback.excerpt,
    dateLabel: meta?.dateLabel ?? dateLabel,
  };
}

export * from './types';
export * from './utils';
export { fa, en };
