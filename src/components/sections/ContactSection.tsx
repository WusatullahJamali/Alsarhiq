import { Section } from '@/components/ui/section'
import { ContactForm } from './ContactForm'
import { ContactInfo } from './ContactInfo'

/** Form on the start side, contact cards on the end side. Stacks on phones with the quick contact cards first. */
export function ContactSection() {
  return (
    <Section containerClassName="grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
      <div className="min-w-0 max-lg:order-2">
        <ContactForm />
      </div>
      <div className="min-w-0 max-lg:order-1">
        <ContactInfo />
      </div>
    </Section>
  )
}
