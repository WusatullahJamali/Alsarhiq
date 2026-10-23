/**
 * Single source for routes. Router, nav, footer and the sitemap script all read this.
 * No imports: the sitemap script loads this file directly.
 * layout: 'main' = header + footer, 'auth' = bare page (login flow).
 * nav = main navbar, footer = footer quick links, sitemap = listed in sitemap.xml (false also means noindex).
 */
export const pages = [
  { key: 'home', path: '', layout: 'main', nav: true, footer: true, sitemap: true },
  { key: 'services', path: 'services', layout: 'main', nav: true, footer: true, sitemap: true },
  { key: 'sectors', path: 'sectors', layout: 'main', nav: true, footer: true, sitemap: true },
  { key: 'process', path: 'process', layout: 'main', nav: true, footer: true, sitemap: true },
  { key: 'about', path: 'about', layout: 'main', nav: true, footer: true, sitemap: true },
  { key: 'partners', path: 'partners', layout: 'main', nav: true, footer: true, sitemap: true },
  { key: 'contact', path: 'contact', layout: 'main', nav: false, footer: true, sitemap: true },
  { key: 'privacy', path: 'privacy', layout: 'main', nav: false, footer: false, sitemap: true },
  { key: 'terms', path: 'terms', layout: 'main', nav: false, footer: false, sitemap: true },
  { key: 'login', path: 'login', layout: 'auth', nav: false, footer: true, sitemap: false },
  { key: 'signup', path: 'signup', layout: 'auth', nav: false, footer: false, sitemap: false },
  { key: 'forgot-password', path: 'forgot-password', layout: 'auth', nav: false, footer: false, sitemap: false },
] as const

export type PageKey = (typeof pages)[number]['key']
