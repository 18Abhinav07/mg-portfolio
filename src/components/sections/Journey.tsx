import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../i18n/LanguageContext';
import { SectionHeading } from '../SectionHeading';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

export function Journey() {
  const { t, lang } = useLanguage();
  const j = t.journey;
  const [tab, setTab] = useState<'rss' | 'political'>('rss');
  
  const railRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const milestones = tab === 'rss' ? j.rssMilestones : j.politicalMilestones;

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      // Static fully drawn rail. No scroll binding.
      gsap.set(rail, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(rail, { scaleY: 0, transformOrigin: 'top' });
      gsap.to(rail, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: track,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      });
    }, track);

    return () => ctx.revert();
  }, [tab]);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(listEl.querySelectorAll('[data-journey-dot],[data-journey-year],[data-journey-title],[data-journey-desc]'), { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('li', listEl);
      items.forEach((item, i) => {
        const dot = item.querySelector('[data-journey-dot]');
        const year = item.querySelector('[data-journey-year]');
        const title = item.querySelector('[data-journey-title]');
        const desc = item.querySelector('[data-journey-desc]');
        if (!dot || !year || !title || !desc) return;

        gsap
          .timeline({
            delay: i * 0.05,
            scrollTrigger: { trigger: item, start: 'top 85%', once: true },
          })
          .fromTo(dot, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' })
          .fromTo(year, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, '-=0.2')
          .fromTo(title, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.25')
          .fromTo(desc, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.25');
      });
    }, listEl);

    // Refresh scroll triggers since height of timeline changes
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [tab, milestones]);

  const tabLabels = lang === 'hi' ? {
    rss: 'संगठनात्मक यात्रा (RSS & ABVP)',
    political: 'राजनीतिक यात्रा (BJP)'
  } : {
    rss: 'Organisational (RSS & ABVP)',
    political: 'Political Career (BJP)'
  };

  return (
    <section id="journey" className="relative w-full scroll-mt-24 bg-parliament py-24 text-slateWhite md:py-36">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading eyebrow={j.eyebrow} title={j.title} intro={j.intro} tone="dark" />

        {/* Tab Switcher */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-full bg-slateWhite/5 p-1 border border-slateWhite/10">
            <button
              onClick={() => setTab('rss')}
              className={cn(
                "rounded-full px-5 py-2 md:px-7 md:py-2.5 font-hindi text-sm md:text-base font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron",
                tab === 'rss'
                  ? "bg-saffron text-white shadow-md"
                  : "text-slateWhite/70 hover:text-white"
              )}
            >
              {tabLabels.rss}
            </button>
            <button
              onClick={() => setTab('political')}
              className={cn(
                "rounded-full px-5 py-2 md:px-7 md:py-2.5 font-hindi text-sm md:text-base font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron",
                tab === 'political'
                  ? "bg-saffron text-white shadow-md"
                  : "text-slateWhite/70 hover:text-white"
              )}
            >
              {tabLabels.political}
            </button>
          </div>
        </div>

        <div ref={trackRef} className="relative mt-16 pl-9 md:pl-12">
          {/* Faint static track: the full span the line will fill. Decorative. */}
          <span
            aria-hidden="true"
            className="absolute left-1 top-2 bottom-2 w-0.5 rounded-full bg-slateWhite/[0.08]"
          />
          {/* Saffron progress line, scroll linked (scaleY from the top). Decorative. */}
          <span
            ref={railRef}
            aria-hidden="true"
            className="absolute left-1 top-2 bottom-2 w-0.5 origin-top rounded-full bg-gradient-to-b from-saffron via-saffron/70 to-transparent"
          />
          <ol ref={listRef} className="space-y-14">
            {milestones.map((m) => (
              <li key={m.year + m.title} className="relative">
                <span
                  data-journey-dot
                  aria-hidden="true"
                  className="absolute -left-9 top-[0.4rem] h-2.5 w-2.5 rounded-full bg-saffron ring-4 ring-saffron/25 md:-left-12"
                />
                <p data-journey-year className="font-sans text-sm font-bold uppercase tracking-[0.22em] tabular-nums text-saffron">{m.year}</p>
                <h3 data-journey-title className="mt-2.5 font-hindi text-2xl font-bold leading-tight text-slateWhite">{m.title}</h3>
                <p data-journey-desc className="mt-2.5 max-w-[42rem] font-hindi leading-relaxed text-slateWhite/70">{m.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
