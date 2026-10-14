/** Environment and URL config — all copy lives in i18n */
export const siteConfig = {
  url: 'https://etemadmelal.com',
  panelUrl: import.meta.env.PUBLIC_PANEL_URL ?? 'https://panel.etemadmelal.com',
  contactFormUrl:
    import.meta.env.PUBLIC_CONTACT_FORM_URL ||
    'https://formsubmit.co/info@etemadmelal.com',
  /**
   * Office phone shown in the contact section, written with Western digits
   * (e.g. '051-31234567' — shown with Persian digits on /fa automatically).
   * Leave empty to hide the phone row.
   */
  phone: '',
} as const;

/** Number of FAQ items shown in the homepage preview before linking to /faq */
export const homepageFaqCount = 6;

/** Last-revised date for the /terms page (ISO date, update when the legal copy changes) */
export const legalLastUpdated = '2026-09-14';
