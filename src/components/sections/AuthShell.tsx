import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { Logo } from '@/components/layout/Logo'
import { SocialAuth } from '@/components/sections/SocialAuth'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import logo from '@/assets/logo-reversed.svg'

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

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden border-e-[6px] border-gold bg-dark bg-grid text-dark-fg lg:flex lg:items-center">
        <div className="relative mx-auto grid w-full max-w-md gap-8 px-10 py-16">
          <img src={logo} width={970} height={281} alt={common('lockupAlt')} className="h-auto w-64" />
          <p className="m-0 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-extrabold text-balance">
            {home('hero.taglineLead')} <span className="text-gold">{home('hero.taglineAccent')}</span>
          </p>
          <p className="m-0 text-dark-muted">{home('hero.lead')}</p>
        </div>
      </aside>
      <Container className="flex flex-col py-4 sm:py-6 lg:px-12">
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <LanguageSwitcher />
        </div>
        <div className="flex flex-1 items-center py-8 sm:py-10">
          <div className="mx-auto grid w-full max-w-md gap-6">
            <div className="grid gap-2">
              <Heading as="h1" size="h2">
                {title}
              </Heading>
              <p className="m-0 text-muted-foreground">{lead}</p>
            </div>
            {social && <SocialAuth />}
            {children}
            <p className="m-0 text-xs leading-relaxed text-muted-foreground">{t('note')}</p>
            {footer && <div className="border-t border-line pt-4 text-sm">{footer}</div>}
          </div>
        </div>
      </Container>
    </div>
  )
}
