import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Container } from './container'

const sectionVariants = cva('py-10 min-[640px]:py-14 min-[1024px]:py-section', {
  variants: {
    tone: {
      default: '',
      paper: 'border-y border-line bg-paper',
      dark: 'bg-dark text-dark-fg',
    },
    flush: { top: 'pt-0 min-[640px]:pt-0 min-[1024px]:pt-0', none: '' },
  },
  defaultVariants: { tone: 'default', flush: 'none' },
})

type SectionProps = ComponentProps<'section'> & VariantProps<typeof sectionVariants> & { containerClassName?: string }

export function Section({ tone, flush, className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ tone, flush }), className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
