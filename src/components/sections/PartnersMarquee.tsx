import { Link } from 'react-router'
import { ArrowIcon } from '@/components/ui/arrow-icon'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import type { Partner } from '@/config/partners'

interface PartnersMarqueeProps {
  partners: readonly Partner[]
  title: string
  lead: string
  linkLabel: string
  linkTo: string
  newTabLabel: string
}

function Wordmark({ partner, newTabLabel, hidden }: { partner: Partner; newTabLabel: string; hidden?: boolean }) {
  const label = (
    <>
      {partner.name}
      {'suffix' in partner && <small className="text-xs font-medium">{partner.suffix}</small>}
    </>
  )
  if ('offline' in partner) {
    return (
      <span lang="en" dir="ltr" className="flex min-h-12 items-center gap-1.5 px-6 text-h5 font-extrabold tracking-tight whitespace-nowrap text-dark-soft sm:min-h-14 sm:px-8 sm:text-h4">
        {label}
      </span>
    )
  }
  return (
    <a
      href={`https://${partner.site}`}
      target="_blank"
      rel="noopener"
      lang="en"
      dir="ltr"
      tabIndex={hidden ? -1 : undefined}
      className="flex min-h-12 items-center gap-1.5 px-6 text-h5 font-extrabold tracking-tight whitespace-nowrap text-dark-soft transition-colors duration-200 hover:text-gold focus-visible:text-gold sm:min-h-14 sm:px-8 sm:text-h4"
    >
      {label}
      <span className="sr-only">{newTabLabel}</span>
    </a>
  )
}

/**
 * Brand-green band with white wordmarks (the template has no partner logo files) drifting slowly.
 * Paused on hover/focus; under reduced motion the list simply wraps and does not move.
 */
export function PartnersMarquee({ partners, title, lead, linkLabel, linkTo, newTabLabel }: PartnersMarqueeProps) {
  return (
    <section aria-labelledby="partners-title" className="overflow-hidden bg-dark py-10 text-dark-fg min-[640px]:py-14 min-[1024px]:py-section">
      <Container>
        <Reveal>
          <SectionHeading id="partners-title" title={title} lead={lead} tone="dark" />
        </Reveal>
      </Container>
      <Reveal className="marquee border-y border-dark-line">
        <div className="marquee-track">
          <ul className="m-0 flex list-none p-0">
            {partners.map((partner) => (
              <li key={partner.id}>
                <Wordmark partner={partner} newTabLabel={newTabLabel} />
              </li>
            ))}
          </ul>
          <ul aria-hidden="true" className="marquee-dup m-0 flex list-none p-0">
            {partners.map((partner) => (
              <li key={partner.id}>
                <Wordmark partner={partner} newTabLabel={newTabLabel} hidden />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Container className="mt-6 sm:mt-8">
        <Link to={linkTo} className={buttonVariants({ variant: 'outlineLight' })}>
          {linkLabel}
          <ArrowIcon />
        </Link>
      </Container>
    </section>
  )
}
