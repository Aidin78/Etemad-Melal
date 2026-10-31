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

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function setLinkActive(link: HTMLElement, active: boolean, current: 'page' | 'location') {
  link.classList.toggle('nav-link-active', active);
  if (active) link.setAttribute('aria-current', current);
  else link.removeAttribute('aria-current');
}

/** Wires up the mobile menu and returns a check for whether it is open */
function initMobileMenu(header: HTMLElement) {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const closeButton = document.getElementById('mobile-menu-close');
  if (!toggle || !menu) return () => false;

  const page = [header, document.getElementById('main-content'), document.querySelector('footer')];
  const isOpen = () => menu.classList.contains('mobile-menu--open');

  const setMenuOpen = (open: boolean) => {
    menu.classList.toggle('mobile-menu--open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('mobile-menu-open', open);
    page.forEach((el) => el?.toggleAttribute('inert', open));
    if (open) closeButton?.focus();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    toggle.focus();
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
      const focusable = [...menu.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
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
    setLinkActive(link, !!prefix && path.startsWith(prefix), 'page');
  });
}

/** Homepage: marks the link of the section being read */
function initScrollSpy(header: HTMLElement) {
  const links = document.querySelectorAll<HTMLElement>('[data-nav-section]');
  const sections = [...links]
    .map((link) => document.getElementById(link.dataset.navSection ?? ''))
    .filter((el) => el !== null);
  if (!sections.length) return;

  const setActive = (id: string | undefined) => {
    links.forEach((link) => setLinkActive(link, link.dataset.navSection === id, 'location'));
  };

  const update = () => {
    const line = header.offsetHeight + 40;
    let current: string | undefined;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) current = section.id;
    }
    setActive(current);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  links.forEach((link) => {
    link.addEventListener('click', () => setActive(link.dataset.navSection));
  });

  const hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) setActive(hash);
  else update();
}

/** Homepage: the header sits transparently on the hero until the page scrolls */
function initTopState(header: HTMLElement) {
  const sync = () => header.classList.toggle('is-top', window.scrollY < TOP_LIMIT);
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
  initPageNav(path);
  if (path === '/' || path === '/en') {
    initTopState(header);
    initScrollSpy(header);
  }
}
