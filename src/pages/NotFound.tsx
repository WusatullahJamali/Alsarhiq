import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowIcon } from '@/components/ui/arrow-icon'
import { buttonVariants } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Section } from '@/components/ui/section'
import { Seo } from '@/components/Seo'
import { useLocalizedPath } from '@/hooks/useLang'

export default function NotFound() {
  const { t } = useTranslation()
  const to = useLocalizedPath()

  return (
    <>
      <Seo title={t('notFound.title')} description={t('notFound.text')} noindex />
      <Section containerClassName="grid justify-items-start gap-4 py-12">
        <span className="text-display font-extrabold text-gold-text">{t('notFound.code')}</span>
        <Heading as="h1" size="h1">
          {t('notFound.title')}
        </Heading>
        <p className="m-0 max-w-[36em] text-muted-foreground">{t('notFound.text')}</p>
        <Link to={to()} className={buttonVariants()}>
          {t('notFound.back')}
          <ArrowIcon />
        </Link>
      </Section>
    </>
  )
}
