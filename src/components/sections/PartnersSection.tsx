import { ExternalLink } from 'lucide-react'
import { Heading } from '@/components/ui/heading'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'

export interface PartnerView {
  id: string
  name: string
  suffix?: string
  site: string
  role?: string
  text?: string
}

interface PartnersSectionProps {
  partners: PartnerView[]
  newTabLabel: string
}

export function PartnersSection({ partners, newTabLabel }: PartnersSectionProps) {
  return (
    <Section>
      <div className="grid gap-5 border-t-[3px] border-gold pt-5 sm:pt-7 min-[700px]:grid-cols-2 min-[1024px]:grid-cols-3">
        {partners.map((partner, i) => (
          <Reveal key={partner.id} index={i % 3}>
            <article className="flex h-full min-w-0 flex-col gap-2 rounded-md border border-line bg-paper p-5 shadow-card sm:p-6 transition-[transform,box-shadow,border-color] duration-200 ease-soft hover:-translate-y-1 hover:border-gold hover:shadow-card-hover">
              {partner.role && <span className="text-xs font-bold text-gold-text">{partner.role}</span>}
              <Heading as="h2" size="h3" lang="en" dir="ltr" className="text-start leading-tight tracking-tight">
                {partner.name}
                {partner.suffix && <small className="ms-1.5 text-[0.55em] font-medium text-muted-foreground">{partner.suffix}</small>}
              </Heading>
              {partner.text && <p className="m-0 text-sm text-muted-foreground">{partner.text}</p>}
              <a
                href={`https://${partner.site}`}
                target="_blank"
                rel="noopener"
                dir="ltr"
                className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-2 text-sm font-semibold text-brand hover:underline"
                style={{ unicodeBidi: 'isolate' }}
              >
                {partner.site}
                <ExternalLink aria-hidden="true" className="size-3.5" />
                <span className="sr-only">{newTabLabel}</span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
