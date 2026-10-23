import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Live-region result box under a form. Always mounted so screen readers announce changes. */
export function FormMessage({ tone, children }: { tone: 'success' | 'error'; children?: ReactNode }) {
  return (
    <div
      role="status"
      aria-live="polite"
      hidden={!children}
      className={cn(
        'grid gap-3 rounded-md border p-4 text-sm',
        tone === 'success' ? 'border-brand/30 bg-tint text-brand' : 'border-err-light/40 bg-err-light/5 text-err-light',
      )}
    >
      {children}
    </div>
  )
}
