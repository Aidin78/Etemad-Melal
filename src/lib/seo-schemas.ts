import { siteConfig } from '../config/site';
import { siteFaqs } from '../config/faqs';

const base = siteConfig.url;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  url: base,
  logo: `${base}/media/etemadmelal-logo.svg`,
  description: siteConfig.description,
  email: siteConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'تهران',
    addressCountry: 'IR',
  },
  sameAs: [siteConfig.panelUrl].filter(Boolean),
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  url: base,
  description: siteConfig.description,
  inLanguage: 'fa-IR',
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: `${base}/media/etemadmelal-logo.svg`,
  },
};

export const financialServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  url: base,
  description: siteConfig.longDescription,
  areaServed: {
    '@type': 'Country',
    name: 'Iran',
  },
  email: siteConfig.contact.email,
  provider: {
    '@type': 'Organization',
    name: siteConfig.companyLegal,
    url: base,
  },
};

export function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteFaqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  image: string;
  datePublished: Date;
  url: string;
}) {
  const imageUrl = new URL(input.image, base).href;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    image: imageUrl,
    datePublished: input.datePublished.toISOString(),
    inLanguage: 'fa-IR',
    mainEntityOfPage: input.url,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: base,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${base}/media/etemadmelal-logo.svg`,
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
