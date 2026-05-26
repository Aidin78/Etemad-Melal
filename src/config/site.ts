export const siteConfig = {
  name: 'اعتماد ملل',
  nameEn: 'Etemad Melal',
  tagline: 'پلتفرم سرمایه‌گذاری هوشمند و شفاف',
  description:
    'اعتماد ملل؛ پلتفرم سرمایه‌گذاری با مدیریت حرفه‌ای، شفافیت در گزارش‌دهی و پشتیبانی اختصاصی برای سرمایه‌گذاران.',
  url: 'https://etemadmelal.com',
  panelUrl: import.meta.env.PUBLIC_PANEL_URL ?? 'https://panel.etemadmelal.com',
  /** Compact panel CTA — header, footer, secondary buttons */
  panelCtaLogin: 'ورود',
  /** Primary hero CTA — invites new and returning users */
  panelCtaStart: 'شروع',
  companyLegal: 'شرکت خلاقان اعتماد ملل دیبا',
  contact: {
    email: 'info@etemadmelal.com',
    address: 'تهران، ایران',
  },
  /** Formspree URL if set; otherwise FormSubmit.co to contact.email */
  contactFormUrl:
    import.meta.env.PUBLIC_CONTACT_FORM_URL ||
    'https://formsubmit.co/info@etemadmelal.com',
  social: {
    instagram: '',
    linkedin: '',
  },
} as const;

export const navLinks = [
  { href: '/#features', label: 'خدمات' },
  { href: '/#income-streams', label: 'درآمد' },
  { href: '/#packages-overview', label: 'پکیج‌ها' },
  { href: '/#trust', label: 'مزایا' },
  { href: '/#about', label: 'درباره ما' },
  { href: '/#faq', label: 'سوالات' },
  { href: '/#contact', label: 'تماس' },
  { href: '/articles', label: 'مقالات' },
] as const;
