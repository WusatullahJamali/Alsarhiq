# Al-Sarh Al-Mutakamel website

React 19 + Vite + TypeScript (strict) + Tailwind CSS 4 + shadcn/ui (Base UI) + React Router + i18next.
English (LTR) and Arabic (RTL). Routes: `/en/...` and `/ar/...`; `/` and unknown languages go to `/en`.

## Commands

```bash
npm run dev        # dev server
npm run typecheck  # tsc -b
npm run lint       # eslint
npm run build      # sitemap + tsc + vite build  ->  dist/
npm run preview    # serve dist/
```

## Structure

```
src/
  router/        route config, LangGate (validates /:lang)
  layouts/       MainLayout: skip link, header, footer, sets <html lang dir>
  pages/         one folder per page (lazy loaded): Home, Services, Sectors, Process, About, Partners, Contact, NotFound
  components/
    ui/          shadcn + small primitives (Container, Section, Heading, InfoCard, TickList ...), props only
    layout/      Header, Footer, MobileMenu, LanguageSwitcher, NavLinks, MobileCallBar
    sections/    one folder per section, all text comes in as props
    seo/         Seo: title, description, canonical, hreflang, Open Graph
  i18n/          index.ts + locales/en.json + locales/ar.json
  hooks/         useLang, useDirection, useFormat (Intl), useLocalizedPath, useItems, useContent, useQuoteForm
  config/        pages (routes + nav), site (phone, url, form endpoint), partners
  lib/           utils, phone, langPath, submitQuote
  styles/        tokens.css (all design tokens), globals.css (Tailwind theme from tokens)
  types/
scripts/sitemap.mjs   builds public/sitemap.xml from config/pages.ts
```

## Translations

One file per language: `src/i18n/locales/en.json` and `ar.json`. Top-level keys are namespaces
(`common`, `home`, `services`, `sectors`, `process`, `about`, `partners`, `contact`). Both files must
have identical keys. No visible text lives in code.

## Add a page

1. Folder `src/pages/Pricing/index.tsx` with `export default function Pricing()`; render `<Seo>`, `<PageIntro>` (the only `h1`) and sections.
2. Add `{ key: 'pricing', path: 'pricing', nav: true }` to `src/config/pages.ts` (drives nav, footer, sitemap).
3. Add the lazy import to `components` in `src/router/index.tsx`.
4. Add `pricing` namespace to `en.json` and `ar.json` (add it to `namespaces` in `src/i18n/index.ts`) and `nav.pricing` in `common`.

## Add a section

Create `src/components/sections/MySection/index.tsx` taking content props, then pass text from the page using `useTranslation`. Use `Section`, `SectionHeading`, `InfoCard` from `components/ui`. Use logical classes (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) so RTL works; direction icons use `ArrowIcon`.

## Design tokens

Edit colors, type scale, spacing, container width and radius only in `src/styles/tokens.css`. Tailwind and shadcn variables read from it.

## Contact form

`src/lib/submitQuote.ts` is the single submit function. With `siteConfig.formEndpoint` empty it prepares a WhatsApp message (`wa.me`). Set `formEndpoint` in `src/config/site.ts` to POST JSON to a real service instead; footer and form copy switch automatically.

## Hosting (SPA fallback: every route must serve index.html)

Nginx:

```nginx
server {
  root /var/www/alsarh/dist;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
  location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
}
```

Vercel (`vercel.json`):

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Netlify (`public/_redirects`):

```
/*  /index.html  200
```

Set the real domain in `src/config/site.ts`, `public/robots.txt` and `scripts/sitemap.mjs` (currently `https://alsarhiq.com`).
