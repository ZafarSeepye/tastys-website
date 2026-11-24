/* ==========================================================================
   Tasty's Take Aways - Entry point
   Loads the fonts and styles, then starts each section's script.
   ========================================================================== */

// Fonts (self-hosted, no Google requests)
// Barlow Condensed: bold, condensed poster headings
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/barlow-condensed/800-italic.css';
// Barlow: easy-to-read body text
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';

import './styles/main.css';

import { initHeader } from './js/header.js';
import { initHero } from './js/hero.js';
import { initMenu } from './js/menu.js';

initHeader();
initHero();
initMenu();
