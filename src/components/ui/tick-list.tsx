import { cn } from '@/lib/utils'

interface TickListProps {
  items: string[]
  className?: string
  /** Smaller bullets and gap, used inside cards. */
  dense?: boolean
}

export function TickList({ items, className, dense }: TickListProps) {
  return (
    <ul className={cn('m-0 grid list-none gap-2 p-0 text-sm', dense && 'gap-1.5', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-2.5">
          <span aria-hidden="true" className={cn('-translate-y-0.5 shrink-0 bg-gold', dense ? 'size-1.5' : 'size-[7px]')} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
