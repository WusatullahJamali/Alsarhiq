import { useMemo } from 'react'
import { useLang } from './useLang'

export function useFormat() {
  const { intl } = useLang()
  return useMemo(() => {
    const number = new Intl.NumberFormat(intl)
    const padded = new Intl.NumberFormat(intl, { minimumIntegerDigits: 2 })
    const year = new Intl.DateTimeFormat(intl, { year: 'numeric' })
    return {
      number: (n: number) => number.format(n),
      padded: (n: number) => padded.format(n),
      year: (d: Date = new Date()) => year.format(d),
    }
  }, [intl])
}
