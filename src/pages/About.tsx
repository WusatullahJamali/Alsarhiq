import { useTranslation } from 'react-i18next'
import { PageIntro } from '@/components/sections/PageIntro'
import { ReasonsSection } from '@/components/sections/ReasonsSection'
import { SectionLink } from '@/components/sections/SectionLink'
import { useReasons } from '@/hooks/useContent'
import { useLocalizedPath } from '@/hooks/useLang'

// Indexes into the six reasons (written quotes, direct supply, inspection, reports, one company, local knowledge).
const approach = [0, 1, 5]
const quality = [2, 3, 4]

export default function About() {
  const { t } = useTranslation('about')
  const to = useLocalizedPath()
  const reasons = useReasons()

  return (
    <>
      <PageIntro title={t('h1')} lead={t('header.lead')} meta={{ title: t('meta.title'), description: t('meta.description') }} />
      <ReasonsSection id="approach-title" title={t('approach')} items={approach.map((i) => reasons[i])} />
      <ReasonsSection id="quality-title" title={t('quality')} items={quality.map((i) => reasons[i])}>
        <SectionLink to={to('services')} label={t('links.services')} />
        <SectionLink to={to('contact')} label={t('links.contact')} />
      </ReasonsSection>
    </>
  )
}
