import type { Locale, Translations } from './types';
import { fa } from './fa';
import { en } from './en';
import { formatDate } from './utils';

const dictionaries: Record<Locale, Translations> = { fa, en };

export function getTranslations(locale: Locale): Translations {
  return dictionaries[locale] ?? fa;
}

export function getArticleDisplay(
  locale: Locale,
  data: { title: string; excerpt: string; date: Date; dateFa?: string },
) {
  return {
    title: data.title,
    excerpt: data.excerpt,
    dateLabel: (locale === 'fa' && data.dateFa) || formatDate(data.date, locale),
  };
}

export * from './types';
export * from './utils';
