import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { locales, localeMeta, defaultLocale } from '@/i18n'
import { siteConfig } from '@/config/site'
import { useLang } from '@/hooks/useLang'
import { switchLangPath } from '@/lib/langPath'

interface SeoProps {
  title: string
  description: string
  /** Home only: adds the Organization JSON-LD. */
  organization?: boolean
  /** Account and error pages: kept out of search results. */
  noindex?: boolean
}

const abs = (path: string) => `${siteConfig.url}${path}`
const image = abs('/og.png')

/**
 * React 19 hoists <title>, <meta> and <link> into <head>.
 * Per page and language: title, description, canonical, hreflang (+ x-default), Open Graph, Twitter card.
 */
export function Seo({ title, description, organization, noindex }: SeoProps) {
  const { t } = useTranslation()
  const { lang } = useLang()
  const { pathname } = useLocation()
  const brand = t('brand.name')
  // A title that already carries its own "| Brand" suffix is used as written.
  const fullTitle = title === brand || title.includes(' | ') ? title : `${title} | ${brand}`
  const canonical = abs(pathname.replace(/\/+$/, ''))

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      {!noindex && <link rel="canonical" href={canonical} />}
      {!noindex &&
        locales.map((locale) => <link key={locale} rel="alternate" hrefLang={locale} href={abs(switchLangPath(pathname, locale))} />)}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={abs(switchLangPath(pathname, defaultLocale))} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={brand} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={localeMeta[lang].ogLocale} />
      {locales
        .filter((locale) => locale !== lang)
        .map((locale) => (
          <meta key={locale} property="og:locale:alternate" content={localeMeta[locale].ogLocale} />
        ))}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={t('lockupAlt')} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {organization && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: t('fullName'),
            alternateName: [t('brand.name'), 'Al-Sarh Al-Mutakamel'],
            url: `${siteConfig.url}/`,
            logo: abs('/logo.svg'),
            telephone: siteConfig.phoneIntl,
            address: { '@type': 'PostalAddress', addressCountry: 'IQ' },
            ...(siteConfig.email ? { email: siteConfig.email } : {}),
            ...(siteConfig.social.length > 0 ? { sameAs: siteConfig.social.map((s) => s.href) } : {}),
          })}
        </script>
      )}
    </>
  )
}
