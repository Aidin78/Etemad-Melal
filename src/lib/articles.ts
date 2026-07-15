import { getCollection } from 'astro:content';
import type { Locale } from '../i18n/types';
import { parseArticleId } from './article-utils';

export async function getSortedArticles(locale: Locale) {
  const posts = await getCollection('articles');
  return posts
    .filter((post) => parseArticleId(post.id).locale === locale)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
