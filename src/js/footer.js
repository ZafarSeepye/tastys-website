/* ==========================================================================
   Tasty's Take Aways - Footer
   Keeps the copyright year current.
   ========================================================================== */

export function initFooter() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
