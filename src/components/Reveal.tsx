/**
 * Scroll reveal: fade + short Y-translate as the element enters view, once.
 * Transform and opacity only. Collapses to static layout when the user
 * prefers reduced motion. Children stagger when `stagger` is set and the
 * element has multiple direct children worth animating.
 */

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../utils/cn';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  /** Animate direct children in sequence instead of the element as a whole. */
  stagger?: number;
}

export function Reveal({ children, className, as: Tag = 'div', delay = 0, y = 24, stagger }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? el.children : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
