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

const aboutSection = z.object({
  title: z.string(),
  /** Paragraphs separated by a blank line in YAML (| block) */
  content: z.string(),
});

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroTitle: z.string(),
    heroTitleAccent: z.string(),
    heroSubtitle: z.string(),
    imageAlt: z.string(),
    image: z.string().default('/images/about.jpg'),
    valuesTitle: z.string(),
    values: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
        icon: z.string().default('◆'),
      }),
    ),
    highlights: z.array(z.object({ label: z.string(), value: z.string() })),
    sections: z.array(aboutSection).min(1),
  }),
});

export const collections = { articles, about };

