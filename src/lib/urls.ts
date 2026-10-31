import { siteConfig } from '../config/site';
import type { Locale } from '../i18n/types';
import { localePath } from '../i18n/utils';

/** Absolute URL of a page in the given locale */
export const pageUrl = (locale: Locale, path: string) => new URL(localePath(locale, path), siteConfig.url).href;
