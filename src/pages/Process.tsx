import { useTranslation } from 'react-i18next'
import { PageIntro } from '@/components/sections/PageIntro'
import { PageNote } from '@/components/sections/PageNote'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { useProcessSteps } from '@/hooks/useContent'

export default function Process() {
  const { t } = useTranslation('process')

  return (
    <>
      <PageIntro title={t('header.title')} lead={t('header.lead')} meta={{ description: t('meta.description') }} />
      <ProcessSection steps={useProcessSteps()} stepLevel="h2" />
      <PageNote ns="process" />
    </>
  )
}
