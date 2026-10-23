import { cn } from '@/lib/utils'
import { Heading } from './heading'

interface SectionHeadingProps {
  id?: string
  title: string
  lead?: string
  tone?: 'default' | 'dark'
  className?: string
}

/** Two-column heading block used by every section: title start, lead end. */
export function SectionHeading({ id, title, lead, tone = 'default', className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-7 grid items-end gap-x-8 gap-y-3 sm:mb-11 sm:gap-y-4 md:grid-cols-[1fr_1.4fr]', className)}>
      <Heading id={id}>{title}</Heading>
      {lead && <p className={cn('max-w-[36em]', tone === 'dark' ? 'text-dark-muted' : 'text-muted-foreground')}>{lead}</p>}
    </div>
  )
}
