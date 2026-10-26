import { Link, useLocation } from 'react-router'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/container'
import { pages } from '@/config/pages'
import { siteConfig } from '@/config/site'
import { useServices } from '@/hooks/useContent'
import { useFormat } from '@/hooks/useFormat'
import { useLang, useLocalizedPath, useLogos } from '@/hooks/useLang'
import { FooterColumn, footerLink } from './FooterColumn'
import { FooterCta } from './FooterCta'

/** Brand, important links, services and contact. Every list row is 44px tall, so the columns end at similar heights. */
export function Footer() {
  const { t } = useTranslation()
  const { lang } = useLang()
  const to = useLocalizedPath()
  const { lockup: logo } = useLogos()
  const { year } = useFormat()
  const { pathname } = useLocation()
  const services = useServices()
  const address = siteConfig.address[lang] || t('country')

  return (
    <footer>
      {!pathname.endsWith('/contact') && <FooterCta />}
      <div className="bg-dark text-sm text-dark-muted">
        <Container className="grid grid-cols-2 gap-x-6 gap-y-6 py-10 sm:py-12 lg:grid-cols-[1.4fr_0.8fr_1.1fr_1.3fr] lg:gap-x-12">
          <div className="col-span-2 grid content-start gap-2 lg:col-span-1">
            <Link to={to()} className="inline-flex min-h-11 w-36 items-center rounded-sm sm:w-40">
              <img src={logo} width={970} height={281} alt={t('lockupAlt')} className="h-auto w-full" loading="lazy" />
            </Link>
            <p className="m-0 max-w-[32ch] text-base leading-relaxed">{t('footer.about')}</p>
            {siteConfig.social.length > 0 && (
              <ul className="m-0 flex list-none flex-wrap gap-x-4 p-0">
                {siteConfig.social.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank" rel="noopener" className={footerLink}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FooterColumn title={t('footer.quickLinks')}>
            {pages
              .filter((page) => page.footer)
              .map((page) => (
                <li key={page.key}>
                  <Link to={to(page.path)} className={footerLink}>
                    {t(`nav.${page.key}`)}
                  </Link>
                </li>
              ))}
          </FooterColumn>

          <FooterColumn title={t('nav.services')}>
            {services.map((service, i) => (
              <li key={service.title}>
                <Link to={`${to('services')}#service-${i + 1}`} className={footerLink}>
                  {service.kicker}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={t('nav.contact')} className="col-span-2 lg:col-span-1">
            <li>
              <a href={`tel:${siteConfig.phoneIntl}`} dir="ltr" className={`${footerLink} gap-2.5 text-start`} style={{ unicodeBidi: 'isolate' }}>
                <Phone aria-hidden="true" className="size-4 shrink-0 text-gold" />
                {siteConfig.phoneDisplay}
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} dir="ltr" className={`${footerLink} gap-2.5 text-start`} aria-label={`${t('footer.email')}: ${siteConfig.email}`}>
                  <Mail aria-hidden="true" className="size-4 shrink-0 text-gold" />
                  {siteConfig.email}
                </a>
              </li>
            )}
            <li className="flex min-h-11 items-center gap-2.5">
              <Globe aria-hidden="true" className="size-4 shrink-0 text-gold" />
              <Link to={to()} dir="ltr" className={`${footerLink} font-semibold text-dark-fg`}>
                {siteConfig.domain}
              </Link>
            </li>
            <li className="flex min-h-11 items-center gap-2.5">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-gold" />
              {address}
            </li>
          </FooterColumn>
        </Container>

        <div className="border-t border-dark-line">
          <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3 text-[0.75rem] leading-relaxed">
            <div className="grid min-w-0 flex-1 basis-72 gap-0.5">
              <p className="m-0 text-dark-soft">{t('footer.copyright', { year: year() })}</p>
              <p className="m-0">{t('footer.legal')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5">
              <Link to={to('privacy')} className={footerLink}>
                {t('nav.privacy')}
              </Link>
              <Link to={to('terms')} className={footerLink}>
                {t('nav.terms')}
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  )
}
