import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { locales, localeMeta } from '@/i18n'
import { useLang } from '@/hooks/useLang'
import { switchLangPath } from '@/lib/langPath'
import { cn } from '@/lib/utils'

/** Dropdown with both languages. Options are links (not buttons) so every language URL stays crawlable. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { t } = useTranslation()
  const { lang } = useLang()
  const { pathname, search, hash } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <div
      role="group"
      aria-label={t('lang.group')}
      className={cn('relative flex items-center', className)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-11 items-center gap-1 px-2.5 text-base leading-none font-bold whitespace-nowrap text-brand"
      >
        {localeMeta[lang].short}
        <ChevronDown aria-hidden="true" className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <ul className="absolute end-0 top-full z-50 mt-1 min-w-32 rounded-md border border-line-2 bg-background p-1 shadow-header">
          {locales.map((locale) => (
            <li key={locale}>
              <Link
                to={`${switchLangPath(pathname, locale)}${search}${hash}`}
                lang={locale}
                hrefLang={locale}
                aria-current={locale === lang ? 'true' : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex min-h-11 items-center rounded px-3 text-base font-bold transition-colors',
                  locale === lang ? 'text-brand' : 'text-muted-foreground hover:text-brand',
                )}
              >
                {localeMeta[locale].label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
