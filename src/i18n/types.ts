export type Locale = 'fa' | 'en';

export type NavLink = { href: string; label: string };

export type FaqItem = { q: string; a: string };

export type IncomeStream = {
  id: string;
  title: string;
  desc: string;
  highlights: string[];
  color: string;
  icon: string;
};

export type PackageRowKey =
  | 'amountRange'
  | 'monthlyReturn'
  | 'dailyCap'
  | 'capMultiplier'
  | 'contractMonths';

export type PackageDisplay = {
  id: string;
  name: string;
  monthlyReturn: string;
  contractMonths: string;
  amountRange: string;
  dailyCap: string;
  capMultiplier: string;
  featured?: boolean;
};

export type ArticleMeta = { title: string; excerpt: string; dateLabel?: string };

export type Translations = {
  locale: Locale;
  lang: string;
  dir: 'rtl' | 'ltr';
  siteName: string;
  tagline: string;
  description: string;
  longDescription: string;
  companyLegal: string;
  panelCtaLogin: string;
  panelCtaStart: string;
  nav: NavLink[];
  a11y: { skipToContent: string; openMenu: string; mainNav: string; mobileNav: string; themeToggle: string };
  langSwitch: { label: string; toEn: string; toFa: string };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    learnMore: string;
    stats: { value: string; label: string }[];
  };
  ticker: { label: string; trend: string }[];
  income: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    footnote: string;
    streams: IncomeStream[];
  };
  features: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    imageAlt: string;
    chartLabel: string;
    chartValue: string;
    steps: { num: string; title: string; desc: string }[];
  };
  packages: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    disclaimer: string;
    cta: string;
    featured: string;
    selectInPanel: string;
    detailRows: { key: PackageRowKey; label: string }[];
    items: PackageDisplay[];
  };
  trust: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    benefits: { title: string; desc: string }[];
    stats: { value: string; label: string; trend: string }[];
  };
  about: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    body: string;
    imageAlt: string;
    highlights: { label: string; value: string }[];
    ctaStart: string;
    ctaContact: string;
    ctaLearnMore: string;
  };
  news: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    viewAll: string;
    readMore: string;
    pageTitle: string;
    pageSubtitle: string;
    backToArticles: string;
    articleLocaleNotice: string;
    viewInPersian: string;
  };
  faq: { badge: string; title: string; titleAccent: string; subtitle: string; items: FaqItem[] };
  contact: {
    email: string;
    address: string;
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    infoTitle: string;
    emailLabel: string;
    addressLabel: string;
    formTitle: string;
    formHint: string;
    emailField: string;
    messageField: string;
    submit: string;
    sentTitle: string;
    sentBody: string;
    sentNew: string;
  };
  footer: {
    ctaEyebrow: string;
    ctaTitle: string;
    ctaTitleAccent: string;
    ctaTitleSuffix: string;
    ctaSubtitle: string;
    ctaContact: string;
    taglineSub: string;
    trustBadges: string[];
    quickLinks: string;
    investLinks: string;
    contactTitle: string;
    panelTitle: string;
    panelDesc: string;
    howItWorks: string;
    incomePaths: string;
    packages: string;
    benefits: string;
    articles: string;
    about: string;
    faq: string;
    contact: string;
    rights: string;
    disclaimer: string;
  };
  articlesMeta: Record<string, ArticleMeta>;
};
