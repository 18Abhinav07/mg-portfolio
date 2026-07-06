/**
 * Media route. A press archive read as an editorial list, not a card grid: each
 * clipping is a full-width row with outlet and date on the left, headline and
 * excerpt on the right, split by hairlines. Reads like a paper of record.
 */

import { ArrowUpRight } from '@phosphor-icons/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Reveal } from '../components/Reveal';
import { cn } from '../utils/cn';

export function Media() {
  const { t, lang } = useLanguage();
  const m = t.mediaPage;

  return (
    <div className="min-h-screen bg-slateWhite pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <Reveal>
          <span className={cn(
            "font-sans text-xs font-bold uppercase text-saffron",
            lang === 'en' ? "tracking-[0.28em]" : "tracking-normal"
          )}>{t.nav.media}</span>
          <h1 className="mt-4 font-hindi text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.08] text-parliament">
            {m.title}
          </h1>
          <p className="mt-4 max-w-2xl font-hindi text-lg leading-relaxed text-parliament/65">{m.intro}</p>
        </Reveal>

        <div className="mt-12 border-t border-black/10">
          {m.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="group grid gap-3 border-b border-black/10 py-8 md:grid-cols-[12rem_1fr] md:gap-8 md:py-10">
                <div className="font-sans">
                  <p className={cn(
                    "text-sm font-bold uppercase text-saffron",
                    lang === 'en' ? "tracking-[0.16em]" : "tracking-normal"
                  )}>{item.outlet}</p>
                  <p className="mt-1 text-sm text-parliament/50">{item.date}</p>
                </div>
                <div>
                  <h2 className="font-hindi text-2xl font-bold text-parliament transition-colors duration-300 group-hover:text-saffron md:text-[1.7rem]">
                    {item.title}
                  </h2>
                  <p className="mt-2 max-w-2xl font-hindi leading-relaxed text-parliament/65">{item.excerpt}</p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-parliament transition-colors duration-300 hover:text-saffron"
                  >
                    {m.readMore}
                    <ArrowUpRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
