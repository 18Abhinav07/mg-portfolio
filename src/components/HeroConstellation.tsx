import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaretDown } from '@phosphor-icons/react';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../utils/cn';

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic, no-text hero.
 *
 * STATE A (top): MG stands among the BJP's biggest names, composed as a
 *   depth-layered ensemble over a looping campaign film.
 * STATE B (on scroll): the senior leaders move away, a solo MG portrait
 *   slides in from the left, and his intro resolves alongside it.
 *
 * The looping background video and the dedicated intro portrait are custom
 * assets shipping later; the structure below swaps them in by path with no
 * layout change:
 *   - video  -> /hero/loop.mp4   (falls back to the cinematic gradient)
 *   - intro portrait -> reuses the ensemble cutout for now
 * Intro copy is bilingual, driven by the language toggle via useLanguage.
 */
export default function HeroConstellation() {
  const { t, lang } = useLanguage();
  const baseAsset = (path: string) => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  };
  const rootRef = useRef<HTMLElement>(null);

  const shahRef = useRef<HTMLImageElement>(null);
  const modiRef = useRef<HTMLImageElement>(null);
  const naddaRef = useRef<HTMLImageElement>(null);
  const dhamiRef = useRef<HTMLImageElement>(null);
  const nishankRef = useRef<HTMLImageElement>(null);
  const ensembleMgRef = useRef<HTMLImageElement>(null);

  const portraitRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  // Drives the static-vs-choreographed branch. Read once at mount: when
  // reduced motion is on, the hero must resolve to a fully-composed State-B
  // (solo portrait + intro visible) with no scroll dependency.
  const [reduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    // Reduced motion: no scroll choreography. Collapse the scroll track and
    // present the solo portrait + intro as a static, fully-visible hero.
    if (reduceMotion) {
      if (rootRef.current) rootRef.current.style.height = '100dvh';
      return;
    }

    const ctx = gsap.context(() => {
      const seniors = [
        naddaRef.current,
        shahRef.current,
        modiRef.current,
        dhamiRef.current,
        nishankRef.current,
      ];

      // Initial State-B states, set explicitly so scrub has a clean origin.
      gsap.set(portraitRef.current, { xPercent: -110, opacity: 0 });
      gsap.set(introRef.current, { xPercent: 40, opacity: 0 });

      // Scroll-cue idle float — gentle, ease-in-out (no bounce/elastic), and
      // only in the animated branch (reduced motion returns before this).
      gsap.to(cueRef.current, {
        y: 6,
        duration: 1.1,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Scroll cue fades the moment motion begins.
      tl.to(cueRef.current, { opacity: 0, ease: 'power1.in' }, 0);

      // Whole left-corner group sweeps off to the left. One target list so
      // every senior animates identically, no member left behind.
      tl.to(
        seniors,
        { xPercent: -260, opacity: 0, ease: 'power2.in', stagger: 0.05 },
        0,
      );

      // Ensemble MG (right) slides off the right edge as the solo takes over.
      tl.to(ensembleMgRef.current, { xPercent: 70, opacity: 0, ease: 'power2.in' }, 0);

      // Solo MG portrait slides in from the left.
      tl.to(portraitRef.current, { xPercent: 0, opacity: 1, ease: 'power3.out' }, 0.28);

      // Intro resolves alongside.
      tl.to(introRef.current, { xPercent: 0, opacity: 1, ease: 'power3.out' }, 0.46);

      // Saffron rule draws left-to-right after the intro panel has resolved.
      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top -70%',
            once: true,
          },
        },
      );
    }, rootRef);

    // Big MG cutout loads after init; recompute trigger bounds when it lands.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [reduceMotion]);

  return (
    <section ref={rootRef} className="relative w-full h-[260vh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-slateWhite">

        {/* ---- Background: looping campaign film (custom asset later) ---- */}
        {/* Light studio gradient — also the no-video fallback. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 4%, #FCFCFD 0%, #F8F9FA 52%, #e9edf1 100%)',
          }}
        />
        {/* Autoplay loop is continuous motion: suppressed under reduced motion,
            where the static gradient above stands in. */}
        {!reduceMotion && (
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
          >
            <source src={baseAsset('/hero/loop.mp4')} type="video/mp4" />
          </video>
        )}

        {/* Grounded floor — soft shadow line so figures stand, not float. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
          style={{ background: 'linear-gradient(to top, #dfe4e9 0%, transparent 100%)' }}
        />

        {/* ================= STATE A — ensemble =================
            Left corner: the senior model group, packed left-to-right
            Nadda, Shah, Modi (front-center), Dhami, Nishank.
            Right: MG, prominent and saffron-rimmed, the star of the frame.

            Only rendered with motion: the static reduced-motion hero resolves
            to State-B (solo portrait + intro), so this ensemble does not
            stack over the solo layer. */}
        {!reduceMotion && (
          <>
         <img
          ref={naddaRef}
          src={baseAsset('/Politicians/models/jp_nadda_nobg.png')}
          alt="JP Nadda"
          className="absolute bottom-0 left-[-4%] z-[24] hidden h-[40vh] w-auto object-contain sm:block md:h-[44vh]"
          style={{ filter: 'brightness(0.94)' }}
        />
        <img
          ref={shahRef}
          src={baseAsset('/Politicians/models/amit_shah_nobg.png')}
          alt="Amit Shah"
          className="absolute bottom-0 left-[8%] z-[23] h-[45vh] w-auto object-contain md:h-[49vh]"
          style={{ filter: 'brightness(0.97)' }}
        />
        <img
          ref={modiRef}
          src={baseAsset('/Politicians/models/modi_nobg.png')}
          alt="Narendra Modi"
          className="absolute bottom-0 left-[19%] z-[28] h-[52vh] w-auto object-contain md:h-[56vh]"
          style={{ filter: 'brightness(1)' }}
        />
        <img
          ref={dhamiRef}
          src={baseAsset('/Politicians/models/Dhami_nobg.png')}
          alt="Pushkar Singh Dhami"
          className="absolute bottom-0 left-[37%] z-[24] h-[45vh] w-auto object-contain md:h-[49vh]"
          style={{ filter: 'brightness(0.97)' }}
        />
        <img
          ref={nishankRef}
          src={baseAsset('/Politicians/models/rp_nishank_nobg.png')}
          alt="Ramesh Pokhriyal Nishank"
          className="absolute bottom-0 left-[48%] z-[22] hidden h-[40vh] w-auto object-contain sm:block md:h-[44vh]"
          style={{ filter: 'brightness(0.94)' }}
        />

        {/* Ensemble MG — right foreground, saffron rim. Right-anchored, so
            GSAP can own the image transform with no centering conflict. */}
        <div className="absolute bottom-0 right-[2%] z-30">
          <img
            ref={ensembleMgRef}
            src={baseAsset('/Politicians/models/mj_gautam_nobg.png')}
            alt="Manoj Kumar Gautam"
            decoding="async"
            className="h-[68vh] w-auto object-contain md:h-[74vh]"
            style={{ filter: 'drop-shadow(0 0 38px rgba(255,107,0,0.34)) brightness(1.06)' }}
          />
        </div>
          </>
        )}

        {/* ================= STATE B — solo MG + intro ================= */}
        {/* Outer overlay container */}
        <div className="absolute inset-x-0 bottom-0 top-0 z-30 pointer-events-none">
          <div className="relative max-w-7xl mx-auto h-full w-full px-4 md:px-8">
            {/* Solo portrait is size-controlled by the image; GSAP ref goes here */}
            <div
              ref={portraitRef}
              className="absolute bottom-0 left-4 md:left-8 pointer-events-auto"
              style={{ willChange: 'transform', opacity: reduceMotion ? 1 : 0 }}
            >
              <img
                src={baseAsset('/Politicians/models/mj_gautam_nobg.png')}
                alt="Manoj Kumar Gautam"
                decoding="async"
                className="h-[80vh] w-auto object-contain md:h-[88vh]"
                style={{ filter: 'drop-shadow(0 0 46px rgba(255,107,0,0.4)) brightness(1.06)' }}
              />
            </div>
          </div>
        </div>

        {/* Outer text overlay container */}
        <div className="absolute inset-0 z-40 pointer-events-none">
          <div className="relative max-w-7xl mx-auto h-full w-full px-4 md:px-8 flex items-end justify-end pb-[12%] md:items-center md:pb-0">
            {/* Text block is width-constrained; GSAP ref goes here */}
            <div
              ref={introRef}
              className="max-w-[88%] sm:max-w-[460px] pointer-events-auto"
              style={{ willChange: 'transform', opacity: reduceMotion ? 1 : 0 }}
            >
              <p className={cn(
                "font-sans text-sm font-bold uppercase text-saffron md:text-base",
                lang === 'en' ? "tracking-[0.18em]" : "tracking-normal"
              )}>
                {t.hero.party}
              </p>
              <h1 className="mt-3 font-hindi text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1.05] text-parliament">
                {t.hero.nameLine1}
                <br />
                {t.hero.nameLine2}
              </h1>
              <div ref={ruleRef} className="mt-4 h-[3px] w-16 rounded-full bg-saffron" />
              <p className="mt-4 font-hindi text-lg text-parliament/80 md:text-xl">
                {t.hero.constituency}
              </p>
              <p className="mt-3 max-w-sm font-hindi text-sm text-parliament/70 md:text-base">
                {t.hero.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue — gentle GSAP idle float, fades on first scroll. Hidden
            under reduced motion, where there is no scroll choreography. */}
        {!reduceMotion && (
          <div
            ref={cueRef}
            className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 text-parliament/45"
          >
            <CaretDown size={26} weight="bold" />
          </div>
        )}
      </div>
    </section>
  );
}
