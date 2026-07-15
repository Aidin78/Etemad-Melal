import { siteConfig } from '../config/site';

/** Shared external panel link attributes */
export const panelHref = siteConfig.panelUrl;

export const panelLinkAttrs = {
  href: panelHref,
  target: '_blank' as const,
  rel: 'noopener noreferrer',
};
