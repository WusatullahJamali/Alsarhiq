import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Shared link look for footer lists (44px tall hit area, underline on hover). */
export const footerLink =
  'inline-flex min-h-11 min-w-11 items-center text-dark-muted transition-colors duration-200 hover:text-dark-fg hover:underline underline-offset-4'

interface FooterColumnProps {
  title: string
  children: ReactNode
  className?: string
  /** Lay the list out in two columns (used for the longest list so all columns end at a similar height). */
  columns?: 1 | 2
}

export function FooterColumn({ title, children, className, columns = 1 }: FooterColumnProps) {
  return (
    <div className={cn('min-w-0', className)}>
      <p className="m-0 mb-2 text-lg font-bold text-dark-fg after:mt-2 after:block after:h-0.5 after:w-8 after:bg-gold">{title}</p>
      <ul className={cn('m-0 grid list-none gap-0 p-0', columns === 2 && 'grid-cols-2 gap-x-4')}>{children}</ul>
    </div>
  )
}
