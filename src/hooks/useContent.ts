import { useTranslation } from 'react-i18next'
import type { LegalSection } from '@/components/sections/LegalDocument'
import type { PartnerView } from '@/components/sections/PartnersSection'
import type { ProcessStep } from '@/components/sections/ProcessSection'
import type { ScopeChip } from '@/components/sections/ScopeChips'
import { partners } from '@/config/partners'
import { siteConfig } from '@/config/site'
import type { PartnerCopy, ReasonItem, SectorItem, ServiceItem, StepItem } from '@/lib/types'
import { useFormat } from './useFormat'
import { useLang } from './useLang'

/** Reads an array of objects/strings from a namespace, so content stays in the JSON files. */
export function useItems<T>(ns: string, key: string): T[] {
  const { t } = useTranslation(ns)
  const value = t(key, { returnObjects: true }) as unknown
  return Array.isArray(value) ? (value as T[]) : []
}

/** Content readers shared by the Home previews and the full pages. */
export const useServices = () => useItems<ServiceItem>('services', 'items')
export const useSectors = () => useItems<SectorItem>('sectors', 'items')
export const useReasons = () => useItems<ReasonItem>('about', 'items')

export function useProcessSteps(): ProcessStep[] {
  const { t } = useTranslation('process')
  const { number } = useFormat()
  return useItems<StepItem>('process', 'steps').map((step, i) => ({ ...step, label: t('stage', { n: number(i + 1) }) }))
}

export function useScopeChips(): ScopeChip[] {
  const { number } = useFormat()
  return useItems<string>('sectors', 'scope').map((label, i) => ({ number: number(i + 1), label }))
}

/** Brand data comes from config; descriptions come from the locale file by position (extra partners show name and link only). */
export function usePartners(): PartnerView[] {
  const copy = useItems<PartnerCopy>('partners', 'items')
  return partners.map((partner, i) => ({ ...partner, role: copy[i]?.role, text: copy[i]?.text }))
}

/** Title, lead, sections and the formatted "last updated" date for the Privacy or Terms document. */
export function useLegal(kind: 'privacy' | 'terms') {
  const { t } = useTranslation('legal')
  const { intl } = useLang()
  const sections = useItems<LegalSection>('legal', `${kind}.sections`)
  return {
    title: t(`${kind}.title`),
    lead: t(`${kind}.lead`),
    sections,
    tocLabel: t('toc'),
    updatedLabel: t('updated'),
    updatedDate: new Intl.DateTimeFormat(intl, { dateStyle: 'long' }).format(new Date(siteConfig.legalUpdated)),
  }
}
