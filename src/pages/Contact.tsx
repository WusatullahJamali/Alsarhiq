import { useTranslation } from 'react-i18next'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntro } from '@/components/sections/PageIntro'
import { SectionLink } from '@/components/sections/SectionLink'
import { Container } from '@/components/ui/container'
import { useLocalizedPath } from '@/hooks/useLang'

export default function Contact() {
  const { t } = useTranslation('contact')
  const to = useLocalizedPath()

  return (
    <>
      <PageIntro title={t('h1')} lead={t('header.lead')} meta={{ title: t('meta.title'), description: t('meta.description') }} />
      <ContactSection />
      <Container className="pb-12 sm:pb-16">
        <SectionLink to={to('services')} label={t('links.services')} />
      </Container>
    </>
  )
}
