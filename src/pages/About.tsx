import { useTranslation } from 'react-i18next'
import { PageIntro } from '@/components/sections/PageIntro'
import { ReasonsSection } from '@/components/sections/ReasonsSection'
import { useReasons } from '@/hooks/useContent'

export default function About() {
  const { t } = useTranslation('about')

  return (
    <>
      <PageIntro title={t('header.title')} lead={t('header.lead')} />
      <ReasonsSection items={useReasons()} itemLevel="h2" />
    </>
  )
}
