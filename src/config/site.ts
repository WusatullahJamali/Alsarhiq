type Localized = { en: string; ar: string }

export const siteUrl = 'https://alsarhiq.com'

export const siteConfig = {
  url: siteUrl,
  domain: 'alsarhiq.com',
  phone: '07706699333',
  phoneIntl: '+9647706699333',
  phoneDisplay: '0770 669 9333',
  whatsapp: '9647706699333',
  // TODO(client): email, address, hours and social are still empty because the client has not sent them.
  // Fill them in here when they arrive. The footer, contact page and Organization JSON-LD pick them up on their own;
  // while empty, none of them is shown or output (no empty labels, no "#" links). Never invent values.
  /** Optional contact details. Each one is shown (footer, contact page) only when filled in. */
  email: '',
  address: { en: '', ar: '' } as Localized,
  hours: { en: '', ar: '' } as Localized,
  /** Social profiles: { name, href }. Filled in = shown in the footer and in the Organization JSON-LD. */
  social: [] as { name: string; href: string }[],
  /** ISO date shown as "last updated" on the Privacy and Terms pages. */
  legalUpdated: '2026-10-23',
  /** Site is static: no form request is ever sent, contact goes to WhatsApp. */
  formEndpoint: '' as string,
}

export const waEnabled = true
