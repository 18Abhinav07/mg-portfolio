/**
 * Seva zone (#seva). The record of work on the ground. A numbered ledger, not
 * a card wall: a sticky heading on the left, six service areas as full-width
 * rows on the right, each led by a large index and split by hairlines. Light
 * band; saffron stays restrained here so it can peak at Honors next.
 *
 * Signature motion: the six rows resolve as a ledger being read, top to bottom.
 * Each row enters as a coordinated pair, the index sliding in from the left a
 * beat before its title and description lift up, scroll triggered once and
 * staggered down the column. Underneath, the ledger's top border draws across
 * scrubbed to scroll, so the spine of the list is always being written as the
 * reader moves rather than snapping once and freezing. Transform and opacity
 * only. A static branch honours prefers-reduced-motion (rows shown in place,
 * border fully drawn, no entrance).
 *
 * Each row is presentational, not a link, so hover reads as emphasis rather
 * than a clickable affordance: a faint saffron wash lifts the row while the
 * index brightens and nudges up in scale. The title stays in high-contrast
 * navy (saffron text on this light band would miss WCAG AA), so saffron
 * carries identity without shouting.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../i18n/LanguageContext';
import { SectionHeading } from '../SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export function Seva() {
  const { t } = useLanguage();
  const s = t.seva;
  const ledgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ledger = ledgerRef.current;
    if (!ledger) return;

    const rows = gsap.utils.toArray<HTMLElement>('[data-seva-row]', ledger);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      // Static branch: every row resolved in place, no entrance.
      rows.forEach((row) => {
        gsap.set(row.querySelectorAll('[data-seva-index], [data-seva-body]'), { opacity: 1, x: 0, y: 0 });
      });
      const borderEl = ledger.querySelector('[data-seva-border]');
      if (borderEl) gsap.set(borderEl, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      rows.forEach((row, i) => {
        const index = row.querySelector('[data-seva-index]');
        const body = row.querySelector('[data-seva-body]');
        if (!index || !body) return;
        // Index slides in from the left a beat before its line of copy lifts up:
        // a ledger read top to bottom, number first, then the work it stands for.
        gsap
          .timeline({
            delay: i * 0.08,
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          })
          .fromTo(index, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' })
          .fromTo(
            body,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            '-=0.32',
          );
      });
      const borderEl = ledger.querySelector('[data-seva-border]');
      if (borderEl) {
        // The ledger spine writes itself as the reader scrolls the list, rather
        // than drawing once and freezing: scaleX scrubbed across the column.
        gsap.fromTo(
          borderEl,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left',
            scrollTrigger: { trigger: ledger, start: 'top 80%', end: 'bottom 70%', scrub: 0.6 },
          },
        );
      }
    }, ledger);

    return () => ctx.revert();
  }, [s.areas.length]);

  return (
    <section id="seva" className="relative w-full scroll-mt-24 bg-slateWhite py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
            </div>
          </div>

          <div ref={ledgerRef} className="lg:col-span-8">
            <div
              aria-hidden="true"
              data-seva-border
              className="h-px w-full origin-left bg-parliament/10"
            />
            {s.areas.map((area, i) => (
              <div
                key={area.title}
                data-seva-row
                className="group grid grid-cols-[auto_1fr] items-start gap-5 border-b border-parliament/10 py-7 transition-colors duration-300 hover:bg-saffron/[0.05] md:gap-8 md:py-8"
              >
                <span
                  data-seva-index
                  className="pl-3 pt-1 font-sans text-sm font-bold tabular-nums text-parliament/45 transition-[color,transform] duration-300 group-hover:text-parliament/70 group-hover:scale-[1.05] md:pl-4"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div data-seva-body>
                  <h3 className="font-hindi text-2xl font-bold leading-tight text-parliament">{area.title}</h3>
                  <p className="mt-2 max-w-[38rem] font-hindi leading-relaxed text-parliament/70">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
