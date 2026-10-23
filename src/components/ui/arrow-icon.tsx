import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Points toward the reading direction (flips in RTL) and nudges forward when its button is hovered. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden="true"
      className={cn(
        'transition-transform duration-200 ease-soft group-hover/button:translate-x-1 rtl:rotate-180 rtl:group-hover/button:-translate-x-1',
        className,
      )}
    />
  )
}
