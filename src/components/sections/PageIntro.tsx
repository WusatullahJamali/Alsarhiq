import { Seo } from '@/components/Seo'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'

interface PageIntroProps {
  title: string
  lead?: string
  /** Search title and description, when they should differ from the h1 and lead. */
  meta?: { title?: string; description: string }
}

/** Dark title band of every inner page: the page's only h1, plus its SEO title and description (the lead unless `meta`). */
export function PageIntro({ title, lead, meta }: PageIntroProps) {
  return (
    <>
      <Seo title={meta?.title ?? title} description={meta?.description ?? lead ?? title} />
      <section className="relative overflow-hidden border-b-[6px] border-gold bg-dark bg-grid text-dark-fg">
        <Container className="relative grid gap-4 py-9 sm:py-14">
          <Heading as="h1" size="h1" className="rise max-w-[22ch]">
            {title}
          </Heading>
          {lead && (
            <p className="rise m-0 max-w-[40em] text-lead leading-relaxed text-dark-soft" style={{ ['--d' as string]: '110ms' }}>
              {lead}
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
