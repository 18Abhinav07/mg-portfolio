/**
 * Videos route. One featured film inside the signature bezel card, then the
 * rest as a thumbnail grid with duration chips. A media archive, not a wall of
 * icon cards: each entry is image-led with its own duration and category.
 */

import { useLanguage } from '../i18n/LanguageContext';
import { Reveal } from '../components/Reveal';
import { DoubleBezelCard } from '../components/DoubleBezelCard';
import { MediaSlot } from '../components/MediaSlot';
import { cn } from '../utils/cn';

export function Videos() {
  const { t, lang } = useLanguage();
  const v = t.videosPage;
  const [featured, ...rest] = v.items;

  return (
    <div className="min-h-screen bg-slateWhite pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <span className={cn(
            "font-sans text-xs font-bold uppercase text-saffron",
            lang === 'en' ? "tracking-[0.28em]" : "tracking-normal"
          )}>{t.nav.videos}</span>
          <h1 className="mt-4 font-hindi text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.08] text-parliament">
            {v.title}
          </h1>
          <p className="mt-4 max-w-2xl font-hindi text-lg leading-relaxed text-parliament/65">{v.intro}</p>
        </Reveal>

        <Reveal className="mt-12">
          <DoubleBezelCard innerClassName="grid lg:grid-cols-2">
            <div className="relative aspect-video w-full overflow-hidden lg:aspect-auto lg:min-h-[20rem]">
              <MediaSlot code="VIDEO_FEATURED" variant="video" label={featured.title} />
            </div>
            <div className="flex flex-col justify-center gap-3 p-8 md:p-10">
              <span className={cn(
                "w-fit rounded-full bg-saffron/12 px-3 py-1 font-sans text-xs font-bold uppercase text-saffron",
                lang === 'en' ? "tracking-[0.18em]" : "tracking-normal"
              )}>
                {v.featuredLabel}
              </span>
              <h2 className="font-hindi text-3xl font-bold text-parliament">{featured.title}</h2>
              <div className="flex items-center gap-3 font-sans text-sm text-parliament/75">
                <span>{featured.category}</span>
                <span className="h-1 w-1 rounded-full bg-parliament/30" />
                <span className="tabular-nums">{featured.duration}</span>
              </div>
            </div>
          </DoubleBezelCard>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <button className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-4 focus-visible:ring-offset-slateWhite rounded-2xl">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <MediaSlot code={`VIDEO_${String(i + 2).padStart(2, '0')}`} variant="video" label={item.title} />
                  <span className="absolute bottom-2 right-2 rounded-md bg-parliament/85 px-2 py-0.5 font-sans text-xs font-medium tabular-nums text-white">
                    {item.duration}
                  </span>
                </div>
                <h3 className="mt-3 font-hindi text-lg font-bold text-parliament transition-colors duration-300 group-hover:text-saffron">
                  {item.title}
                </h3>
                <p className={cn(
                  "font-sans text-xs uppercase text-parliament/70",
                  lang === 'en' ? "tracking-[0.16em]" : "tracking-normal"
                )}>{item.category}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
