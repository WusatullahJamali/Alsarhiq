import { useState, type FormEvent } from 'react'

export type FormStatus = 'idle' | 'sending' | 'success' | 'error'

interface Options<V extends object> {
  initial: V
  /** Returns an error message per invalid field (empty object = valid). */
  validate: (values: V) => Partial<Record<keyof V, string>>
  submit: (values: V) => Promise<void>
  resetOnSuccess?: boolean
  /** Field ids are `${idPrefix}-${field}`; the first invalid one gets focus. */
  idPrefix: string
}

/** Small controlled-form helper shared by login, signup, forgot password and contact. */
export function useSimpleForm<V extends object>({ initial, validate, submit, resetOnSuccess, idPrefix }: Options<V>) {
  const [values, setValues] = useState<V>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof V, string>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const setValue = <K extends keyof V>(field: K, value: V[K]) => {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    setStatus('idle')
    const firstBad = (Object.keys(found) as (keyof V)[]).find((key) => found[key])
    if (firstBad) {
      document.getElementById(`${idPrefix}-${String(firstBad)}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      await submit(values)
      if (resetOnSuccess) setValues(initial)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return { values, setValue, errors, status, setStatus, onSubmit, idPrefix }
}
