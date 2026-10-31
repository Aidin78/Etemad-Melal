/** Shared by the pre-paint script in Layout.astro and ThemeToggle.astro */
export const THEME_STORAGE_KEY = 'etemadmelal-theme';

/** Browser UI color per theme (`<meta name="theme-color">`) */
export const themeColors = {
  light: '#f6f3ec',
  dark: '#12110f',
} as const;
