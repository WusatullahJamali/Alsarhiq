import { Link } from 'react-router'
import { User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { useLocalizedPath } from '@/hooks/useLang'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { NavLinks } from './NavLinks'

/**
 * Fixed bar plus a same-height spacer, so shrinking on scroll never moves the page content.
 * Desktop is a 3-part grid (logo | links | actions) so the links stay centred whatever the side widths are.
 * It mirrors itself in Arabic because every placement is logical.
 */
export function Header() {
  const { t } = useTranslation()
  const to = useLocalizedPath()
  const scrolled = useScrolled()

  return (
    <>
      <div aria-hidden="true" className="h-header" />
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-30 border-b transition-[height,background-color,box-shadow,border-color] duration-300 ease-soft',
          scrolled ? 'h-header-sm border-line bg-paper shadow-header' : 'h-header border-transparent bg-background',
        )}
      >
        <Container className="flex h-full items-center justify-between gap-3 nav:grid nav:grid-cols-[1fr_auto_1fr]">
          <div className="flex min-w-0 justify-start">
            <Logo scrolled={scrolled} />
          </div>
          <div className="hidden nav:block">
            <NavLinks />
          </div>
          <div className="flex flex-none items-center justify-end gap-1 sm:gap-2">
            <LanguageSwitcher className="hidden sm:flex" />
            <Link
              to={to('login')}
              aria-label={t('nav.login')}
              title={t('nav.login')}
              className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'text-foreground hover:text-brand')}
            >
              <User className="size-5.5" />
            </Link>
            <Link to={to('contact')} className={cn(buttonVariants({ size: 'sm' }), 'ms-1 hidden nav:inline-flex')}>
              {t('cta.contact')}
            </Link>
            <MobileMenu />
          </div>
        </Container>
      </header>
    </>
  )
}
