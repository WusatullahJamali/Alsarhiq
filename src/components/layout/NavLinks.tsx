import { NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'
import { pages } from '@/config/pages'
import { useLocalizedPath } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

interface NavLinksProps {
  /** Vertical list used in the drawer. */
  stacked?: boolean
  onNavigate?: () => void
}

export function NavLinks({ stacked, onNavigate }: NavLinksProps) {
  const { t } = useTranslation()
  const to = useLocalizedPath()

  return (
    <nav aria-label={t('nav.aria')}>
      <ul className={cn('m-0 flex list-none p-0', stacked ? 'flex-col' : 'items-center gap-1')}>
        {pages
          .filter((page) => page.nav)
          .map((page) => (
            <li key={page.key}>
              <NavLink
                to={to(page.path)}
                end={page.path === ''}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'relative flex items-center whitespace-nowrap font-medium transition-colors duration-200',
                    stacked
                      ? 'min-h-12 border-b border-line text-[1.05rem]'
                      : 'min-h-11 px-3 text-sm after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-center after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 after:ease-soft hover:after:scale-x-100',
                    isActive
                      ? cn('text-brand', stacked ? 'font-bold' : 'font-bold after:scale-x-100')
                      : stacked
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-brand',
                  )
                }
              >
                {t(`nav.${page.key}`)}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  )
}
