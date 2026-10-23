import { LegalDocument } from '@/components/sections/LegalDocument'
import { PageIntro } from '@/components/sections/PageIntro'
import { useLegal } from '@/hooks/useContent'

export default function Privacy() {
  const doc = useLegal('privacy')

  return (
    <>
      <PageIntro title={doc.title} lead={doc.lead} />
      <LegalDocument sections={doc.sections} tocLabel={doc.tocLabel} updatedLabel={doc.updatedLabel} updatedDate={doc.updatedDate} />
    </>
  )
}
