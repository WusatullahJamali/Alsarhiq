import { Link, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/container'
import { pages } from '@/config/pages'
import { siteConfig } from '@/config/site'
import { useServices } from '@/hooks/useContent'
import { useFormat } from '@/hooks/useFormat'
import { useLang, useLocalizedPath } from '@/hooks/useLang'
import logo from '@/assets/logo-reversed.svg'
import { BackToTop } from './BackToTop'
import { FooterColumn, footerLink } from './FooterColumn'
import { FooterCta } from './FooterCta'

/** Every column is a list of 44px rows, so the columns end at similar heights. */
export function Footer() {
  const { t } = useTranslation()
  const { lang } = useLang()
  const to = useLocalizedPath()
  const { year } = useFormat()
  const { pathname } = useLocation()
  const services = useServices()
  const address = siteConfig.address[lang] || t('country')

  return (
    <footer>
      {!pathname.endsWith('/contact') && <FooterCta />}
      <div className="bg-dark text-sm text-dark-muted">
        <Container className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:py-10 lg:grid-cols-[1.3fr_1.5fr_1fr_1.2fr] lg:gap-x-10">
          <div className="col-span-2 grid content-start gap-2 lg:col-span-1">
            <Link to={to()} className="inline-flex min-h-11 w-36 items-center rounded-sm sm:w-40">
              <img src={logo} width={970} height={281} alt={t('lockupAlt')} className="h-auto w-full" loading="lazy" />
            </Link>
            <p className="m-0 max-w-[34ch] leading-relaxed">{t('footer.about')}</p>
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

          <FooterColumn title={t('footer.quickLinks')} className="col-span-2 lg:col-span-1" columns={2}>
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
            {services.map((service) => (
              <li key={service.title}>
                <Link to={to('services')} className={footerLink}>
                  {service.kicker}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={t('nav.contact')}>
            <li>
              <a href={`tel:${siteConfig.phoneIntl}`} dir="ltr" className={`${footerLink} text-start`} style={{ unicodeBidi: 'isolate' }}>
                {siteConfig.phone}
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} dir="ltr" className={`${footerLink} text-start`} aria-label={`${t('footer.email')}: ${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </li>
            )}
            <li className="flex min-h-11 items-center">
              <bdi dir="ltr" className="font-semibold text-dark-fg">
                {siteConfig.domain}
              </bdi>
            </li>
            <li className="flex min-h-11 items-center">{address}</li>
          </FooterColumn>
        </Container>

        <div className="border-t border-dark-line">
          <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3 text-xs leading-relaxed">
            <div className="grid min-w-0 flex-1 basis-72 gap-0.5">
              <p className="m-0 text-dark-soft">{t('footer.copyright', { year: year() })}</p>
              <p className="m-0">{t('footer.legal')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-3">
              <Link to={to('privacy')} className={footerLink}>
                {t('nav.privacy')}
              </Link>
              <Link to={to('terms')} className={footerLink}>
                {t('nav.terms')}
              </Link>
              <BackToTop />
            </div>
          </Container>
        </div>
      </div>
    </footer>
  )
}
