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
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    mobileNav: string;
    themeToggle: string;
    switchToLight: string;
    switchToDark: string;
    breadcrumb: string;
    home: string;
    opensInNewTab: string;
  };
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
  aboutPage: {
    detailsTitle: string;
    detailsSubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
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
  };
  faq: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    viewAllLabel: string;
  };
  faqPage: {
    badge: string;
    pageTitle: string;
    pageSubtitle: string;
    items: FaqItem[];
  };
  termsPage: {
    badge: string;
    pageTitle: string;
    pageSubtitle: string;
    lastUpdatedLabel: string;
    /** `{count}` is replaced with the number of sections */
    sectionsCount: string;
    /** `{min}` is replaced with the estimated reading time in minutes */
    readingTime: string;
    print: string;
    tocTitle: string;
    importantLabel: string;
    copyLink: string;
    linkCopied: string;
    helpTitle: string;
    helpBody: string;
    helpFaq: string;
    helpContact: string;
    /** `important` sections get a highlighted card (e.g. the no-guaranteed-profit clause) */
    sections: { title: string; body: string; important?: boolean }[];
  };
  notFound: {
    badge: string;
    pageTitle: string;
    pageSubtitle: string;
    homeCta: string;
    articlesCta: string;
  };
  contact: {
    email: string;
    address: string;
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    infoTitle: string;
    infoSubtitle: string;
    emailLabel: string;
    addressLabel: string;
    phoneLabel: string;
    copy: string;
    copied: string;
    formTitle: string;
    nameField: string;
    emailField: string;
    messageField: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    sentTitle: string;
    sentBody: string;
    sentNew: string;
  };
  footer: {
    landmarkLabel: string;
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
    howItWorks: string;
    incomePaths: string;
    benefits: string;
    articles: string;
    about: string;
    faq: string;
    terms: string;
    contact: string;
    rights: string;
  };
};
