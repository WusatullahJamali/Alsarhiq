import { useTranslation } from 'react-i18next'

export function SkipLink() {
  const { t } = useTranslation()
  return (
    <a href="#main" className="absolute start-3 -top-20 z-50 rounded-md bg-brand px-4 py-2.5 text-dark-fg no-underline focus:top-3">
      {t('skip')}
    </a>
  )
}
