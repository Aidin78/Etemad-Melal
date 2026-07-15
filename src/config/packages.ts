/** Locale-neutral package metadata — labels live in i18n */
export type PackageId = 'aghaze' | 'pishgam' | 'paydar' | 'abr' | 'saramad';

export type PackageMeta = {
  id: PackageId;
  color: string;
  featured?: boolean;
};

export const packageMeta: PackageMeta[] = [
  { id: 'aghaze', color: '#2E86AB' },
  { id: 'pishgam', color: '#3579a8' },
  { id: 'paydar', color: '#F6A000' },
  { id: 'abr', color: '#7B3FE4' },
  { id: 'saramad', color: '#D63447', featured: true },
];
