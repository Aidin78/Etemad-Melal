import { packageMeta } from '../config/packages';
import type { PackageDisplay } from '../i18n/types';

type PackageItemInput = Omit<PackageDisplay, 'color'>;

export function enrichPackages(items: PackageItemInput[]): PackageDisplay[] {
  return items.map((item) => {
    const meta = packageMeta.find((m) => m.id === item.id);
    return {
      ...item,
      color: meta?.color ?? '#2E86AB',
      featured: item.featured ?? meta?.featured,
    };
  });
}
