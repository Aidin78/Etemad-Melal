import { siteConfig } from '../config/site';

/** Shared external panel link attributes */
export const panelHref = siteConfig.panelUrl;

/** Panel sign-up page — target of the "start investing" CTAs */
export const panelSignupHref = `${panelHref.replace(/\/$/, '')}/signup`;

export const panelLinkAttrs = {
  href: panelHref,
  target: '_blank' as const,
  rel: 'noopener noreferrer',
};
