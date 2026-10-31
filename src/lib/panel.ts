import { siteConfig } from '../config/site';

/** Panel sign-up page — target of the "start investing" CTAs */
export const panelSignupHref = `${siteConfig.panelUrl.replace(/\/$/, '')}/signup`;

/** Shared attributes of links that leave for the panel */
export const panelLinkAttrs = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
