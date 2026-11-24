/* ==========================================================================
   Tasty's Take Aways - Vite config
   Security hardening for the built website (npm run build):
   1. Adds a Content Security Policy <meta> tag to index.html. The browser
      then only runs code and loads files from this site (plus the Google
      map), so injected scripts are blocked.
   2. Writes a _headers file into dist/ with the same rules plus headers
      that stop other sites from framing ours (clickjacking). Netlify and
      Cloudflare Pages read _headers automatically when we go live.
   3. `npm run preview` sends the same headers, so they can be tested locally.
   The dev server (npm run dev) is left alone so hot reload keeps working.
   ========================================================================== */

import { defineConfig } from 'vite';

// Who is allowed to do what
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  'frame-src https://www.google.com https://maps.google.com', // the map in Find us
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'", // the site has no forms
].join('; ');

const securityHeaders = {
  // frame-ancestors only works as a real header (not in a <meta> tag)
  'Content-Security-Policy': `${csp}; frame-ancestors 'none'`,
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};

function securityPlugin() {
  return {
    name: 'tastys-security',
    apply: 'build',
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: csp },
          injectTo: 'head-prepend',
        },
      ];
    },
    generateBundle() {
      const lines = ['/*', ...Object.entries(securityHeaders).map(([key, value]) => `  ${key}: ${value}`)];
      // HSTS: browsers only ever use HTTPS for the site once it's live
      lines.push('  Strict-Transport-Security: max-age=31536000; includeSubDomains');
      this.emitFile({ type: 'asset', fileName: '_headers', source: `${lines.join('\n')}\n` });
    },
  };
}

export default defineConfig({
  plugins: [securityPlugin()],
  build: {
    sourcemap: false, // don't publish readable source code
  },
  preview: {
    headers: securityHeaders,
  },
});
