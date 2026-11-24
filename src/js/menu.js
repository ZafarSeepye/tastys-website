/* ==========================================================================
   Tasty's Take Aways - Menu
   Builds the menu from src/data/menu.js:
   - a sticky row of category chips that jump to each category
     (the chip of the category you're reading lights up)
   - photo cards for items with a photo, a price list for the rest
   - cards and rows slide in as you scroll
   ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '../data/menu.js';
import { prefersReducedMotion } from './utils.js';

gsap.registerPlugin(ScrollTrigger);

// All menu photos, e.g. photos['fillet-box'] -> final image URL
const photos = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/menu/*.webp', { eager: true, import: 'default' })).map(
    ([path, url]) => [path.split('/').pop().replace('.webp', ''), url]
  )
);

/** 28.5 -> "R28.50", 60 -> "R60", null -> "Ask us" */
function formatPrice(price) {
  if (price === null || price === undefined) return 'Ask us';
  return `R${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

/** Escapes text so it is safe to put inside HTML */
function esc(text = '') {
  return String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function extrasHtml(extras = []) {
  if (!extras.length) return '';
  const items = extras
    .map((x) => `<li>${esc(x.label)} <strong>${x.plus ? '+' : ''}${formatPrice(x.price)}</strong></li>`)
    .join('');
  return `<ul class="menu-extras">${items}</ul>`;
}

function cardHtml(item) {
  const priceText = formatPrice(item.price);
  const price = item.price === null
    ? `<span class="price price--ask">Ask us</span>`
    : `<span class="price">${item.from ? '<span class="price__from">from</span>' : ''}<span class="price__currency">R</span>${priceText.slice(1)}</span>`;

  return `
    <article class="menu-card" data-menu-anim>
      <div class="menu-card__media">
        <img src="${photos[item.photo]}" alt="${esc(item.name)}" width="800" height="600" loading="lazy" decoding="async" />
        ${price}
      </div>
      <div class="menu-card__body">
        <h4 class="menu-card__name">${esc(item.name)}</h4>
        ${item.desc ? `<p class="menu-card__desc">${esc(item.desc)}</p>` : ''}
        ${extrasHtml(item.extras)}
      </div>
    </article>`;
}

function rowHtml(item) {
  const ask = item.price === null;
  return `
    <li class="menu-row" data-menu-anim>
      <div class="menu-row__line">
        <h4 class="menu-row__name">${esc(item.name)}</h4>
        <span class="menu-row__dots" aria-hidden="true"></span>
        <span class="menu-row__price${ask ? ' menu-row__price--ask' : ''}">${item.from ? 'from ' : ''}${formatPrice(item.price)}</span>
      </div>
      ${item.desc ? `<p class="menu-row__desc">${esc(item.desc)}</p>` : ''}
      ${extrasHtml(item.extras)}
    </li>`;
}

function categoryHtml(cat, index) {
  const withPhoto = cat.items.filter((i) => i.photo && photos[i.photo]);
  const withoutPhoto = cat.items.filter((i) => !(i.photo && photos[i.photo]));
  const number = String(index + 1).padStart(2, '0');
  // 1-2 photo cards + a list: show them side by side on wide screens
  const split = withPhoto.length > 0 && withPhoto.length <= 2 && withoutPhoto.length > 0;
  const classes = ['menu-cat', cat.special && 'menu-cat--special', split && 'menu-cat--split'].filter(Boolean).join(' ');

  return `
    <section class="${classes}" id="cat-${cat.id}" aria-labelledby="cat-${cat.id}-title" style="--cards: ${withPhoto.length}">
      <header class="menu-cat__head">
        <span class="menu-cat__num" aria-hidden="true">${number}</span>
        <h3 class="menu-cat__title" id="cat-${cat.id}-title">${esc(cat.title)}</h3>
        ${cat.special ? '<span class="tag tag--red">Varies daily</span>' : ''}
      </header>
      ${cat.note ? `<p class="menu-cat__note">${esc(cat.note)}</p>` : ''}
      <div class="menu-cat__body">
        ${withPhoto.length ? `<div class="menu-cat__cards">${withPhoto.map(cardHtml).join('')}</div>` : ''}
        ${withoutPhoto.length ? `<ul class="menu-cat__list">${withoutPhoto.map(rowHtml).join('')}</ul>` : ''}
      </div>
    </section>`;
}

export function initMenu() {
  const nav = document.querySelector('.menu__chips');
  const body = document.querySelector('.menu__body');
  if (!nav || !body) return;

  // 1. Build the chips and the categories
  nav.innerHTML = categories
    .map((cat) => `<a class="chip" href="#cat-${cat.id}" data-cat="${cat.id}">${esc(cat.title)}</a>`)
    .join('');
  body.innerHTML = categories.map(categoryHtml).join('');

  // 2. Light up the chip of the category on screen
  const chips = [...nav.querySelectorAll('.chip')];
  const setActive = (id) => {
    chips.forEach((chip) => {
      const on = chip.dataset.cat === id;
      chip.classList.toggle('is-active', on);
      if (on) chip.setAttribute('aria-current', 'true');
      else chip.removeAttribute('aria-current');
      // keep the active chip visible in the sideways-scrolling bar (phones)
      if (on && nav.scrollWidth > nav.clientWidth) {
        nav.scrollTo({ left: chip.offsetLeft - nav.clientWidth / 2 + chip.offsetWidth / 2, behavior: 'smooth' });
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id.replace('cat-', ''));
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  body.querySelectorAll('.menu-cat').forEach((cat) => observer.observe(cat));

  // 3. Slide cards and rows in as they scroll into view
  if (prefersReducedMotion()) return;

  const animated = body.querySelectorAll('[data-menu-anim]');
  gsap.set(animated, { autoAlpha: 0, y: 30 });
  ScrollTrigger.batch(animated, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) => {
      // Items you jumped past (e.g. by tapping a chip) appear at once, no waiting
      const passed = batch.filter((el) => el.getBoundingClientRect().bottom < 0);
      const onScreen = batch.filter((el) => !passed.includes(el));
      gsap.set(passed, { autoAlpha: 1, y: 0 });
      gsap.to(onScreen, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06, overwrite: true });
    },
  });

  // Category titles: quick slide from the left
  body.querySelectorAll('.menu-cat__head').forEach((head) => {
    gsap.from(head, {
      x: -30,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: head, start: 'top 90%', once: true },
    });
  });
}
