import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/types';
import { parseArticleId } from './article-utils';

export type PageRouteProps =
  | { type: 'home'; locale: Locale }
  | { type: 'about'; locale: Locale }
  | { type: 'articles'; locale: Locale }
  | { type: 'article'; locale: Locale; post: CollectionEntry<'articles'> };

/** Paths for `[...path].astro` — excludes FA homepage (`/`) */
export async function getCatchAllPagePaths() {
  const paths: Array<{ params: { path: string }; props: PageRouteProps }> = [];

  const add = (path: string, props: PageRouteProps) => {
    paths.push({ params: { path }, props });
  };

  add('en', { type: 'home', locale: 'en' });
  add('about', { type: 'about', locale: 'fa' });
  add('en/about', { type: 'about', locale: 'en' });
  add('articles', { type: 'articles', locale: 'fa' });
  add('en/articles', { type: 'articles', locale: 'en' });

  const posts = await getCollection('articles');
  for (const post of posts) {
    const { locale, slug } = parseArticleId(post.id);
    const route = locale === 'en' ? `en/articles/${slug}` : `articles/${slug}`;
    add(route, { type: 'article', locale, post });
  }

  return paths;
}
