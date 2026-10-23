import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'
import { useLang, useLocalizedPath } from '@/hooks/useLang'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'

/**
 * Side drawer below the nav breakpoint (Base UI dialog: focus trapped, page scroll locked, Escape/overlay close).
 * Opens from the end side: right in English, left in Arabic. It is open only for the page it was opened on,
 * so navigating (links, back button) closes it and releases the scroll lock.
 */
export function MobileMenu() {
  const { t } = useTranslation()
  const { dir } = useLang()
  const { pathname } = useLocation()
  const to = useLocalizedPath()
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const close = () => setOpenOn(null)

  return (
    <Sheet open={open} onOpenChange={(next) => setOpenOn(next ? pathname : null)}>
      <SheetTrigger aria-label={t('nav.menu')} render={<Button variant="ghost" size="icon" className="text-foreground nav:hidden" />}>
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent
        side={dir === 'rtl' ? 'left' : 'right'}
        closeLabel={t('nav.close')}
        className="gap-0 overflow-y-auto p-5 data-[side=left]:w-[min(86vw,22rem)] data-[side=right]:w-[min(86vw,22rem)] data-[side=left]:sm:max-w-none data-[side=right]:sm:max-w-none"
      >
        <SheetTitle className="sr-only">{t('nav.menu')}</SheetTitle>
        <SheetDescription className="sr-only">{t('nav.aria')}</SheetDescription>
        <div className="mb-3 w-fit pe-12" onClick={close}>
          <Logo />
        </div>
        <NavLinks stacked onNavigate={close} />
        <div className="mt-5 grid gap-3">
          <Link to={to('contact')} onClick={close} className={buttonVariants()}>
            {t('cta.quote')}
          </Link>
          <Link to={to('login')} onClick={close} className={cn(buttonVariants({ variant: 'outline' }))}>
            <User />
            {t('nav.login')}
          </Link>
          <a href={`tel:${siteConfig.phoneIntl}`} aria-label={t('call.aria')} className={cn(buttonVariants({ variant: 'ghost' }), 'text-brand')}>
            <bdi dir="ltr">{siteConfig.phoneDisplay}</bdi>
          </a>
        </div>
        <LanguageSwitcher className="mt-3 justify-center" />
      </SheetContent>
    </Sheet>
  )
}
