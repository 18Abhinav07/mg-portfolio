/**
 * Shared section opener: a saffron eyebrow, a large bilingual title, an
 * optional intro line, and a short saffron rule. Left-aligned by default;
 * `center` for the few zones that read better centered. Keeps every section's
 * entry typographically consistent without making the sections themselves
 * look alike — the layout below each heading is what varies.
 *
 * Signature motion: the opener writes itself in reading order. The eyebrow,
 * title, and intro lift in as a tight stagger, then the saffron rule draws
 * across to close the gesture, so every section's first beat is the same
 * confident inscription rather than a generic fade. Transform and opacity
 * only; a static branch resolves everything in place under
 * prefers-reduced-motion.
 */

import type { ReactNode } from 'react';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../utils/cn';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({ eyebrow, title, intro, center, tone = 'light', className }: SectionHeadingProps) {
  const { lang } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const rule = ruleRef.current;
    if (!root || !rule) return;

    // Reading-order text lines: eyebrow, title, and (when present) intro.
    const lines = [eyebrowRef.current, titleRef.current, introRef.current].filter(
      (el): el is HTMLElement => el !== null,
    );

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(lines, { opacity: 1, y: 0 });
      gsap.set(rule, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: root, start: 'top 85%', once: true } })
        .fromTo(
          lines,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 },
        )
        .fromTo(
          rule,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.4',
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={cn('flex flex-col', center ? 'items-center text-center' : 'items-start', className)}>
      <span ref={eyebrowRef} className={cn(
        "font-sans text-xs font-bold uppercase text-saffron",
        lang === 'en' ? "tracking-[0.25em]" : "tracking-normal"
      )}>
        {eyebrow}
      </span>
      <h2
        ref={titleRef}
        className={cn(
          'mt-4 font-hindi font-bold leading-[1.08] text-[clamp(2rem,4.5vw,3.4rem)]',
          tone === 'dark' ? 'text-slateWhite' : 'text-parliament',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          ref={introRef}
          className={cn(
            'mt-5 max-w-2xl font-hindi text-lg leading-relaxed',
            tone === 'dark' ? 'text-slateWhite/70' : 'text-parliament/65',
          )}
        >
          {intro}
        </p>
      )}
      <span ref={ruleRef} className="mt-7 h-[3px] w-14 rounded-full bg-saffron" />
    </div>
  );
}
