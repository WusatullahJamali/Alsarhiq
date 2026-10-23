import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router'
import { defaultLocale, isLocale, isRtl, localeMeta, type Locale } from '@/i18n'

/** Current language from the URL, with its direction and Intl tag. */
export function useLang() {
  const { lang } = useParams()
  const locale: Locale = isLocale(lang) ? lang : defaultLocale
  return { lang: locale, dir: isRtl(locale) ? ('rtl' as const) : ('ltr' as const), intl: localeMeta[locale].intl }
}

/** Keeps <html lang dir> in sync with the URL language. */
export function useDirection() {
  const { lang, dir } = useLang()
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])
  return dir
}

/** Builds /:lang/path links. Empty path = home. */
export function useLocalizedPath() {
  const { lang } = useLang()
  return useCallback((path = '') => (path ? `/${lang}/${path}` : `/${lang}`), [lang])
}
