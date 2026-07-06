import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const heroSource = readFileSync(new URL('../HeroConstellation.tsx', import.meta.url), 'utf8');
const aboutSource = readFileSync(
  new URL('../sections/About.tsx', import.meta.url),
  'utf8',
);

test('hero starts directly in the solo mobile composition', () => {
  assert.match(heroSource, /max-width: 1023px/);
  assert.match(heroSource, /h-\[100svh\]\s+lg:h-\[260vh\]/);
  assert.match(heroSource, /h-\[56svh\]\s+sm:h-\[62svh\]\s+lg:h-\[88vh\]/);
  assert.match(heroSource, /pt-24\s+sm:pt-28\s+lg:items-center\s+lg:justify-end\s+lg:pt-0/);
  assert.match(heroSource, /isCompactHero/);
  assert.match(heroSource, /if \(reduceMotion \|\| isCompactHero\)/);
  assert.match(heroSource, /opacity: reduceMotion \|\| isCompactHero \? 1 : 0/);
  assert.match(heroSource, /\{!reduceMotion && !isCompactHero && \(/);
});

test('mobile hero hides every senior leader portrait', () => {
  const seniorPortraits = [
    'JP Nadda',
    'Amit Shah',
    'Narendra Modi',
    'Pushkar Singh Dhami',
    'Ramesh Pokhriyal Nishank',
  ];

  for (const alt of seniorPortraits) {
    const altIndex = heroSource.indexOf(`alt="${alt}"`);
    assert.notEqual(altIndex, -1, `${alt} portrait should exist for desktop`);

    const afterAlt = heroSource.slice(altIndex, altIndex + 260);
    assert.match(afterAlt, /className="[^"]*\bhidden\b[^"]*\blg:block\b/);
  }
});

test('about section prioritizes readable content on mobile', () => {
  assert.match(aboutSource, /py-16\s+md:py-36/);
  assert.match(aboutSource, /order-2\s+lg:order-1\s+lg:col-span-5/);
  assert.match(aboutSource, /order-1\s+lg:order-2\s+lg:col-span-7/);
  assert.match(aboutSource, /grid-cols-1\s+sm:grid-cols-2/);
});
