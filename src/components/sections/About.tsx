/**
 * About zone (#about). Editorial two-column: a tall framed portrait with a
 * pull-quote on the left, the narrative and a hairline fact grid on the right.
 * Light band. First content the visitor meets after the hero, so it leads
 * with the person, not a card wall.
 *
 * Signature motion: the zone arrives as one introduction. The portrait lifts
 * in first as the anchor, the pull-quote settles beneath it a beat later, the
 * lead and narrative cascade in beside it, and the fact grid resolves last on
 * its own trigger. Underneath, the portrait column drifts up a touch slower
 * than the page on scroll, so the person sits a beat behind the words.
 * Transform and opacity only; the whole choreography collapses to a static,
 * fully visible layout under prefers-reduced-motion.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../i18n/LanguageContext';
import { SectionHeading } from '../SectionHeading';
import { DoubleBezelCard } from '../DoubleBezelCard';
import { MediaSlot } from '../MediaSlot';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const { t, lang } = useLanguage();
  const a = t.about;

  const sectionRef = useRef<HTMLElement>(null);
  const portraitColRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const col = portraitColRef.current;
    const portrait = portraitRef.current;
    const quote = quoteRef.current;
    const text = textRef.current;
    const chips = chipsRef.current;
    if (!section || !col || !portrait || !quote || !text || !chips) return;

    const textKids = Array.from(text.children);
    const chipKids = Array.from(chips.children);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([portrait, quote, ...textKids, ...chipKids], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Scroll-linked depth: the portrait column drifts up a touch slower than
      // the page, so the person sits a beat behind the words.
      gsap.to(col, {
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });

      // The introduction: portrait anchors first, then the quote, then the
      // narrative cascades in beside it. All fire off the section entering view.
      const enter = { trigger: section, start: 'top 80%', once: true } as const;

      gsap.fromTo(
        portrait,
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, ease: 'power4.out', delay: 0.05, scrollTrigger: enter },
      );
      gsap.fromTo(
        quote,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3, scrollTrigger: enter },
      );
      gsap.fromTo(
        textKids,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.12, stagger: 0.09, scrollTrigger: enter },
      );

      // The fact grid is lower on the page, so it sequences off its own entry.
      gsap.fromTo(
        chipKids,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: chips, start: 'top 88%', once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full scroll-mt-24 bg-slateWhite py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div ref={portraitColRef} className="lg:col-span-5">
            <figure className="group">
              <div ref={portraitRef}>
                <DoubleBezelCard className="transition-shadow duration-500 ease-spring group-hover:shadow-md">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <div className="h-full w-full transition-transform duration-700 ease-spring group-hover:scale-[1.03]">
                      <MediaSlot code="PORTRAIT_ABOUT" label={a.portraitLabel} />
                    </div>
                  </div>
                </DoubleBezelCard>
              </div>
              <blockquote ref={quoteRef} className="relative mt-8 border-l-2 border-saffron/60 pl-6 italic">
                <p className="text-pretty font-hindiSerif text-xl leading-relaxed text-parliament/90">
                  {a.quote}
                </p>
                <figcaption className={cn(
                  "mt-3 font-sans text-[0.7rem] font-bold uppercase text-parliament/50",
                  lang === 'en' ? "tracking-[0.22em]" : "tracking-normal"
                )}>
                  — {a.quoteAttribution}
                </figcaption>
              </blockquote>
            </figure>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading eyebrow={a.eyebrow} title={a.title} />

            <div ref={textRef} className="mt-8 max-w-[44rem] space-y-5">
              <p className="text-pretty font-hindi text-xl leading-relaxed text-parliament/90">{a.lead}</p>
              {a.body.map((para, i) => (
                <p key={i} className="text-pretty font-hindi text-base leading-relaxed text-parliament/75">
                  {para}
                </p>
              ))}
            </div>

            <dl
              ref={chipsRef}
              className="mt-10 grid grid-cols-2 gap-3 sm:gap-4"
            >
              {a.chips.map((chip) => (
                <div
                  key={chip.label}
                  className={cn(
                    "bg-white border border-black/[0.04] p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:border-saffron/20 hover:shadow-[0_4px_20px_rgba(255,107,0,0.03)]",
                    (chip.label === 'पता' || chip.label === 'Address' || chip.label === 'संकल्प' || chip.label === 'Resolve' || chip.label === 'दायित्व' || chip.label === 'Role') ? "col-span-2" : "col-span-1"
                  )}
                >
                  <dt className={cn(
                    "font-sans text-[0.65rem] font-bold uppercase text-saffron",
                    lang === 'en' ? "tracking-[0.2em]" : "tracking-normal"
                  )}>
                    {chip.label}
                  </dt>
                  <dd className="mt-1.5 font-hindi text-base font-medium text-parliament">{chip.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
