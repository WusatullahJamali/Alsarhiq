import { Heading } from '@/components/ui/heading'
import { InfoCard } from '@/components/ui/info-card'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import type { SectorItem } from '@/lib/types'
import { ScopeChips, type ScopeChip } from './ScopeChips'

interface SectorsSectionProps {
  items: SectorItem[]
  title?: string
  lead?: string
  scope?: { label: string; chips: ScopeChip[] }
  cardLevel?: 'h2' | 'h3'
  /** "list": quiet two-column index for the home page. "cards": full detail cards. */
  layout?: 'cards' | 'list'
  children?: React.ReactNode
}

export function SectorsSection({ items, title, lead, scope, cardLevel = 'h3', layout = 'cards', children }: SectorsSectionProps) {
  return (
    <Section flush={title ? 'top' : 'none'} aria-labelledby={title ? 'sectors-title' : undefined}>
      {title && (
        <Reveal>
          <SectionHeading id="sectors-title" title={title} lead={lead} />
        </Reveal>
      )}
      {scope && <ScopeChips label={scope.label} chips={scope.chips} />}
      {layout === 'list' ? (
        <div className="grid gap-x-14 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title} index={i % 2} className="flex min-w-0 flex-col gap-1 border-t border-line-2 py-4 sm:py-5">
              <span className="text-xs font-bold text-gold-text">{item.tag}</span>
              <Heading as={cardLevel} size="h4">
                {item.title}
              </Heading>
              <p className="m-0 text-sm text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} index={i % 3}>
              <InfoCard
                kicker={item.tag}
                title={item.title}
                text={item.text}
                list={item.list}
                level={cardLevel}
                tone={i === items.length - 1 ? 'feature' : 'default'}
              />
            </Reveal>
          ))}
        </div>
      )}
      {children}
    </Section>
  )
}
