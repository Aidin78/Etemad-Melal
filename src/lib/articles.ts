import { getCollection } from 'astro:content';

export async function getArticleStaticPaths() {
  const posts = await getCollection('articles');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}
