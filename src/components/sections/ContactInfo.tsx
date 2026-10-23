import { useRef, useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Heading } from '@/components/ui/heading'
import { siteConfig } from '@/config/site'
import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

const card =
  'flex min-h-16 min-w-0 flex-1 items-center gap-3 rounded-md border border-line bg-paper px-4 py-3 shadow-card transition-[transform,box-shadow,border-color] duration-200 ease-soft hover:-translate-y-0.5 hover:border-gold hover:shadow-card-hover'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid min-w-0 gap-0.5">
      <span className="text-xs font-bold text-gold-text">{label}</span>
      <span className="min-w-0 font-bold break-words text-foreground">{children}</span>
    </div>
  )
}

/** Contact methods as small click-through cards. Email, address and hours appear only when set in config. */
export function ContactInfo() {
  const { t } = useTranslation('contact')
  const { t: common } = useTranslation()
  const { lang } = useLang()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)
  const address = siteConfig.address[lang]
  const hours = siteConfig.hours[lang]

  async function copy() {
    try {
      await navigator.clipboard.writeText(siteConfig.phone)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked: the number is plain text on the card, users can select it */
    }
  }

  return (
    <div className="grid min-w-0 content-start gap-3">
      <Heading as="h2" size="h4">
        {t('info.title')}
      </Heading>

      <div className="flex gap-2">
        <a href={`tel:${siteConfig.phoneIntl}`} className={card} aria-label={`${t('info.call')}: ${siteConfig.phone}`}>
          <Row label={t('info.call')}>
            <bdi dir="ltr">{siteConfig.phone}</bdi>
          </Row>
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? t('copy.done') : t('copy.label')}
          className={cn(card, 'w-12 flex-none justify-center px-0 text-muted-foreground hover:text-brand')}
        >
          {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
        </button>
        <span role="status" className="sr-only">
          {copied ? t('copy.done') : ''}
        </span>
      </div>

      <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener" className={card}>
        <Row label={t('info.whatsapp')}>
          <bdi dir="ltr">{siteConfig.phoneDisplay}</bdi>
          <span className="sr-only">{common('newTab')}</span>
        </Row>
      </a>

      {siteConfig.email && (
        <a href={`mailto:${siteConfig.email}`} className={card}>
          <Row label={common('footer.email')}>
            <bdi dir="ltr">{siteConfig.email}</bdi>
          </Row>
        </a>
      )}

      <div className={cn(card, 'hover:translate-y-0 hover:border-line hover:shadow-card')}>
        <Row label={common('siteLabel')}>
          <bdi dir="ltr">{siteConfig.domain}</bdi>
        </Row>
      </div>

      {address && (
        <div className={cn(card, 'hover:translate-y-0 hover:border-line hover:shadow-card')}>
          <Row label={common('footer.address')}>{address}</Row>
        </div>
      )}
      {hours && (
        <div className={cn(card, 'hover:translate-y-0 hover:border-line hover:shadow-card')}>
          <Row label={t('info.hours')}>{hours}</Row>
        </div>
      )}
    </div>
  )
}
