/* ==========================================================================
   Tasty's Take Aways - Hero
   1. Intro: the logo pops in, the flame "ignites", the tagline brushes on,
      then the text and buttons slide up.
   2. Idle: the flame flickers and the logo floats gently.
   3. Tap/hover the logo: it wiggles and the flame flares up.
   4. Embers drift up in the background.
   5. Scrolling away fades the hero out a little (parallax).
   Everything is skipped for visitors who prefer reduced motion.
   ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, random } from './utils.js';

gsap.registerPlugin(ScrollTrigger);

export function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const logo = hero.querySelector('.hero__logo');
  const flameWrap = hero.querySelector('.hero__flame-wrap');
  const flame = hero.querySelector('.hero__flame');
  const tagline = hero.querySelector('.hero__tagline');
  const intro = hero.querySelectorAll('[data-hero-intro]');
  const inner = hero.querySelector('.hero__inner');

  // Reduced motion: just show everything, no movement
  if (prefersReducedMotion()) {
    gsap.set([logo, tagline, ...intro], { autoAlpha: 1 });
    return;
  }

  addEmbers(hero.querySelector('.hero__embers'));

  // ---------- Idle loops (created paused, started after the intro) ----------
  const flicker = gsap.to(flame, {
    scaleY: 'random(0.9, 1.12)',
    scaleX: 'random(0.94, 1.06)',
    skewX: 'random(-4, 4)',
    duration: 0.14,
    ease: 'sine.inOut',
    repeat: -1,
    repeatRefresh: true, // new random values every flicker
    paused: true,
  });

  const float = gsap.to(logo, {
    y: -10,
    duration: 2.4,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    paused: true,
  });

  // ---------- Intro ----------
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      flicker.play();
      float.play();
    },
  });

  tl.fromTo(
    logo,
    { autoAlpha: 0, scale: 0.4, rotation: -12 },
    { autoAlpha: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
  )
    .fromTo(
      flameWrap,
      { scale: 0, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'elastic.out(1, 0.45)' },
      '-=0.35'
    )
    .add(() => flicker.play(), '<0.1') // flame starts flickering as it lights
    .fromTo(
      tagline,
      { autoAlpha: 0, clipPath: 'inset(0% 100% 0% 0%)' },
      { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power2.inOut' },
      '-=0.5'
    )
    .fromTo(
      intro,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
      '-=0.25'
    );

  // ---------- Tap / hover: wiggle + flare ----------
  let busy = false;
  const wiggle = () => {
    if (busy || tl.isActive()) return;
    busy = true;
    gsap
      .timeline({ onComplete: () => (busy = false) })
      .to(logo, {
        keyframes: { rotation: [0, -5, 4, -2, 0] },
        duration: 0.6,
        ease: 'power1.inOut',
      })
      .to(flameWrap, { scale: 1.3, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 }, 0);
  };
  logo.addEventListener('pointerenter', wiggle);
  logo.addEventListener('click', wiggle);

  // ---------- Scroll away: hero drifts and fades a little ----------
  gsap.to(inner, {
    yPercent: 12,
    opacity: 0.35,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Pause the loops and embers when the hero is off screen (saves battery)
  ScrollTrigger.create({
    trigger: hero,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: ({ isActive }) => {
      hero.classList.toggle('is-paused', !isActive);
      if (tl.isActive()) return;
      flicker.paused(!isActive);
      float.paused(!isActive);
    },
  });
}

/** Adds small glowing embers that drift upward (pure CSS animation). */
function addEmbers(container) {
  if (!container) return;
  const count = window.innerWidth < 600 ? 12 : 22;

  for (let i = 0; i < count; i++) {
    const ember = document.createElement('span');
    ember.className = 'ember';
    ember.style.setProperty('--x', `${random(2, 98)}%`);
    ember.style.setProperty('--size', `${random(2, 5).toFixed(1)}px`);
    ember.style.setProperty('--dur', `${random(7, 13).toFixed(1)}s`);
    ember.style.setProperty('--delay', `${-random(0, 13).toFixed(1)}s`); // start mid-flight
    ember.style.setProperty('--drift', `${random(-70, 70).toFixed(0)}px`);
    container.appendChild(ember);
  }
}
