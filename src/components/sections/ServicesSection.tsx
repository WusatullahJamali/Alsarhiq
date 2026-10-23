import { Heading } from '@/components/ui/heading'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { TickList } from '@/components/ui/tick-list'
import type { ServiceItem } from '@/lib/types'

interface ServicesSectionProps {
  items: ServiceItem[]
  title?: string
  lead?: string
  cardLevel?: 'h2' | 'h3'
  /** Optional footer slot, e.g. a link to the full page. */
  children?: React.ReactNode
}

/** Editorial rows instead of three equal cards: big verb on the start side, detail on the end side. */
export function ServicesSection({ items, title, lead, cardLevel = 'h3', children }: ServicesSectionProps) {
  return (
    <Section aria-labelledby={title ? 'services-title' : undefined}>
      {title && (
        <Reveal>
          <SectionHeading id="services-title" title={title} lead={lead} />
        </Reveal>
      )}
      <div className="border-t-[3px] border-gold">
        {items.map((item, i) => (
          <Reveal key={item.title} index={i} className="grid gap-x-12 gap-y-4 border-b border-line py-6 sm:py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:py-10">
            <div className="min-w-0">
              <span className="text-xs font-bold text-gold-text">{item.kicker}</span>
              <Heading as={cardLevel} className="mt-1 text-[clamp(2.25rem,5vw,3.5rem)] leading-none text-brand">
                {item.title}
              </Heading>
            </div>
            <div className="min-w-0">
              <p className="m-0 mb-5 max-w-[38em] text-lead leading-relaxed text-foreground">{item.text}</p>
              <TickList items={item.list} className="gap-x-8 min-[560px]:grid-cols-2" />
            </div>
          </Reveal>
        ))}
      </div>
      {children}
    </Section>
  )
}
