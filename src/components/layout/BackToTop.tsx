import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'

/** Floating button on the right edge; appears after the first screen. Sits above the call bar on phones. */
export function BackToTop() {
  const { t } = useTranslation()
  const visible = useScrolled(400)
  const goTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }
  return (
    <button
      type="button"
      onClick={goTop}
      aria-label={t('footer.backToTop')}
      title={t('footer.backToTop')}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'fixed right-4 bottom-6 z-30 grid size-12 place-items-center rounded-full border border-gold bg-brand text-white shadow-menu transition-[opacity,transform,background-color] duration-300 ease-soft hover:bg-brand-hover max-[700px]:bottom-24',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  )
}
