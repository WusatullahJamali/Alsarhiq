import { Heading } from '@/components/ui/heading'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { useFormat } from '@/hooks/useFormat'
import type { ReasonItem } from '@/lib/types'

interface ReasonsSectionProps {
  items: ReasonItem[]
  title?: string
  lead?: string
  itemLevel?: 'h2' | 'h3'
  /** Heading id; set it when a page shows more than one reasons section. */
  id?: string
  children?: React.ReactNode
}

/** Statement on the start side (the lead as a pull quote), numbered reasons on the end side. */
export function ReasonsSection({ items, title, lead, itemLevel = 'h3', id = 'reasons-title', children }: ReasonsSectionProps) {
  const { padded } = useFormat()
  return (
    <Section aria-labelledby={title ? id : undefined} containerClassName={title ? 'grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]' : undefined}>
      {title && (
      <Reveal className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <Heading id={id}>{title}</Heading>
        {lead && <p className="mt-6 mb-0 max-w-[26em] border-s-4 border-gold ps-5 text-h4 leading-relaxed font-medium text-brand">{lead}</p>}
        {children}
      </Reveal>
      )}
      <ol className={title ? 'm-0 grid list-none gap-0 p-0' : 'm-0 grid list-none gap-x-14 p-0 md:grid-cols-2'}>
        {items.map((item, i) => (
          <Reveal as="li" key={item.title} index={i} className="grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 border-t border-line-2 py-4 first:border-t-0 first:pt-0 sm:py-6">
            <span aria-hidden="true" className="text-sm font-extrabold text-gold-text">
              {padded(i + 1)}
            </span>
            <div className="min-w-0">
              <Heading as={itemLevel} size="h5" className="mb-1">
                {item.title}
              </Heading>
              <p className="m-0 text-muted-foreground">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
