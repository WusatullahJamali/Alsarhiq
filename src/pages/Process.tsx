import { useTranslation } from 'react-i18next'
import { PageIntro } from '@/components/sections/PageIntro'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { useProcessSteps } from '@/hooks/useContent'

export default function Process() {
  const { t } = useTranslation('process')

  return (
    <>
      <PageIntro title={t('header.title')} lead={t('header.lead')} />
      <ProcessSection steps={useProcessSteps()} stepLevel="h2" />
    </>
  )
}
