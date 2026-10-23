import { useTranslation } from 'react-i18next'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntro } from '@/components/sections/PageIntro'

export default function Contact() {
  const { t } = useTranslation('contact')

  return (
    <>
      <PageIntro title={t('header.title')} lead={t('header.lead')} />
      <ContactSection />
    </>
  )
}
