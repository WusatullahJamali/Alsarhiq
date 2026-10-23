import { useTranslation } from 'react-i18next'
import { PageIntro } from '@/components/sections/PageIntro'
import { SectorsSection } from '@/components/sections/SectorsSection'
import { useScopeChips, useSectors } from '@/hooks/useContent'

export default function Sectors() {
  const { t } = useTranslation('sectors')

  return (
    <>
      <PageIntro title={t('header.title')} lead={t('header.lead')} />
      <SectorsSection items={useSectors()} scope={{ label: t('scopeAria'), chips: useScopeChips() }} cardLevel="h2" />
    </>
  )
}
