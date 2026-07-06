/**
 * ScrollSpine. A thin saffron rule pinned to the left edge of the viewport that
 * fills top to bottom as the page scrolls, so the home page reads as one
 * continuous descent rather than a stack of unrelated bands. It is the only
 * element that spans the whole document, the through-line tying the sections'
 * separate entrances into a single saffron thread.
 *
 * The spine scales on Y (transformOrigin top) scrubbed to overall scroll
 * progress, transform only, no layout cost, and sits below the navbar (z-30
 * under the navbar's z-40). Desktop only; a hairline left edge adds nothing on
 * narrow screens and would crowd the content. Decorative, so aria-hidden, and a
 * static branch removes it entirely under prefers-reduced-motion.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollSpine() {
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spine = spineRef.current;
    if (!spine) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={spineRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-screen w-[2px] origin-top bg-saffron/70 md:block"
    />
  );
}
