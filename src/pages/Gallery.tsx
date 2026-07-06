/**
 * Gallery route. A filtered masonry of campaign imagery. Filter pills narrow by
 * category; tapping a tile opens a lightbox (the correct affordance for viewing
 * a single image full-size, closeable by backdrop, button, or Escape). Tiles
 * are placeholders until real assets land, keyed by stable codes.
 */

import { useEffect, useState } from 'react';
import { X } from '@phosphor-icons/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Reveal } from '../components/Reveal';
import { MediaSlot } from '../components/MediaSlot';
import { cn } from '../utils/cn';

interface GalleryItem {
  code: string;
  category: string;
  aspect: string;
}

const ITEMS: GalleryItem[] = [
  { code: 'GAL_01', category: 'events', aspect: 'aspect-[4/5]' },
  { code: 'GAL_02', category: 'public', aspect: 'aspect-square' },
  { code: 'GAL_03', category: 'party', aspect: 'aspect-[3/4]' },
  { code: 'GAL_04', category: 'service', aspect: 'aspect-[4/3]' },
  { code: 'GAL_05', category: 'events', aspect: 'aspect-square' },
  { code: 'GAL_06', category: 'public', aspect: 'aspect-[3/4]' },
  { code: 'GAL_07', category: 'service', aspect: 'aspect-[4/5]' },
  { code: 'GAL_08', category: 'party', aspect: 'aspect-[4/3]' },
  { code: 'GAL_09', category: 'events', aspect: 'aspect-[3/4]' },
  { code: 'GAL_10', category: 'public', aspect: 'aspect-[4/5]' },
  { code: 'GAL_11', category: 'service', aspect: 'aspect-square' },
  { code: 'GAL_12', category: 'party', aspect: 'aspect-[3/4]' },
];

export function Gallery() {
  const { t, lang } = useLanguage();
  const g = t.galleryPage;
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState<string | null>(null);

  const labelOf = (key: string) => g.filters.find((f) => f.key === key)?.label ?? key;
  const visible = filter === 'all' ? ITEMS : ITEMS.filter((i) => i.category === filter);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <div className="min-h-screen bg-slateWhite pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <span className={cn(
            "font-sans text-xs font-bold uppercase text-saffron",
            lang === 'en' ? "tracking-[0.28em]" : "tracking-normal"
          )}>{t.nav.gallery}</span>
          <h1 className="mt-4 font-hindi text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.08] text-parliament">
            {g.title}
          </h1>
          <p className="mt-4 max-w-2xl font-hindi text-lg leading-relaxed text-parliament/65">{g.intro}</p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {g.filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-full px-5 py-2 font-hindi text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-slateWhite',
                filter === f.key
                  ? 'bg-saffron text-white shadow-sm'
                  : 'bg-parliament/5 text-parliament/70 hover:bg-parliament/10',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 font-hindi text-parliament/50">{g.empty}</p>
        ) : (
          <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {visible.map((item) => (
              <button
                key={item.code}
                onClick={() => setActive(item.code)}
                className="group block w-full break-inside-avoid overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-slateWhite"
              >
                <div className={cn('w-full', item.aspect)}>
                  <MediaSlot code={item.code} label={labelOf(item.category)} />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-parliament/90 p-4 backdrop-blur-sm"
        >
          <button
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-hindi text-sm text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-parliament"
          >
            <X size={18} weight="bold" /> {g.close}
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-2rem bg-white"
          >
            <MediaSlot code={active} />
          </div>
        </div>
      )}
    </div>
  );
}
