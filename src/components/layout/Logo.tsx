import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useLang, useLocalizedPath, useLogos } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

/** Compact header lockup; links home. */
export function Logo({ scrolled }: { scrolled?: boolean }) {
  const { t } = useTranslation()
  const to = useLocalizedPath()
  const { logo } = useLogos()
  const en = useLang().lang === 'en'
  return (
    <Link
      to={to()}
      className={cn(
        'flex min-h-11 shrink-0 items-center rounded-sm transition-[width] duration-300 ease-soft',
        // the English wordmark is lower than the Arabic one, so it gets a wider box
        scrolled ? (en ? 'w-40 max-[520px]:w-34' : 'w-30 max-[520px]:w-26') : en ? 'w-48 max-[520px]:w-38' : 'w-36 max-[520px]:w-28',
      )}
    >
      <img src={logo} width={875} height={122} alt={t('logoAlt')} className="h-auto w-full" />
    </Link>
  )
}
