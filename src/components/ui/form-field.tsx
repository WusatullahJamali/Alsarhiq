import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  /** Marks the field as required with an asterisk, or shows the optional hint text. */
  required?: boolean
  optionalLabel?: string
  className?: string
  children: ReactNode
}

/** Label + control + inline error. The control must set aria-describedby to `${id}-error` when error is present. */
export function FormField({ id, label, error, required, optionalLabel, className, children }: FormFieldProps) {
  return (
    <div className={cn('grid min-w-0 gap-1.5', className)}>
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && (
          <span aria-hidden="true" className="ms-0.5 text-err-light">
            *
          </span>
        )}
        {optionalLabel && <span className="ms-1.5 font-normal text-muted-foreground">{optionalLabel}</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="m-0 text-xs font-medium text-err-light">
          {error}
        </p>
      )}
    </div>
  )
}
