import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useLocalizedPath } from '@/hooks/useLang'
import { cn } from '@/lib/utils'
import logo from '@/assets/logo.svg'

/** Compact header lockup; links home. */
export function Logo({ scrolled }: { scrolled?: boolean }) {
  const { t } = useTranslation()
  const to = useLocalizedPath()
  return (
    <Link
      to={to()}
      className={cn(
        'flex min-h-11 shrink-0 items-center rounded-sm transition-[width] duration-300 ease-soft',
        scrolled ? 'w-30 max-[520px]:w-26' : 'w-36 max-[520px]:w-28',
      )}
    >
      <img src={logo} width={875} height={122} alt={t('logoAlt')} className="h-auto w-full" />
    </Link>
  )
}
