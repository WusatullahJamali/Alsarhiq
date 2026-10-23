import { isLocale, type Locale } from '@/i18n'

/** Swaps the leading /:lang segment so the language switcher stays on the same page. */
export function switchLangPath(pathname: string, target: Locale) {
  const [, first, ...rest] = pathname.split('/')
  const tail = isLocale(first) ? rest : [first, ...rest].filter(Boolean)
  return `/${[target, ...tail].filter(Boolean).join('/')}`
}
