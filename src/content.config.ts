import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';import { siteImages } from './config/images';

const articles = defineCollection({
  loader: glob({ pattern: '{fa,en}/**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    dateFa: z.string().optional(),
    excerpt: z.string(),
    image: z.string().default(siteImages.articleDefault),
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
    image: z.string().default(siteImages.about),
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

