import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import { TickList } from '@/components/ui/tick-list'

/** Short explanatory block at the end of a thin page: reads `<k>.title`, `<k>.text` and optional `<k>.list` of a namespace (`k` defaults to `note`). */
export function PageNote({ ns, k = 'note' }: { ns: string; k?: string }) {
  const { t } = useTranslation(ns)
  const list = t(`${k}.list`, { returnObjects: true, defaultValue: [] }) as string[]

  return (
    <Section>
      <SectionHeading title={t(`${k}.title`)} lead={t(`${k}.text`)} />
      {list.length > 0 && <TickList items={list} />}
    </Section>
  )
}
