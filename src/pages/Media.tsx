/**
 * Media route. A press archive read as an editorial list, not a card grid: each
 * clipping is a full-width row with outlet and date on the left, headline and
 * excerpt on the right, split by hairlines. Reads like a paper of record.
 */

import { useState } from 'react';
import { ArrowUpRight, MagnifyingGlass } from '@phosphor-icons/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Reveal } from '../components/Reveal';
import { cn } from '../utils/cn';

export function Media() {
  const { t, lang } = useLanguage();
  const m = t.mediaPage;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('all');

  // Extract unique outlets list dynamically
  const outlets = ['all', ...Array.from(new Set(m.items.map(item => item.outlet)))];

  const filteredItems = m.items.filter(item => {
    const matchesOutlet = selectedOutlet === 'all' || item.outlet === selectedOutlet;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.outlet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOutlet && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slateWhite pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <Reveal>
          <span className={cn(
            "font-sans text-xs font-bold uppercase text-saffron",
            lang === 'en' ? "tracking-[0.28em]" : "tracking-normal"
          )}>{t.nav.media}</span>
          <h1 className="mt-4 font-hindiSerif text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.08] text-parliament">
            {m.title}
          </h1>
          <p className="mt-4 max-w-2xl font-hindi text-lg leading-relaxed text-parliament/65">{m.intro}</p>
        </Reveal>

        {/* Search & Filter Controls */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between border-b border-black/10 pb-6">
            {/* Outlet filter pills */}
            <div className="flex flex-wrap gap-2">
              {outlets.map((outlet) => (
                <button
                  key={outlet}
                  onClick={() => setSelectedOutlet(outlet)}
                  className={cn(
                    "rounded-full px-4.5 py-1.5 font-hindi text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-slateWhite",
                    selectedOutlet === outlet
                      ? "bg-saffron text-white shadow-sm"
                      : "bg-black/[0.03] text-parliament/70 hover:bg-black/[0.06] hover:text-parliament"
                  )}
                >
                  {outlet === 'all' ? (lang === 'hi' ? 'सभी समाचार' : 'All Outlets') : outlet}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-parliament/40">
                <MagnifyingGlass size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'hi' ? 'समाचार खोजें...' : 'Search clippings...'}
                className="w-full rounded-full border border-black/10 bg-black/[0.02] py-2 pl-10 pr-4 text-sm font-hindi text-parliament placeholder-parliament/40 outline-none transition-all duration-300 focus:border-saffron/40 focus:bg-white focus:shadow-sm"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-4">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center border-t border-black/10">
              <p className="font-hindi text-lg text-parliament/50">
                {lang === 'hi' ? 'कोई परिणाम नहीं मिला।' : 'No results found.'}
              </p>
            </div>
          ) : (
            <div className="border-t border-black/10">
              {filteredItems.map((item, i) => (
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
                      <h2 className="font-hindiSerif text-2xl font-bold text-parliament transition-colors duration-300 group-hover:text-saffron md:text-[1.7rem]">
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
          )}
        </div>
      </div>
    </div>
  );
}
