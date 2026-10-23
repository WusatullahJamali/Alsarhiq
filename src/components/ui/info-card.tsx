import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Heading } from './heading'
import { TickList } from './tick-list'

const cardVariants = cva(
  'flex h-full min-w-0 flex-col gap-2.5 rounded-md border p-5 shadow-card sm:p-6 transition-[transform,box-shadow,border-color] duration-200 ease-soft hover:-translate-y-1 hover:shadow-card-hover',
  {
    variants: {
      tone: {
        default: 'border-line bg-paper hover:border-gold',
        feature: 'border-transparent bg-dark text-dark-fg',
      },
    },
    defaultVariants: { tone: 'default' },
  },
)

interface InfoCardProps extends VariantProps<typeof cardVariants> {
  kicker?: string
  title: string
  text?: string
  list?: string[]
  /** h2 on inner pages (h1 lives in PageIntro), h3 under a section heading. */
  level?: 'h2' | 'h3'
  className?: string
}

export function InfoCard({ kicker, title, text, list, level = 'h3', tone, className }: InfoCardProps) {
  const feature = tone === 'feature'
  return (
    <article className={cn(cardVariants({ tone }), className)}>
      {kicker && <span className={cn('text-xs font-bold', feature ? 'text-gold' : 'text-gold-text')}>{kicker}</span>}
      <Heading as={level} size="h4">
        {title}
      </Heading>
      {text && <p className={cn('m-0 text-sm', feature ? 'text-dark-muted' : 'text-muted-foreground')}>{text}</p>}
      {list && list.length > 0 && <TickList items={list} dense className="mt-1" />}
    </article>
  )
}
