/**
 * Site header behaviour: the mobile menu, the active nav link, and sliding away on scroll.
 * Loaded as a module, so the whole page is parsed by the time this runs. The one thing that
 * can't wait for that is the homepage's first-paint `is-top` state, set inline in Header.astro.
 */

/** Scroll position (px) past which the header slides away while scrolling down */
const HIDE_AFTER = 480;
/** Scroll distance (px) that counts as a change of direction */
const HIDE_THRESHOLD = 8;
/** Scroll position (px) under which the homepage header stays transparent on the hero */
const TOP_LIMIT = 8;
/** Scroll position (px) past which the bar rounds into a pill */
const SCROLLED_AFTER = 24;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function setLinkActive(link: HTMLElement, active: boolean) {
  link.classList.toggle('nav-link-active', active);
  if (active) link.setAttribute('aria-current', 'page');
  else link.removeAttribute('aria-current');
}

/** A dropdown's parent link reads as current when one of its entries is */
function syncNavGroups() {
  document.querySelectorAll<HTMLElement>('.nav-item--sub').forEach((group) => {
    const parent = group.querySelector<HTMLElement>(':scope > .nav-link');
    parent?.classList.toggle('nav-link-active', !!group.querySelector('.nav-sub-link.nav-link-active'));
  });
}

/** Wires up the mobile menu and returns a check for whether it is open */
function initMobileMenu(header: HTMLElement) {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const panel = menu?.querySelector<HTMLElement>('.mobile-menu-panel');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const closeButton = document.getElementById('mobile-menu-close');
  if (!toggle || !menu) return () => false;

  const page = [header, document.getElementById('main-content'), document.querySelector('footer')];
  const isOpen = () => menu.classList.contains('mobile-menu--open');

  const setMenuOpen = (open: boolean) => {
    menu.inert = !open;
    menu.classList.toggle('mobile-menu--open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('mobile-menu-open', open);
    page.forEach((el) => el?.toggleAttribute('inert', open));
    if (open) {
      if (panel) panel.scrollTop = 0;
      // Focusing the still-translated drawer must not scroll its clipping layer.
      closeButton?.focus({ preventScroll: true });
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    toggle.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => setMenuOpen(true));
  closeButton?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = [...menu.querySelectorAll<HTMLElement>(`.mobile-menu-panel :is(${FOCUSABLE})`)]
        .filter((el) => el.tabIndex >= 0 && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false);
  });

  return isOpen;
}

/** Marks the link of the section of the site this page belongs to (articles, about) */
function initPageNav(path: string) {
  document.querySelectorAll<HTMLElement>('[data-nav-path]').forEach((link) => {
    const prefix = link.dataset.navPath;
    setLinkActive(link, !!prefix && path.startsWith(prefix));
  });
  syncNavGroups();
}

/** Every page: the bar rounds into a pill once the page scrolls; the homepage's also sits transparently on the hero until then */
function initScrollState(header: HTMLElement, isHome: boolean) {
  const sync = () => {
    header.classList.toggle('is-scrolled', window.scrollY > SCROLLED_AFTER);
    if (isHome) header.classList.toggle('is-top', window.scrollY < TOP_LIMIT);
  };
  sync();
  window.addEventListener('scroll', sync, { passive: true });
}

/** Further down the page it slides away while scrolling down and comes back on any scroll up */
function initHideOnScroll(header: HTMLElement, isMenuOpen: () => boolean) {
  let lastY = window.scrollY;
  let ticking = false;

  const sync = () => {
    ticking = false;
    const y = window.scrollY;
    const delta = y - lastY;
    if (Math.abs(delta) < HIDE_THRESHOLD) return;
    header.classList.toggle('is-hidden', !isMenuOpen() && delta > 0 && y > HIDE_AFTER);
    lastY = y;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sync);
    },
    { passive: true },
  );
}

export function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const isMenuOpen = initMobileMenu(header);
  initHideOnScroll(header, isMenuOpen);

  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const isHome = path === '/' || path === '/en';
  initPageNav(path);
  initScrollState(header, isHome);
}
