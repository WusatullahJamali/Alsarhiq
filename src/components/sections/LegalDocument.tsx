import { Heading } from '@/components/ui/heading'
import { Section } from '@/components/ui/section'

export interface LegalSection {
  id: string
  title: string
  body: string[]
}

interface LegalDocumentProps {
  sections: LegalSection[]
  tocLabel: string
  updatedLabel: string
  updatedDate: string
}

/** Reading layout: numbered sections on the end side, a sticky contents list on the start side (large screens). */
export function LegalDocument({ sections, tocLabel, updatedLabel, updatedDate }: LegalDocumentProps) {
  return (
    <Section containerClassName="grid gap-x-14 gap-y-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <p className="m-0 mb-4 text-sm text-muted-foreground">
          {updatedLabel}: <time dateTime={updatedDate.slice(0, 10)}>{updatedDate}</time>
        </p>
        <nav aria-label={tocLabel} className="hidden lg:block">
          <p className="m-0 mb-2 text-xs font-bold text-gold-text">{tocLabel}</p>
          <ol className="m-0 grid list-none gap-0 border-s border-line-2 p-0">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="-ms-px flex min-h-11 items-center border-s-2 border-transparent ps-4 text-sm text-muted-foreground transition-colors duration-200 hover:border-gold hover:text-brand"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
      <div className="min-w-0 max-w-[44rem]">
        {sections.map((section, i) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28 border-t border-line-2 py-6 first:border-t-0 first:pt-0 sm:py-8">
            <Heading id={`${section.id}-title`} as="h2" size="h4" className="mb-3">
              <span aria-hidden="true" className="me-2 text-gold-text">
                {i + 1}.
              </span>
              {section.title}
            </Heading>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="my-2 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Section>
  )
}
