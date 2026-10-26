import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { Logo } from '@/components/layout/Logo'
import { SocialAuth } from '@/components/sections/SocialAuth'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { siteConfig } from '@/config/site'
import { useLocalizedPath, useLogos } from '@/hooks/useLang'

interface AuthShellProps {
  title: string
  lead: string
  children: ReactNode
  /** Links under the form (switch to sign up, back to sign in ...). */
  footer?: ReactNode
  /** Show Google / Apple buttons above the form. */
  social?: boolean
}

/** Bare login-flow page. Desktop: brand panel (template message) beside the form. Phones: form only, with logo and language on top. */
export function AuthShell({ title, lead, children, footer, social }: AuthShellProps) {
  const { t } = useTranslation('auth')
  const { t: common } = useTranslation()
  const { t: home } = useTranslation('home')
  const to = useLocalizedPath()
  const { lockup: logo } = useLogos()

  return (
    <div className="grid min-h-svh lg:h-svh lg:leading-normal lg:grid-cols-2 lg:overflow-hidden">
      <aside className="relative hidden overflow-hidden border-e-[6px] border-gold bg-dark bg-grid text-dark-fg lg:block">
        <div className="relative mx-auto grid h-full w-full max-w-lg grid-rows-[auto_1fr_auto] px-12 py-10">
          <Link to={to()} className="inline-flex w-fit rounded-sm" aria-label={common('logoAlt')}>
            <img src={logo} width={970} height={281} alt={common('lockupAlt')} className="h-auto w-60" />
          </Link>
          <div className="grid content-center gap-5">
            <span aria-hidden="true" className="h-1 w-14 bg-gold" />
            <p className="m-0 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-extrabold text-balance">
              {home('hero.taglineLead')} <span className="text-gold">{home('hero.taglineAccent')}</span>
            </p>
            <p className="m-0 max-w-[30em] text-dark-muted">{home('hero.lead')}</p>
          </div>
          <Link to={to()} dir="ltr" className="w-fit text-sm font-semibold text-gold hover:underline">
            {siteConfig.domain}
          </Link>
        </div>
      </aside>
      <Container className="flex flex-col py-4 sm:py-6 lg:h-svh lg:overflow-hidden lg:px-12 lg:py-4">
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <LanguageSwitcher />
        </div>
        <div className="flex flex-1 items-center py-6 lg:py-3">
          <div className="mx-auto grid w-full max-w-md gap-3 lg:[@media(max-height:720px)]:[zoom:0.86]">
            <div className="grid gap-2">
              <Heading as="h1" size="h2">
                {title}
              </Heading>
              <p className="m-0 text-muted-foreground">{lead}</p>
            </div>
            {social && <SocialAuth />}
            {children}
            <p className="m-0 text-xs leading-relaxed text-muted-foreground lg:[@media(max-height:800px)]:hidden">{t('note')}</p>
            {footer && <div className="border-t border-line pt-4 text-sm">{footer}</div>}
          </div>
        </div>
      </Container>
    </div>
  )
}
