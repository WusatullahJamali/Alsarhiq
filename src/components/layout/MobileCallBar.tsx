import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { useLocalizedPath } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

/** Sticky call + quote bar on phones. */
export function MobileCallBar() {
  const { t } = useTranslation()
  const to = useLocalizedPath()
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 hidden grid-cols-2 gap-2 border-t border-line bg-paper px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-bar max-[700px]:grid">
      <a href={`tel:${siteConfig.phoneIntl}`} className={cn(buttonVariants({ size: 'sm' }), 'min-h-10 py-1.5 whitespace-nowrap')}>
        {t('call.short')}
      </a>
      <Link to={to('contact')} className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'min-h-10 py-1.5 whitespace-nowrap')}>
        {t('cta.quote')}
      </Link>
    </div>
  )
}
