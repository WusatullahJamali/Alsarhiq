import { useTranslation } from 'react-i18next'
import { PageIntro } from '@/components/sections/PageIntro'
import { PageNote } from '@/components/sections/PageNote'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { useServices } from '@/hooks/useContent'

export default function Services() {
  const { t } = useTranslation('services')

  return (
    <>
      <PageIntro title={t('h1')} lead={t('header.lead')} meta={{ title: t('meta.title'), description: t('meta.description') }} />
      <ServicesSection items={useServices()} itemLevel="h2" />
      <PageNote ns="services" />
    </>
  )
}
