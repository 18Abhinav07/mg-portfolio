/**
 * Contact zone (#contact). The institutional close before the footer: a dark
 * parliament band with office details and social links on the left, a working
 * message form on the right inside the signature bezel card. Saffron marks the
 * send action; a green confirmation replaces the form on submit.
 *
 * Signature motion: the close arrives as one settled gesture. The heading leads,
 * the office details lift in from the left one after another, the social row
 * follows on the same timeline, and the form card rises alongside the column,
 * so the band reads as a single confident close rather than parts popping in.
 * Once settled, the form card drifts a touch against the page on scroll (an
 * inner parallax layer, separate from its entrance), so the close holds depth
 * rather than freezing once. Transform and opacity only; a static branch
 * resolves everything in place under prefers-reduced-motion.
 */

import { useState, useEffect, useRef, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircle,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  PaperPlaneTilt,
  Phone,
  XLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SectionHeading } from '../SectionHeading';
import { DoubleBezelCard } from '../DoubleBezelCard';
import { NestedIslandButton } from '../NestedIslandButton';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { Icon: FacebookLogo, label: 'Facebook' },
  { Icon: XLogo, label: 'X' },
  { Icon: InstagramLogo, label: 'Instagram' },
  { Icon: YoutubeLogo, label: 'YouTube' },
];

export function Contact() {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const [sent, setSent] = useState(false);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setSent(true);
  };

  const details = [
    { Icon: MapPin, label: c.officeLabel, value: c.office, href: undefined },
    { Icon: Phone, label: c.phoneLabel, value: c.phone, href: `tel:${c.phone.replace(/\s+/g, '')}` },
    { Icon: EnvelopeSimple, label: c.emailLabel, value: c.email, href: `mailto:${c.email}` },
  ];

  const listRef = useRef<HTMLUListElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const formInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const formCard = formCardRef.current;
    const social = socialRef.current;
    const formInner = formInnerRef.current;
    if (!list || !formCard) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const items = list.querySelectorAll('li');
      gsap.set(items, { opacity: 1, x: 0, y: 0 });
      gsap.set(formCard, { opacity: 1, y: 0 });
      if (social) gsap.set(social, { opacity: 1, x: 0, y: 0 });
      if (formInner) gsap.set(formInner, { y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('li', list);
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -16, y: 8, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: list, start: 'top 85%', once: true },
          },
        );
      });

      // The social row follows the office lines on the same trigger, a beat after
      // the last line settles, so the left column reads as one continuous list.
      if (social) {
        gsap.fromTo(
          social,
          { x: -16, y: 8, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: items.length * 0.1,
            scrollTrigger: { trigger: list, start: 'top 85%', once: true },
          },
        );
      }

      gsap.fromTo(
        formCard,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: { trigger: formCard, start: 'top 85%', once: true },
        },
      );

      // Once settled, the form card drifts a touch against the page on scroll. The
      // drift rides an inner wrapper so it never fights the entrance y-tween on the
      // column itself.
      if (formInner) {
        gsap.fromTo(
          formInner,
          { y: 24 },
          {
            y: -24,
            ease: 'none',
            scrollTrigger: { trigger: formCard, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="relative w-full scroll-mt-24 bg-parliament py-24 text-slateWhite md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={c.eyebrow} title={c.title} intro={c.intro} tone="dark" />

            <ul ref={listRef} className="mt-10 space-y-6">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slateWhite/[0.08] text-saffron">
                    <d.Icon size={20} weight="bold" />
                  </span>
                  <div>
                    <p className={cn(
                      "font-sans text-xs font-bold uppercase text-slateWhite/50",
                      lang === 'en' ? "tracking-[0.2em]" : "tracking-normal"
                    )}>{d.label}</p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="font-hindi text-lg text-slateWhite underline-offset-4 transition-colors hover:text-saffron hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/60"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="font-hindi text-lg text-slateWhite">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div ref={socialRef} className="mt-10">
              <p className={cn(
                "font-sans text-xs font-bold uppercase text-slateWhite/50",
                lang === 'en' ? "tracking-[0.2em]" : "tracking-normal"
              )}>{c.socialLabel}</p>
              <div className="mt-4 flex gap-3">
                {SOCIALS.map(({ Icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={`${label} (${c.socialPending})`}
                    title={`${label} (${c.socialPending})`}
                    className="grid h-11 w-11 place-items-center rounded-full bg-slateWhite/[0.08] text-slateWhite/80 transition-all duration-500 ease-spring hover:bg-saffron hover:text-slateWhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/60 focus-visible:ring-offset-2 focus-visible:ring-offset-parliament"
                  >
                    <Icon size={20} weight="fill" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div ref={formCardRef} className="lg:col-span-7">
            {/* Inner wrapper carries the scroll parallax; the column carries the
                entrance, so the two transforms never fight. */}
            <div ref={formInnerRef}>
            <DoubleBezelCard innerClassName="p-7 md:p-10">
              {sent ? (
                <div
                  className="flex min-h-[20rem] flex-col items-center justify-center gap-4 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-organic/10 text-organic">
                    <CheckCircle size={36} weight="fill" />
                  </span>
                  <p className="max-w-sm font-hindi text-xl leading-relaxed text-parliament">{c.form.success}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className={cn(
                      "font-sans text-xs font-bold uppercase text-parliament/60",
                      lang === 'en' ? "tracking-[0.2em]" : "tracking-normal"
                    )}>
                      {c.form.name}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={c.form.namePlaceholder}
                      className="mt-2 min-h-[2.75rem] w-full rounded-xl border border-parliament/10 bg-slateWhite px-4 py-3 font-hindi text-parliament outline-none transition-colors duration-300 placeholder:text-parliament/50 focus:border-saffron focus:ring-2 focus:ring-saffron/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className={cn(
                      "font-sans text-xs font-bold uppercase text-parliament/60",
                      lang === 'en' ? "tracking-[0.2em]" : "tracking-normal"
                    )}>
                      {c.form.message}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder={c.form.messagePlaceholder}
                      className="mt-2 w-full resize-none rounded-xl border border-parliament/10 bg-slateWhite px-4 py-3 font-hindi text-parliament outline-none transition-colors duration-300 placeholder:text-parliament/50 focus:border-saffron focus:ring-2 focus:ring-saffron/40"
                    />
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <NestedIslandButton type="submit" icon={<PaperPlaneTilt size={16} weight="bold" />}>
                      {c.form.send}
                    </NestedIslandButton>
                    <p className="font-hindi text-sm text-parliament/65">{c.form.note}</p>
                  </div>
                </form>
              )}
            </DoubleBezelCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
