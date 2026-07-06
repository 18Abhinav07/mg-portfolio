/**
 * Home route. The full narrative descent: the constellation hero resolving to
 * the solo portrait, then identity, journey, service, honors (the saffron
 * peak), the archive gateways, and the institutional contact close.
 */

import HeroConstellation from '../components/HeroConstellation';
import { ScrollSpine } from '../components/ScrollSpine';
import { About } from '../components/sections/About';
import { Journey } from '../components/sections/Journey';
import { Seva } from '../components/sections/Seva';
import { Honors } from '../components/sections/Honors';
import { Explore } from '../components/sections/Explore';
import { Contact } from '../components/sections/Contact';

export function Home() {
  return (
    <>
      <ScrollSpine />
      <HeroConstellation />
      <About />
      <Journey />
      <Seva />
      <Honors />
      <Explore />
      <Contact />
    </>
  );
}
