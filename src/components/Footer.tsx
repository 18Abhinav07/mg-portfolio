/**
 * Site footer. Dark parliament zone that closes the page. Brand mark and
 * tagline, a short explore column linking to the archive routes, and a
 * connect column with social icons. A thin saffron rule divides the brand
 * band from the link bands.
 */

import { Link } from 'react-router-dom';
import { FacebookLogo, InstagramLogo, XLogo, YoutubeLogo } from '@phosphor-icons/react';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../utils/cn';

const SOCIALS = [
  { Icon: FacebookLogo, label: 'Facebook' },
  { Icon: XLogo, label: 'X' },
  { Icon: InstagramLogo, label: 'Instagram' },
  { Icon: YoutubeLogo, label: 'YouTube' },
];

export function Footer() {
  const { t, lang } = useLanguage();
  const year = 2026;

  return (
    <footer className="w-full bg-parliament text-slateWhite">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex flex-col">
              <p className="font-hindi text-2xl font-bold leading-tight">{t.brand.name}</p>
              <p className={cn(
                "mt-1 font-sans text-xs uppercase text-slateWhite/75",
                lang === 'en' ? "tracking-[0.2em]" : "tracking-normal"
              )}>
                {t.brand.party}
              </p>
            </div>
            <p className="mt-6 max-w-sm font-hindi text-slateWhite/70 leading-relaxed">{t.footer.tagline}</p>
          </div>

          <nav className="md:col-span-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-saffron">
              {t.footer.exploreHeading}
            </h3>
            <ul className="mt-5 space-y-3 font-hindi text-slateWhite/75">
              <li>
                <Link to="/gallery" className="transition-colors duration-300 hover:text-slateWhite focus:outline-none focus-visible:underline focus-visible:underline-offset-4">
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link to="/videos" className="transition-colors duration-300 hover:text-slateWhite focus:outline-none focus-visible:underline focus-visible:underline-offset-4">
                  {t.nav.videos}
                </Link>
              </li>
              <li>
                <Link to="/media" className="transition-colors duration-300 hover:text-slateWhite focus:outline-none focus-visible:underline focus-visible:underline-offset-4">
                  {t.nav.media}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-saffron">
              {t.footer.connectHeading}
            </h3>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-slateWhite/10 text-slateWhite/80 transition-all duration-500 ease-spring hover:bg-saffron hover:text-slateWhite focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-parliament"
                >
                  <Icon size={20} weight="fill" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-slateWhite/10 pt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-xs tracking-wide text-slateWhite/75">
            © {year} {t.brand.name}. {t.footer.rights}
          </p>
          <p className="font-hindi text-xs text-slateWhite/75">{t.brand.constituency}</p>
        </div>
      </div>
    </footer>
  );
}
