import { siteConfig, waEnabled } from '@/config/site'

export interface ContactRequest {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  language: string
}

export type ContactMode = 'endpoint' | 'wa' | 'call'

export const contactMode: ContactMode = siteConfig.formEndpoint ? 'endpoint' : waEnabled ? 'wa' : 'call'

export type ContactResult = { kind: 'sent' } | { kind: 'whatsapp'; url: string } | { kind: 'call' }

/** The one place to wire a real API: set siteConfig.formEndpoint, or replace this body. */
export async function sendContact(req: ContactRequest, waText: string): Promise<ContactResult> {
  if (contactMode === 'endpoint') {
    const res = await fetch(siteConfig.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(req),
    })
    if (!res.ok) throw new Error(String(res.status))
    return { kind: 'sent' }
  }
  if (contactMode === 'wa') {
    return { kind: 'whatsapp', url: `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(waText)}` }
  }
  return { kind: 'call' }
}
