/** `offline`: the site did not answer when last checked (Oct 2026), so it is shown as text, not a link. Remove the flag once it works again. */
/** Partner names and sites are brand names, not translated. Role and description text lives in each language's partners.json, matched by position. */
export const partners = [
  { id: 'jayak', name: 'JayakHub', site: 'jayakhub.com' },
  { id: 'damanos', name: 'DAMANOS', site: 'damanos.com' },
  { id: 'zafir', name: 'Zafir360', site: 'zafir360.com' },
  { id: 'hdiraq', name: 'HomeDepotIRAQ', site: 'homedepotiraq.com' },
  { id: 'nortra', name: 'Nortra', suffix: 'LLC', site: 'nortra.ai' },
  { id: 'listr', name: 'Listr', site: 'listr.live' },
  { id: 'siteflows', name: 'SiteFlows', site: 'siteflows.ai' },
  { id: 'sentinel', name: 'Sentinel Kids', site: 'sentinelkids.com' },
  { id: 'roos', name: 'Roos Brothers 1865', site: 'roosbrothers1865.com' },
  { id: 'damantrax', name: 'DamanTrax', site: 'damantrax.com', offline: true },
  { id: 'albasync', name: 'AlbaSync', site: 'albasync.com', offline: true },
  { id: 'advibe', name: 'AdVibe Group', site: 'advibegroup.com', offline: true },
] as const

export type Partner = (typeof partners)[number]
