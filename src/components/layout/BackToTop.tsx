import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function BackToTop() {
  const { t } = useTranslation()
  const goTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }
  return (
    <button
      type="button"
      onClick={goTop}
      className="inline-flex min-h-11 items-center gap-2 rounded-md border border-dark-line px-3.5 text-xs font-semibold text-dark-soft transition-colors duration-200 hover:border-white/50 hover:text-dark-fg"
    >
      {t('footer.backToTop')}
      <ArrowUp aria-hidden="true" className="size-4" />
    </button>
  )
}
