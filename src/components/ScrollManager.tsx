/**
 * Route scroll behavior. On a plain route change, jump to the top. On a hashed
 * route (e.g. /#journey arriving from an archive page), wait for the target to
 * mount, then smooth-scroll to it. react-router does not handle hash targets
 * on its own.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hash) {
      const id = hash.slice(1);
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        return Boolean(el);
      };
      if (scrollToTarget()) return;
      const tmo = window.setTimeout(scrollToTarget, 90);
      return () => window.clearTimeout(tmo);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
