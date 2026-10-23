import type { ComponentProps, ElementType } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'

interface RevealProps extends ComponentProps<'div'> {
  /** Position in a grid: each step adds 70ms. */
  index?: number
  /** Use "li" inside lists so the markup stays valid. */
  as?: 'div' | 'li'
}

export function Reveal({ index = 0, as = 'div', className, style, ...props }: RevealProps) {
  const ref = useReveal<HTMLDivElement>()
  const Tag = as as ElementType
  return <Tag ref={ref} className={cn('reveal', className)} style={{ ['--d' as string]: `${index * 70}ms`, ...style }} {...props} />
}
