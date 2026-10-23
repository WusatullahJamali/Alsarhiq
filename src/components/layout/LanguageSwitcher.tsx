import { Link, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { locales, localeMeta } from '@/i18n'
import { useLang } from '@/hooks/useLang'
import { switchLangPath } from '@/lib/langPath'
import { cn } from '@/lib/utils'

/** "EN | ع": same page, other language. Links (not buttons) so every language URL is crawlable. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { t } = useTranslation()
  const { lang } = useLang()
  const { pathname, search, hash } = useLocation()

  return (
    <div role="group" aria-label={t('lang.group')} className={cn('flex items-center text-sm', className)}>
      {locales.map((locale, i) => {
        const active = locale === lang
        return (
          <span key={locale} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="h-4 w-px bg-line-2" />
            )}
            <Link
              to={`${switchLangPath(pathname, locale)}${search}${hash}`}
              lang={locale}
              hrefLang={locale}
              aria-label={localeMeta[locale].label}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'inline-flex min-h-11 min-w-11 items-center justify-center px-2 font-bold transition-colors duration-200',
                active ? 'text-brand' : 'text-muted-foreground hover:text-brand',
              )}
            >
              {localeMeta[locale].short}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
