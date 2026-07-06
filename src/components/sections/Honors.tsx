/**
 * Honors zone (#honors). The saffron peak of the page: the one band where the
 * identity color owns the full surface. Recognition laid out as a tall list of
 * four, each with an oversized year and a hairline rule, white on a deep burnt
 * saffron. No cards; the color carries the emotional weight.
 *
 * The surface is a deliberately deepened saffron (radial #B8470A to #7A2900).
 * Lighter saffron cannot hold white at WCAG AA (full white tops out near
 * 2.4:1 on #FF8A33); deepening the gradient lets every white layer pass while
 * the band still reads unmistakably as the brand peak.
 *
 * Signature motion: a ledger of recognition being inscribed, top to bottom.
 * For each honor the oversized year is the recognition beat: its hairline rule
 * draws across (scaleX from the left) as the year lifts into place, then the
 * title and org rise a beat later. Scroll triggered once and staggered down
 * the list. Beneath that, two continuous scroll-linked layers keep the band
 * alive after the rows settle: the giant years drift slowly against the page
 * (parallax depth on the year column), and the saffron vignette breathes,
 * deepening through the middle of the band and easing back out. The opener
 * writes itself in reading order on its own trigger. Transform and opacity
 * only. This is distinct from Journey (a single scroll scrubbed rail) and Seva
 * (index sliding in before its body): here each row writes its own rule, and
 * the giant year leads. A static branch honours prefers-reduced-motion
 * (everything resolved in place, rules fully drawn, vignette steady).
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function Honors() {
  const { t } = useLanguage();
  const h = t.honors;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    const heading = headingRef.current;
    if (!section || !list) return;

    const rows = gsap.utils.toArray<HTMLElement>('[data-honor-row]', list);
    const yearWraps = gsap.utils.toArray<HTMLElement>('[data-honor-year-wrap]', list);
    const headingLines = heading ? Array.from(heading.children) : [];
    const vignette = section.querySelector('[data-honors-vignette]');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      // Static branch: every layer resolved in place, rules fully drawn.
      if (headingLines.length) gsap.set(headingLines, { opacity: 1, y: 0 });
      rows.forEach((row) => {
        gsap.set(row.querySelectorAll('[data-honor-year], [data-honor-body]'), { opacity: 1, y: 0 });
        gsap.set(row.querySelectorAll('[data-honor-rule]'), { scaleX: 1 });
      });
      if (vignette) gsap.set(vignette, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // The opener writes itself in reading order before the ledger begins.
      if (headingLines.length) {
        gsap.fromTo(
          headingLines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: heading, start: 'top 85%', once: true },
          },
        );
      }

      rows.forEach((row, i) => {
        const rules = row.querySelectorAll('[data-honor-rule]');
        const year = row.querySelector('[data-honor-year]');
        const body = row.querySelector('[data-honor-body]');
        if (rules.length === 0 || !year || !body) return;

        // The recognition beat: the rule writes across and the giant year lifts
        // together, then the citation (title and org) rises a beat behind it.
        gsap
          .timeline({
            delay: i * 0.09,
            scrollTrigger: { trigger: row, start: 'top 86%', once: true },
          })
          .fromTo(rules, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power4.out' })
          .fromTo(
            year,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
            '-=0.6',
          )
          .fromTo(
            body,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            '-=0.42',
          );
      });

      // Continuous depth: the giant years drift against the page on scroll. The
      // drift rides a wrapper element so it never fights the entrance y-tween on
      // the year itself.
      if (yearWraps.length) {
        gsap.fromTo(
          yearWraps,
          { y: 26 },
          {
            y: -26,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          },
        );
      }

      // The vignette breathes with scroll instead of fading in once: it deepens
      // through the middle of the band, then eases back out as the band leaves.
      if (vignette) {
        gsap
          .timeline({
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          })
          .fromTo(vignette, { opacity: 0.15 }, { opacity: 0.85, ease: 'none' })
          .to(vignette, { opacity: 0.3, ease: 'none' });
      }
    }, section);

    return () => ctx.revert();
  }, [h.items.length]);

  return (
    <section
      ref={sectionRef}
      id="honors"
      className="relative w-full scroll-mt-24 overflow-hidden py-24 text-slateWhite md:py-36"
      style={{
        background: 'radial-gradient(130% 120% at 15% 0%, #B8470A 0%, #9E3600 45%, #7A2900 100%)',
      }}
    >
      <div
        aria-hidden="true"
        data-honors-vignette
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-saffron/10 to-transparent opacity-0"
      />
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div ref={headingRef} className="max-w-2xl">
          <span className="block font-sans text-xs font-bold uppercase tracking-[0.25em] text-slateWhite/90">
            {h.eyebrow}
          </span>
          <h2 className="mt-4 font-hindiSerif text-[clamp(2.1rem,4.5vw,3.4rem)] font-extrabold leading-[1.08] text-balance">
            {h.title}
          </h2>
          <p className="mt-5 font-hindi text-lg leading-relaxed text-slateWhite/90">{h.intro}</p>
        </div>

        <ol ref={listRef} className="mt-14">
          {h.items.map((item, index) => (
            <li
              key={item.title + item.org}
              data-honor-row
              className="relative grid grid-cols-1 gap-2 py-7 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-8 md:py-9"
            >
              {/* Hairline rule that writes across as the row resolves. Decorative. */}
              <span
                aria-hidden="true"
                data-honor-rule
                className="absolute inset-x-0 top-0 h-px origin-left bg-slateWhite/30"
              />
              {/* Wrapper carries the scroll parallax; the inner span carries the
                  entrance lift, so the two transforms never fight. */}
              <div data-honor-year-wrap>
                <span
                  data-honor-year
                  className="inline-block font-hindi text-xl font-bold text-slateWhite/70 md:text-2xl"
                >
                  {item.year}
                </span>
              </div>
              <div data-honor-body>
                <h3 className="font-hindiSerif text-xl font-bold leading-tight md:text-2xl">{item.title}</h3>
                <p className="mt-1.5 font-hindi text-slateWhite/90">{item.org}</p>
              </div>
              {/* Closing rule under the final honor, so the list reads as bounded. */}
              {index === h.items.length - 1 && (
                <span
                  aria-hidden="true"
                  data-honor-rule
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-slateWhite/30"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
