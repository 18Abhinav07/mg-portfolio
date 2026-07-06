/**
 * Explore zone. The bridge from the home narrative to the deep archives:
 * gallery, videos, press. Three destination panels with live previews, sized
 * unevenly so it reads as a set of doors, not a row of identical cards. Light
 * band; saffron returns only on the call-to-action pills.
 *
 * Signature motion: the doors open from three directions, so no two read as
 * the same gesture. The gallery panel swings in from the left and the videos
 * panel from the right, the two parting like a pair of doors, then the full
 * width media door rises from below to close the set. Beneath the entrance,
 * each preview drifts against the page on scroll (an overscaled media layer
 * translated within the clipped frame), so the doors hold a sense of depth
 * after they open rather than snapping once and freezing. Each panel also
 * answers the pointer: the preview pushes in a touch, the card shadow deepens,
 * and the pill chip nudges right, all on fast ease-out feedback. Transform and
 * opacity only; a static branch resolves everything in place under
 * prefers-reduced-motion.
 */

import { useRef, useEffect, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ExploreCard } from '../../i18n/translations';
import { useLanguage } from '../../i18n/LanguageContext';
import { SectionHeading } from '../SectionHeading';
import { DoubleBezelCard } from '../DoubleBezelCard';
import { MediaSlot } from '../MediaSlot';

gsap.registerPlugin(ScrollTrigger);

// Shared focus ring on the door Links: the bezel card has no native outline of
// its own, so keyboard focus gets an explicit saffron ring offset off the card.
const doorLinkClass =
  'group block rounded-2rem outline-none ring-saffron/70 transition-shadow duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slateWhite';

function CtaPill({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-saffron py-2 pl-5 pr-2 font-medium text-slateWhite shadow-md transition-shadow duration-300 ease-spring group-hover:shadow-lg">
      {label}
      <span className="grid h-8 w-8 place-items-center rounded-full bg-slateWhite/25 transition-transform duration-300 ease-spring group-hover:translate-x-1">
        <ArrowRight size={16} weight="bold" aria-hidden="true" />
      </span>
    </span>
  );
}

function ExplorePanel({
  to,
  card,
  code,
  variant = 'image',
  panelRef,
}: {
  to: string;
  card: ExploreCard;
  code: string;
  variant?: 'image' | 'video';
  panelRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={panelRef} className="h-full">
      <Link to={to} className={doorLinkClass}>
        <DoubleBezelCard
          className="h-full transition-shadow duration-300 ease-spring group-hover:shadow-md"
          innerClassName="flex h-full flex-col"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            {/* Overscaled layer carries the scroll parallax within the clipped
                frame; the inner layer carries the hover scale, so they never fight. */}
            <div data-explore-media className="absolute inset-x-0 top-[-15%] h-[130%] w-full">
              <div className="h-full w-full transition-transform duration-500 ease-spring group-hover:scale-[1.03]">
                <MediaSlot code={code} variant={variant} label={card.title} />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-5 p-7">
            <div>
              <h3 className="text-balance font-hindiSerif text-2xl font-bold leading-tight text-parliament">
                {card.title}
              </h3>
              <p className="mt-2 max-w-prose text-pretty font-hindi leading-relaxed text-parliament/70">
                {card.desc}
              </p>
            </div>
            <CtaPill label={card.cta} />
          </div>
        </DoubleBezelCard>
      </Link>
    </div>
  );
}

function ExploreWide({ to, card, code, panelRef }: { to: string; card: ExploreCard; code: string; panelRef?: RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={panelRef}>
      <Link to={to} className={doorLinkClass}>
        <DoubleBezelCard
          className="transition-shadow duration-300 ease-spring group-hover:shadow-md"
          innerClassName="grid md:grid-cols-2"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:min-h-[16rem]">
            {/* Overscaled layer carries the scroll parallax within the clipped
                frame; the inner layer carries the hover scale, so they never fight. */}
            <div data-explore-media className="absolute inset-x-0 top-[-15%] h-[130%] w-full">
              <div className="h-full w-full transition-transform duration-500 ease-spring group-hover:scale-[1.03]">
                <MediaSlot code={code} label={card.title} />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 p-7 md:p-10">
            <div>
              <h3 className="text-balance font-hindiSerif text-2xl font-bold leading-tight text-parliament md:text-3xl">
                {card.title}
              </h3>
              <p className="mt-2 max-w-md text-pretty font-hindi leading-relaxed text-parliament/70">
                {card.desc}
              </p>
            </div>
            <CtaPill label={card.cta} />
          </div>
        </DoubleBezelCard>
      </Link>
    </div>
  );
}

export function Explore() {
  const { t } = useLanguage();
  const e = t.explore;

  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const wideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p1 = panel1Ref.current;
    const p2 = panel2Ref.current;
    const wide = wideRef.current;
    if (!p1 || !p2 || !wide) return;
    const panels = [p1, p2, wide];
    const previews = panels
      .map((p) => p.querySelector('[data-explore-media]'))
      .filter((el): el is HTMLElement => el !== null);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([p1, p2, wide], { opacity: 1, x: 0, y: 0 });
      if (previews.length) gsap.set(previews, { yPercent: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      // The doors part from three directions: gallery from the left, videos from
      // the right, then the wide media door rises from below to close the set.
      gsap.fromTo(p1, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power4.out', scrollTrigger: { trigger: p1, start: 'top 85%', once: true } });
      gsap.fromTo(p2, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power4.out', scrollTrigger: { trigger: p2, start: 'top 85%', once: true } });
      gsap.fromTo(wide, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', scrollTrigger: { trigger: wide, start: 'top 85%', once: true } });

      // Continuous depth: each overscaled preview drifts within its clipped frame
      // so the doors hold depth after they open instead of freezing once.
      previews.forEach((preview) => {
        gsap.fromTo(
          preview,
          { yPercent: -8 },
          { yPercent: 8, ease: 'none', scrollTrigger: { trigger: preview, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full bg-slateWhite py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={e.eyebrow} title={e.title} center />

        {/* The pair parts like doors (left in, right in), then the wide media
            door rises below. items-stretch keeps the equal pair matched in height. */}
        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2">
          <ExplorePanel to="/gallery" card={e.gallery} code="EXPLORE_GALLERY" panelRef={panel1Ref} />
          <ExplorePanel to="/videos" card={e.videos} code="EXPLORE_VIDEOS" variant="video" panelRef={panel2Ref} />
        </div>

        <div className="mt-6">
          <ExploreWide to="/media" card={e.media} code="EXPLORE_MEDIA" panelRef={wideRef} />
        </div>
      </div>
    </section>
  );
}
