import { useTranslation } from 'react-i18next'
import { Hero } from '@/components/sections/Hero'
import { PartnersMarquee } from '@/components/sections/PartnersMarquee'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ReasonsSection } from '@/components/sections/ReasonsSection'
import { SectionLink } from '@/components/sections/SectionLink'
import { SectorsSection } from '@/components/sections/SectorsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { Seo } from '@/components/Seo'
import { partners } from '@/config/partners'
import { siteConfig } from '@/config/site'
import { useProcessSteps, useReasons, useScopeChips, useSectors, useServices } from '@/hooks/useContent'
import { useLocalizedPath } from '@/hooks/useLang'

export default function Home() {
  const { t } = useTranslation('home')
  const { t: common } = useTranslation()
  const { t: tServices } = useTranslation('services')
  const { t: tSectors } = useTranslation('sectors')
  const { t: tProcess } = useTranslation('process')
  const { t: tAbout } = useTranslation('about')
  const { t: tPartners } = useTranslation('partners')
  const to = useLocalizedPath()
  const learnMore = common('cta.learnMore')

  return (
    <>
      <Seo title={t('meta.title')} description={t('meta.description')} organization />
      <Hero
        eyebrow={t('hero.eyebrow')}
        domain={siteConfig.domain}
        url={siteConfig.url}
        logoAlt={common('lockupAlt')}
        fullName={t('hero.title')}
        taglineLead={t('hero.taglineLead')}
        taglineAccent={t('hero.taglineAccent')}
        lead={t('hero.lead')}
        primary={{ label: common('cta.quote'), to: to('contact') }}
        secondary={{ label: common('cta.services'), to: to('services') }}
        scope={{ label: tSectors('scopeAria'), chips: useScopeChips() }}
      />
      <ServicesSection items={useServices()} title={tServices('header.title')} lead={tServices('header.lead')}>
        <SectionLink to={to('services')} label={learnMore} />
      </ServicesSection>
      <SectorsSection items={useSectors()} title={tSectors('header.title')} lead={tSectors('header.lead')} layout="list">
        <SectionLink to={to('sectors')} label={learnMore} />
      </SectorsSection>
      <ProcessSection steps={useProcessSteps()} title={tProcess('header.title')} lead={tProcess('header.lead')}>
        <SectionLink to={to('process')} label={learnMore} />
      </ProcessSection>
      <ReasonsSection items={useReasons()} title={tAbout('header.title')} lead={tAbout('header.lead')}>
        <SectionLink to={to('about')} label={learnMore} />
      </ReasonsSection>
      <PartnersMarquee
        partners={partners}
        title={tPartners('header.title')}
        lead={tPartners('header.lead')}
        linkLabel={learnMore}
        linkTo={to('partners')}
        newTabLabel={common('newTab')}
      />
    </>
  )
}
