import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, buttonVariants } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { FormMessage } from '@/components/ui/form-message'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/config/site'
import { useItems } from '@/hooks/useContent'
import { useLang } from '@/hooks/useLang'
import { useSimpleForm } from '@/hooks/useSimpleForm'
import { isValidPhone, normalizePhone } from '@/lib/phone'
import { isEmail } from '@/lib/validators'
import { contactMode, sendContact } from '@/lib/contact'

const subjectValues = ['contracting', 'supply', 'investment', 'healthcare', 'correctional', 'government', 'industrial', 'digital'] as const

export function ContactForm() {
  const { t } = useTranslation('contact')
  const { lang } = useLang()
  const subjects = useItems<string>('contact', 'services')
  const [waUrl, setWaUrl] = useState('')

  const form = useSimpleForm({
    idPrefix: 'contact',
    initial: { name: '', email: '', phone: '', subject: subjectValues[0] as string, message: '' },
    resetOnSuccess: contactMode === 'endpoint',
    validate: (v) => ({
      name: v.name.trim() ? undefined : t('form.errName'),
      email: isEmail(v.email) ? undefined : t('form.errEmail'),
      phone: v.phone.trim() && !isValidPhone(normalizePhone(v.phone)) ? t('form.errPhone') : undefined,
      message: v.message.trim() ? undefined : t('form.errMessage'),
    }),
    submit: async (v) => {
      const label = subjects[subjectValues.indexOf(v.subject as (typeof subjectValues)[number])] ?? v.subject
      const phone = normalizePhone(v.phone)
      const waText = [
        t('wa.intro'),
        `${t('wa.name')}: ${v.name.trim()}`,
        `${t('wa.email')}: ${v.email.trim()}`,
        phone && `${t('wa.phone')}: ${phone}`,
        `${t('wa.service')}: ${label}`,
        `${t('wa.message')}: ${v.message.trim()}`,
      ]
        .filter(Boolean)
        .join('\n')
      const result = await sendContact({ name: v.name.trim(), email: v.email.trim(), phone, subject: v.subject, message: v.message.trim(), language: lang }, waText)
      if (result.kind === 'whatsapp') setWaUrl(result.url)
    },
  })
  const sending = form.status === 'sending'
  const sent = form.status === 'success'
  const failed = form.status === 'error' || (sent && contactMode === 'call')

  return (
    <form onSubmit={form.onSubmit} noValidate aria-labelledby="contact-form-title" className="grid min-w-0 gap-4 rounded-md border border-line bg-paper p-5 shadow-card sm:p-7">
      <div className="grid gap-1.5">
        <Heading id="contact-form-title" as="h2" size="h4">
          {t('form.title')}
        </Heading>
        <p className="m-0 text-sm leading-relaxed text-muted-foreground">{contactMode === 'endpoint' ? t('form.noteEndpoint') : t('form.note')}</p>
      </div>

      <div className="grid gap-4 min-[560px]:grid-cols-2">
        <FormField id="contact-name" label={t('form.name')} error={form.errors.name} required>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={form.values.name}
            onChange={(e) => form.setValue('name', e.target.value)}
            placeholder={t('form.namePlaceholder')}
            aria-invalid={!!form.errors.name}
            aria-describedby={form.errors.name ? 'contact-name-error' : undefined}
          />
        </FormField>
        <FormField id="contact-email" label={t('form.email')} error={form.errors.email} required>
          <Input
            id="contact-email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            inputMode="email"
            className="text-start"
            value={form.values.email}
            onChange={(e) => form.setValue('email', e.target.value)}
            placeholder={t('form.emailPlaceholder')}
            aria-invalid={!!form.errors.email}
            aria-describedby={form.errors.email ? 'contact-email-error' : undefined}
          />
        </FormField>
      </div>

      <div className="grid gap-4 min-[560px]:grid-cols-2">
        <FormField id="contact-phone" label={t('form.phone')} optionalLabel={t('form.optional')} error={form.errors.phone}>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            inputMode="tel"
            className="text-start"
            value={form.values.phone}
            onChange={(e) => form.setValue('phone', e.target.value)}
            placeholder={t('form.phonePlaceholder')}
            aria-invalid={!!form.errors.phone}
            aria-describedby={form.errors.phone ? 'contact-phone-error' : undefined}
          />
        </FormField>
        <FormField id="contact-subject" label={t('form.subject')}>
          <Select
            value={form.values.subject}
            onValueChange={(v) => form.setValue('subject', String(v))}
            items={subjectValues.map((value, i) => ({ value, label: subjects[i] ?? value }))}
          >
            <SelectTrigger id="contact-subject" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {subjectValues.map((value, i) => (
                <SelectItem key={value} value={value}>
                  {subjects[i] ?? value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <FormField id="contact-message" label={t('form.message')} error={form.errors.message} required>
        <Textarea
          id="contact-message"
          name="message"
          value={form.values.message}
          onChange={(e) => form.setValue('message', e.target.value)}
          placeholder={t('form.messagePlaceholder')}
          aria-invalid={!!form.errors.message}
          aria-describedby={form.errors.message ? 'contact-message-error' : undefined}
        />
      </FormField>

      <Button type="submit" disabled={sending}>
        {sending ? t('form.sending') : contactMode === 'endpoint' ? t('form.submitEndpoint') : t('form.submit')}
      </Button>

      <FormMessage tone="success">
        {sent && !failed && (
          <>
            <p className="m-0">{contactMode === 'wa' ? t('form.ready') : t('form.sent')}</p>
            {contactMode === 'wa' && waUrl && (
              <a href={waUrl} target="_blank" rel="noopener" className={buttonVariants({ size: 'sm' })}>
                {t('form.openWa')}
              </a>
            )}
          </>
        )}
      </FormMessage>
      <FormMessage tone="error">
        {failed && (
          <>
            <p className="m-0">{t('form.sendFail', { phone: siteConfig.phone })}</p>
            <a href={`tel:${siteConfig.phoneIntl}`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              <bdi dir="ltr">{siteConfig.phone}</bdi>
            </a>
          </>
        )}
      </FormMessage>
    </form>
  )
}
