import { Heading } from '@/components/ui/heading'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'

export interface ProcessStep {
  label: string
  title: string
  text: string
}

interface ProcessSectionProps {
  steps: ProcessStep[]
  title?: string
  lead?: string
  stepLevel?: 'h2' | 'h3'
  children?: React.ReactNode
}

export function ProcessSection({ steps, title, lead, stepLevel = 'h3', children }: ProcessSectionProps) {
  return (
    <Section tone="paper" aria-labelledby={title ? 'process-title' : undefined}>
      {title && (
        <Reveal>
          <SectionHeading id="process-title" title={title} lead={lead} />
        </Reveal>
      )}
      <ol className="m-0 grid list-none gap-x-0 gap-y-6 p-0 min-[480px]:grid-cols-2 sm:gap-y-9 min-[1024px]:grid-cols-5">
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} index={i} className="min-w-0 pe-5">
            <div aria-hidden="true" className="mb-4 h-1.5 bg-line">
              <div className="h-full bg-brand" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
            </div>
            <div className="text-xs font-bold text-gold-text">{step.label}</div>
            <Heading as={stepLevel} size="h5" className="mt-1 mb-1.5">
              {step.title}
            </Heading>
            <p className="m-0 text-sm text-muted-foreground">{step.text}</p>
          </Reveal>
        ))}
      </ol>
      {children}
    </Section>
  )
}
