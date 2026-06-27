import { siteConfig } from '../config/site';
import type { Locale, Translations } from '../i18n/types';
import { localePath } from '../i18n/utils';

const base = siteConfig.url;

export function organizationSchema(locale: Locale, t: Translations) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: t.siteName,
    alternateName: locale === 'fa' ? 'Etemad Melal' : 'اعتماد ملل',
    url: base,
    logo: `${base}/media/etemadmelal-logo.svg`,
    description: t.description,
    email: t.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locale === 'fa' ? 'تهران' : 'Tehran',
      addressCountry: 'IR',
    },
    sameAs: [siteConfig.panelUrl].filter(Boolean),
  };
}

export function websiteSchema(locale: Locale, t: Translations) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t.siteName,
    alternateName: locale === 'fa' ? 'Etemad Melal' : 'اعتماد ملل',
    url: `${base}${localePath(locale, '/')}`,
    description: t.description,
    inLanguage: locale === 'fa' ? 'fa-IR' : 'en',
    publisher: {
      '@type': 'Organization',
      name: t.siteName,
      logo: `${base}/media/etemadmelal-logo.svg`,
    },
  };
}

export function financialServiceSchema(locale: Locale, t: Translations) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: t.siteName,
    alternateName: locale === 'fa' ? 'Etemad Melal' : 'اعتماد ملل',
    url: `${base}${localePath(locale, '/')}`,
    description: t.longDescription,
    areaServed: { '@type': 'Country', name: 'Iran' },
    email: t.contact.email,
    provider: {
      '@type': 'Organization',
      name: t.companyLegal,
      url: base,
    },
  };
}

export function faqPageSchema(t: Translations) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function articleSchema(
  locale: Locale,
  t: Translations,
  input: {
    title: string;
    description: string;
    image: string;
    datePublished: Date;
    url: string;
  },
) {
  const imageUrl = new URL(input.image, base).href;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    image: imageUrl,
    datePublished: input.datePublished.toISOString(),
    inLanguage: locale === 'fa' ? 'fa-IR' : 'en',
    mainEntityOfPage: input.url,
    author: { '@type': 'Organization', name: t.siteName, url: base },
    publisher: {
      '@type': 'Organization',
      name: t.siteName,
      logo: { '@type': 'ImageObject', url: `${base}/media/etemadmelal-logo.svg` },
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
