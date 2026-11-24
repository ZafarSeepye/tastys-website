/* ==========================================================================
   Tasty's Take Aways - Small shared helpers
   ========================================================================== */

/** True when the visitor asked their device for less motion. */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Random number between min and max. */
export function random(min, max) {
  return min + Math.random() * (max - min);
}
