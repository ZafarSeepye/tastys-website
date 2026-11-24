/* ==========================================================================
   Tasty's Take Aways - Header
   - Turns solid (and shows the small logo) once you scroll past the top.
   - Highlights the nav link of the section you're looking at.
   ========================================================================== */

export function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  // Solid background after scrolling a little
  const updateScrolled = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  updateScrolled();
  window.addEventListener('scroll', updateScrolled, { passive: true });

  // Active link: whichever section fills the middle of the screen
  const links = [...header.querySelectorAll('.site-nav__link')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', isActive);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  // Back at the top: no link active
  const hero = document.getElementById('top');
  if (hero) {
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) links.forEach((link) => link.classList.remove('is-active'));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    ).observe(hero);
  }
}
