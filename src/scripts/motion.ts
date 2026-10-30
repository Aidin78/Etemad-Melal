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

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

/**
 * Scroll scrubbing: writes the element's scroll progress (0 → 1) to a `--p` custom
 * property every frame it is on screen, so CSS can tie transforms/opacity to scrolling.
 *   data-scrub         0 when its top enters the viewport bottom, 1 when its bottom leaves the top
 *   data-scrub="line"  0 → 1 while it crosses a horizontal line (data-scrub-line, fraction of vh, default 0.5)
 *   data-scrub="exit"  0 at rest, 1 once it has scrolled fully off the top (hero)
 * CSS must give `var(--p, …)` a fallback that looks right statically (no JS / reduced motion).
 */
function initScrub() {
  const targets = [...document.querySelectorAll<HTMLElement>('[data-scrub]')];
  if (!targets.length) return;

  const active = new Set<HTMLElement>();
  let queued = false;

  const progress = (el: HTMLElement, rect: DOMRect, vh: number) => {
    const mode = el.dataset.scrub;
    if (mode === 'exit') return clamp01(-rect.top / rect.height);
    if (mode === 'line') {
      const line = Number(el.dataset.scrubLine ?? 0.5) * vh;
      return clamp01((line - rect.top) / rect.height);
    }
    return clamp01((vh - rect.top) / (vh + rect.height));
  };

  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    active.forEach((el) => {
      el.style.setProperty('--p', progress(el, el.getBoundingClientRect(), vh).toFixed(4));
    });
  };

  const queue = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) active.add(el);
      else active.delete(el);
    });
    queue();
  });

  // Seed every target once so off-screen ones don't flash their static fallback on arrival.
  const vh = window.innerHeight;
  targets.forEach((el) => {
    el.style.setProperty('--p', progress(el, el.getBoundingClientRect(), vh).toFixed(4));
    observer.observe(el);
  });
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue, { passive: true });
}

/**
 * Pointer motion (mouse/trackpad only):
 *   data-pointer    eased pointer position over the element, centred, as `--mx` / `--my` in -1 → 1;
 *                   eases back to 0 when the pointer leaves (layered parallax / tilt in CSS)
 *   data-spotlight  raw pointer position inside the element as `--sx` / `--sy` (px) for a hover glow
 * CSS must default both to a resting look (`var(--mx, 0)`), as touch devices never set them.
 */
function initPointer() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-pointer]').forEach((el) => {
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const step = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty('--mx', x.toFixed(4));
      el.style.setProperty('--my', y.toFixed(4));
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(step) : 0;
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      tx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      ty = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      run();
    });
    el.addEventListener('pointerleave', () => {
      tx = 0;
      ty = 0;
      run();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${(event.clientX - rect.left).toFixed(0)}px`);
      el.style.setProperty('--sy', `${(event.clientY - rect.top).toFixed(0)}px`);
    });
  });
}

export function initMotion() {
  window.__emMotion = true;
  if (!document.documentElement.classList.contains('js-motion')) return;
  initReveal();
  initCountUp();
  initScrub();
  initPointer();
}
