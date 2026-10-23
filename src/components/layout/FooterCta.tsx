import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ArrowIcon } from '@/components/ui/arrow-icon'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { Reveal } from '@/components/ui/reveal'
import { useLocalizedPath } from '@/hooks/useLang'

/** Closing call to action above the footer; solid tint of the brand colour. */
export function FooterCta() {
  const { t } = useTranslation()
  const { t: home } = useTranslation('home')
  const to = useLocalizedPath()

  return (
    <section aria-labelledby="footer-cta-title" className="border-t border-line bg-tint">
      <Container className="py-8 sm:py-10">
        <Reveal className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <div className="max-w-[34em]">
            <Heading id="footer-cta-title" size="h3" className="mb-2 text-brand">
              {home('cta.title')}
            </Heading>
            <p className="m-0 text-muted-foreground">{home('cta.text')}</p>
          </div>
          <Link to={to('contact')} className={buttonVariants()}>
            {t('cta.quote')}
            <ArrowIcon />
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}
