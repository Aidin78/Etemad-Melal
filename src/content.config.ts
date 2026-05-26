import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    dateFa: z.string(),
    excerpt: z.string(),
    image: z.string().default('/images/articles/article-01.jpg'),
  }),
});

export const collections = { articles };
