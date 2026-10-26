import { useTranslation } from 'react-i18next'
import { PageIntro } from '@/components/sections/PageIntro'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { usePartners } from '@/hooks/useContent'

export default function Partners() {
  const { t } = useTranslation('partners')
  const { t: common } = useTranslation()

  return (
    <>
      <PageIntro title={t('header.title')} lead={t('header.lead')} meta={{ title: t('meta.title'), description: t('meta.description') }} />
      <PartnersSection partners={usePartners()} newTabLabel={common('newTab')} />
    </>
  )
}
