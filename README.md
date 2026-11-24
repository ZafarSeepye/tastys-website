# Tasty's Take Aways: website

A simple, fast menu website for **Tasty's Take Aways**, a family-owned takeaway at
**36 Joubert St, Mashishing** (next to Dawsons Hardware).

Built by [Zafar Seepye](https://github.com/ZafarSeepye) · ZSC Web Studio.

> Screenshots will be added in step 7.

---

## Progress

| # | Step | What it does | What I'll have at the end | Status |
|---|---|---|---|---|
| 1 | Project setup | Vite project, Git, .gitignore, public GitHub repo, README | Blank site on localhost, first push | ✅ Done |
| 2 | Brand & design system | Colours and fonts from the Tasty's posters, spacing, buttons, cleaned-up logo | The site's look and feel | ✅ Done |
| 3 | Header + hero | Logo, Menu / Find us links, hero with the animated Tasty's logo and tagline | A first screen that looks like Tasty's | ✅ Done |
| 4 | Menu | Category tabs, food cards (photo, name, price), daily specials, scroll-in animations. Prices live in one `menu.js` file | The full menu | ✅ Done |
| 5 | Find us | Tap-to-call number, address with Google Maps link, opening hours, footer | Contact info (no form) | 🔧 In progress |
| 6 | Mobile + polish | Phone layouts, compressed photos, accessibility, page title, favicon | Works and loads fast on any phone | ⬜ |
| 7 | README showcase | Desktop and phone screenshots, features and tech | A GitHub page that shows off the project | ⬜ |

**Status key:** ✅ Done · 🔧 In progress · ⬜ Not started

---

## Business details

- **Name:** Tasty's Take Aways
- **Address:** 36 Joubert St, Mashishing, 1120 (next to Dawsons Hardware)
- **Call / WhatsApp:** 072 556 5736
- **Hours:** Mon–Fri 09:00–17:00 · Sat 09:00–15:00 · Sun closed
- **Taglines:** "Great food. Great vibes. Made with passion!" · "Delicious flavours made for you!"
- **Note:** daily specials (curries, bunny chows, biryani, samoosa flavours) vary by day and availability.

---

## Security

The site is static (no database, no logins, no forms, no secrets), which removes most attack types. It was still tested by attacking it:

| Test | Result |
|---|---|
| Code injection (XSS) through the menu data, category ids, prices and opening hours | Blocked: all text is escaped or written with `textContent` |
| Code injection through the page URL (`?q=`, `#...`) | Not possible: the site never reads the URL |
| A typo in `menu.js` (e.g. `'35'` instead of `35`) | Handled: forgiving price parsing, each section starts on its own |
| Clickjacking (another site framing ours) | Blocked by `X-Frame-Options` / `frame-ancestors` headers |
| Dev server file leaks (`/.env`, `/.git`, `/@fs/etc/passwd`, path traversal), foreign Host headers | Blocked by Vite (403) |
| Dependencies | `npm audit`: 0 vulnerabilities |
| Secrets / source maps in the build | None |

**Hardening in the build** (`vite.config.js`): a Content Security Policy (only this site's own scripts, styles, fonts and images,
plus the Google map), a `_headers` file for the host (CSP, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`,
`Permissions-Policy`, HSTS), no source maps, and no inline scripts. All external links use `rel="noopener"`.

## Tech

- [Vite](https://vite.dev/) 8 (dev server and build)
- HTML, CSS, JavaScript (vanilla)
- Node.js v26 LTS
- [Fontsource](https://fontsource.org/): Barlow Condensed (headings) and Barlow (body), self-hosted
- [GSAP](https://gsap.com/) 3 + ScrollTrigger: logo intro, flickering flame, scroll effects

## Brand

| Token | Colour | Used for |
|---|---|---|
| Tasty's red | `#d90f0c` | Price stickers, red buttons, big text |
| Tasty's yellow | `#fbc40c` | Main buttons, highlights, prices |
| Flame | `#ff7a00` | Small accents |
| Black | `#0b0b0b` | Page background |
| Warm white | `#fff8ec` | Text |

Colours were sampled from the Tasty's logo. All design tokens live in `src/styles/tokens.css`.
The logo (`src/assets/logo/`) was cut out of a poster, upscaled 3x, cleaned and sharpened.
The flame was split into its own layer (`tastys-flame.webp`) so it can flicker on top of `tastys-logo-base.webp`.

## Menu

- **One file to edit:** all items and prices live in `src/data/menu.js`. Change a price there and the site updates.
- **Photos:** items with a photo (`src/assets/menu/`) show as picture cards; the rest show as a price list.
- **Photo clean-up:** each photo was cropped from the Tasty's posters, cleaned of JPEG noise, upscaled 2x with an
  AI super-resolution model (EDSR, OpenCV), lightly sharpened and toned down to look more natural.
- **Daily specials** (curries, bunny chows, samoosas) are marked as varying by day, with a WhatsApp / call button.

## Find us

- **Open now / Closed badge:** worked out live from the hours in `src/data/business.js`, always in South African time
  (shows "Closing soon" 30 minutes before closing, and when it opens next). Today's hours are highlighted.
- Tap-to-call, WhatsApp, a Google Maps directions link and a dark-styled map.

## Run locally

```powershell
npm install      # first time, or after new packages are added
npm run dev      # starts localhost:5173
```

**Test on a phone:** run `npm run dev:phone` and open the **Network** address it shows on a phone connected to the same Wi-Fi.

## Build for production

```powershell
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

## Workflow (each step)

1. Claude reads my current files, so my own changes are kept.
2. Claude writes the new and updated files into this folder.
3. I run the commands and test on localhost (desktop and phone).
4. I commit and push:

```powershell
git add .
git commit -m "Step X: <description>"
git push
```
