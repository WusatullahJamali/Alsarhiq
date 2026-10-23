import { useTranslation } from 'react-i18next'
import { PageIntro } from '@/components/sections/PageIntro'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { useServices } from '@/hooks/useContent'

export default function Services() {
  const { t } = useTranslation('services')

  return (
    <>
      <PageIntro title={t('header.title')} lead={t('header.lead')} />
      <ServicesSection items={useServices()} cardLevel="h2" />
    </>
  )
}
