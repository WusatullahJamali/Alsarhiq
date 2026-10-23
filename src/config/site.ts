type Localized = { en: string; ar: string }

export const siteConfig = {
  url: 'https://alsarhiq.com',
  domain: 'alsarhiq.com',
  phone: '07706699333',
  phoneIntl: '+9647706699333',
  phoneDisplay: '0770 669 9333',
  whatsapp: '9647706699333',
  /** Optional contact details. Each one is shown (footer, contact page) only when filled in. */
  email: '',
  address: { en: '', ar: '' } as Localized,
  hours: { en: '', ar: '' } as Localized,
  /** Social profiles: { name, href }. Filled in = shown in the footer and in the Organization JSON-LD. */
  social: [] as { name: string; href: string }[],
  /** ISO date shown as "last updated" on the Privacy and Terms pages. */
  legalUpdated: '2026-10-23',
  /** Set to a real form service URL to POST contact requests instead of preparing a WhatsApp message. */
  formEndpoint: '',
} as const

export const waEnabled = true
