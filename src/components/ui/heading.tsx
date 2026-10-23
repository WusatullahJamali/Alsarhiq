import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const headingVariants = cva('font-extrabold text-balance', {
  variants: {
    size: {
      h1: 'text-h1 leading-tight',
      h2: 'text-h2 leading-tight',
      h3: 'text-h3 leading-snug',
      h4: 'text-h4 leading-snug',
      h5: 'text-h5 leading-snug font-bold',
    },
  },
  defaultVariants: { size: 'h2' },
})

type HeadingProps = ComponentProps<'h2'> & VariantProps<typeof headingVariants> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }

export function Heading({ as: Tag = 'h2', size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />
}
