import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from './locales/ar.json'
import en from './locales/en.json'

export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
export const rtlLocales: readonly Locale[] = ['ar']

/** Native names for the switcher; ar-IQ keeps Arabic-Indic digits like the template. */
export const localeMeta: Record<Locale, { label: string; short: string; intl: string; ogLocale: string }> = {
  en: { label: 'English', short: 'EN', intl: 'en', ogLocale: 'en_US' },
  ar: { label: 'العربية', short: 'عربي', intl: 'ar-IQ', ogLocale: 'ar_IQ' },
}

export const isLocale = (value: string | undefined): value is Locale => locales.includes(value as Locale)
export const isRtl = (locale: Locale) => rtlLocales.includes(locale)

export const namespaces = ['common', 'home', 'services', 'sectors', 'process', 'about', 'partners', 'contact', 'auth', 'legal'] as const

/** One file per language; each top-level key is a namespace (common, home, services, ...). */
const resources = { en, ar }

void i18n.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  supportedLngs: [...locales],
  ns: [...namespaces],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

export default i18n
