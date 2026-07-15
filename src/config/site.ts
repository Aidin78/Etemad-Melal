/** Environment and URL config — all copy lives in i18n */
export const siteConfig = {
  url: 'https://etemadmelal.com',
  panelUrl: import.meta.env.PUBLIC_PANEL_URL ?? 'https://panel.etemadmelal.com',
  contactFormUrl:
    import.meta.env.PUBLIC_CONTACT_FORM_URL ||
    'https://formsubmit.co/info@etemadmelal.com',
} as const;
