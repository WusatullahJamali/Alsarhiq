import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/ui/section-heading'
import { Section } from '@/components/ui/section'
import { TickList } from '@/components/ui/tick-list'

/** Short explanatory block at the end of a thin page: reads `note.title`, `note.text` and optional `note.list` of a namespace. */
export function PageNote({ ns }: { ns: string }) {
  const { t } = useTranslation(ns)
  const list = t('note.list', { returnObjects: true, defaultValue: [] }) as string[]

  return (
    <Section>
      <SectionHeading title={t('note.title')} lead={t('note.text')} />
      {list.length > 0 && <TickList items={list} />}
    </Section>
  )
}
