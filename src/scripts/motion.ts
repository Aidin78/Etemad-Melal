/**
 * Scroll-reveal and count-up behavior for `data-reveal` / `data-count` elements.
 * Styles live in src/styles/motion.css. Only runs when the inline head script in
 * Layout.astro has set `html.js-motion` (JS available + no reduced-motion request).
 */

declare global {
  interface Window {
    __emMotion?: boolean;
  }
}

/** Delay between items that enter the viewport together */
const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;
/** Longest reveal transition (incl. cascade steps) before cleanup */
const SETTLE_MS = 1800;

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

function byDocumentOrder(a: Element, b: Element) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}

function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target as HTMLElement)
        .sort(byDocumentOrder);

      // Elements that enter together (a row of cards) stagger; later rows start fresh.
      entering.forEach((el, i) => {
        observer.unobserve(el);
        const delay = Number(el.dataset.revealDelay ?? 0) + Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS;
        el.style.setProperty('--reveal-delay', `${delay}ms`);
        el.classList.add('is-revealed');

        // Hand the element back to its own styles (e.g. card hover transitions).
        window.setTimeout(() => {
          el.removeAttribute('data-reveal');
          el.classList.remove('is-revealed');
          el.style.removeProperty('--reveal-delay');
        }, delay + SETTLE_MS);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * Counts a stat up from zero, keeping its prefix/suffix and digit system
 * (e.g. "۱۰۰۰+", "۹۸٪", "+۵"). Values with more than one number ("۲۴/۷") are left as-is.
 */
function initCountUp() {
  const targets = [...document.querySelectorAll<HTMLElement>('[data-count]')]
    .map((el) => {
      const text = el.textContent?.trim() ?? '';
      const runs = text.match(/[0-9۰-۹]+/g);
      if (!runs || runs.length !== 1) return null;
      const raw = runs[0];
      const persian = /[۰-۹]/.test(raw);
      const value = Number([...raw].map((c) => (persian ? PERSIAN_DIGITS.indexOf(c) : c)).join(''));
      // Single-digit values ("+۱" years) would just blink from 0 — leave them static.
      if (!Number.isFinite(value) || value < 10) return null;
      const [prefix, suffix] = [text.slice(0, text.indexOf(raw)), text.slice(text.indexOf(raw) + raw.length)];
      const format = (n: number) => {
        const digits = String(n);
        return prefix + (persian ? digits.replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]) : digits) + suffix;
      };
      return { el, text, value, format };
    })
    .filter((t) => t !== null);

  if (!targets.length) return;

  const run = ({ el, text, value, format }: (typeof targets)[number]) => {
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = p < 1 ? format(Math.round(value * eased)) : text;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const target = targets.find((t) => t.el === entry.target);
        if (target) run(target);
      });
    },
    { threshold: 0.6 },
  );

  targets.forEach((t) => {
    t.el.textContent = t.format(0);
    observer.observe(t.el);
  });
}

export function initMotion() {
  window.__emMotion = true;
  if (!document.documentElement.classList.contains('js-motion')) return;
  initReveal();
  initCountUp();
}
