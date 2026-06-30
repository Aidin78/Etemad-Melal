export const siteConfig = {
  name: 'اعتماد ملل',
  nameEn: 'Etemad Melal',
  tagline: 'پلتفرم سرمایه‌گذاری هوشمند و شفاف',
  description:
    'اعتماد ملل؛ پلتفرم سرمایه‌گذاری با مدیریت حرفه‌ای، شفافیت در گزارش‌دهی و پشتیبانی اختصاصی برای سرمایه‌گذاران.',
  /** Extended summary for structured data, llms.txt, and link previews */
  longDescription:
    'اعتماد ملل (Etemad Melal) یک پلتفرم سرمایه‌گذاری فارسی با پنل کاربری اختصاصی است. سرمایه‌گذاران می‌توانند از پکیج‌های متنوع (از ۱۰ میلیون تومان)، سود مشارکت ماهانه، حق مشارکت مستقیم و توسعه مشارکتی بهره ببرند. ثبت‌نام، خرید پکیج، پیگیری سود و برداشت از panel.etemadmelal.com انجام می‌شود.',
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
} as const;

export const navLinks = [
  { href: '/#features', label: 'خدمات' },
  { href: '/#income-streams', label: 'درآمد' },
  { href: '/#packages-overview', label: 'پکیج‌ها' },
  { href: '/#trust', label: 'مزایا' },
  { href: '/about', label: 'درباره ما' },
  { href: '/#faq', label: 'سوالات' },
  { href: '/#contact', label: 'تماس' },
  { href: '/articles', label: 'مقالات' },
] as const;
