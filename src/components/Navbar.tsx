/**
 * Fixed top navigation. Home-zone items scroll to anchors (navigating back to
 * the home route first when on an archive page); archive items are routes.
 * Includes the bilingual [हि|EN] toggle. Mobile collapses to a sheet.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../utils/cn';

const MENU_ID = 'mobile-nav-sheet';

type NavItem =
  | { kind: 'hash'; id: string; key: keyof ReturnType<typeof useLanguage>['t']['nav'] }
  | { kind: 'route'; to: string; key: keyof ReturnType<typeof useLanguage>['t']['nav'] };

const ITEMS: NavItem[] = [
  { kind: 'hash', id: 'about', key: 'about' },
  { kind: 'hash', id: 'journey', key: 'journey' },
  { kind: 'hash', id: 'seva', key: 'seva' },
  { kind: 'hash', id: 'honors', key: 'honors' },
  { kind: 'route', to: '/gallery', key: 'gallery' },
  { kind: 'route', to: '/videos', key: 'videos' },
  { kind: 'route', to: '/media', key: 'media' },
  { kind: 'hash', id: 'contact', key: 'contact' },
];

export function Navbar() {
  const { t, lang, toggle } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  // While the sheet is open: trap focus inside it, close on Escape, and restore
  // focus to the toggle on close. Static markup otherwise — no motion added.
  useEffect(() => {
    if (!open) return;
    const toggleEl = toggleRef.current;
    const sheet = menuRef.current;
    const first = sheet?.querySelector<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !sheet) return;
      const focusable = sheet.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const head = focusable[0];
      const tail = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === head) {
        e.preventDefault();
        tail.focus();
      } else if (!e.shiftKey && document.activeElement === tail) {
        e.preventDefault();
        head.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      toggleEl?.focus();
    };
  }, [open]);

  const goToSection = useCallback(
    (id: string) => {
      setOpen(false);
      if (location.pathname !== '/') {
        navigate(`/#${id}`);
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [location.pathname, navigate],
  );

  const goHome = useCallback(() => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }, [location.pathname, navigate]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-spring',
        scrolled ? 'bg-slateWhite/85 backdrop-blur-md border-b border-parliament/5 shadow-sm' : 'bg-transparent',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        <button
          onClick={goHome}
          className="flex flex-col items-start text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-slateWhite"
        >
          <span className="font-hindi text-lg md:text-xl font-bold text-parliament leading-tight">{t.brand.name}</span>
          <span className={cn(
            "text-[0.6rem] md:text-xs uppercase text-parliament/70 font-sans mt-0.5",
            lang === 'en' ? "tracking-[0.2em]" : "tracking-normal"
          )}>
            {t.brand.party}
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {ITEMS.map((item) =>
            item.kind === 'hash' ? (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className="px-3 py-2 text-sm font-medium text-parliament/70 hover:text-saffron transition-colors duration-300 font-hindi rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-slateWhite"
              >
                {t.nav[item.key]}
              </button>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                aria-current={location.pathname === item.to ? 'page' : undefined}
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-colors duration-300 font-hindi rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-slateWhite',
                  location.pathname === item.to ? 'text-saffron' : 'text-parliament/70 hover:text-saffron',
                )}
              >
                {t.nav[item.key]}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <LangToggle lang={lang} onToggle={toggle} />
          <button
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-11 w-11 grid place-items-center rounded-full bg-parliament/5 text-parliament focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-slateWhite"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls={MENU_ID}
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          ref={menuRef}
          id={MENU_ID}
          className="lg:hidden bg-slateWhite border-t border-parliament/5 px-4 py-4 flex flex-col gap-1 shadow-lg"
        >
          {ITEMS.map((item) =>
            item.kind === 'hash' ? (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className="text-left px-3 py-3 rounded-xl text-base font-medium text-parliament/80 hover:bg-saffron/10 hover:text-saffron transition-colors font-hindi focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-inset"
              >
                {t.nav[item.key]}
              </button>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                aria-current={location.pathname === item.to ? 'page' : undefined}
                className={cn(
                  'px-3 py-3 rounded-xl text-base font-medium transition-colors font-hindi focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-inset',
                  location.pathname === item.to
                    ? 'bg-saffron/10 text-saffron'
                    : 'text-parliament/80 hover:bg-saffron/10 hover:text-saffron',
                )}
              >
                {t.nav[item.key]}
              </Link>
            ),
          )}
        </div>
      )}
    </header>
  );
}

function LangToggle({ lang, onToggle }: { lang: 'hi' | 'en'; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center rounded-full bg-parliament/5 border border-parliament/5 p-0.5 font-sans text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-slateWhite"
      aria-label="Toggle language"
      aria-pressed={lang === 'en'}
    >
      <span
        aria-hidden="true"
        className={cn(
          'relative z-10 px-3 py-1.5 rounded-full transition-colors duration-300',
          lang === 'hi' ? 'text-slateWhite' : 'text-parliament/60',
        )}
      >
        हि
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'relative z-10 px-3 py-1.5 rounded-full transition-colors duration-300',
          lang === 'en' ? 'text-slateWhite' : 'text-parliament/60',
        )}
      >
        EN
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-0.5 bottom-0.5 w-[calc(50%-0.125rem)] rounded-full bg-saffron shadow-sm transition-transform duration-500 ease-spring',
          lang === 'en' ? 'translate-x-[calc(100%+0.0rem)]' : 'translate-x-0',
        )}
      />
    </button>
  );
}
