import generatedWidths from '../config/responsive-images.json';

const widths: Record<string, number[] | undefined> = generatedWidths;

/** WebP `srcset` for a photo in public/images, from the copies scripts/generate-images.mjs wrote */
export function photoSrcset(src: string) {
  const base = src.replace('/images/', '/images/responsive/').replace(/\.jpg$/, '');
  return widths[src]?.map((width) => `${base}-${width}.webp ${width}w`).join(', ');
}
