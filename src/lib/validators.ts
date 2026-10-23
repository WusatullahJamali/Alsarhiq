export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())

export const minPasswordLength = 8

/** Names: letters (any script), marks, spaces and . ' - only. Digits and symbols are dropped while typing. */
export const cleanName = (value: string) => value.replace(/[^\p{L}\p{M}\s.'’-]/gu, '').replace(/\s{2,}/g, ' ')
export const isName = (value: string) => (value.match(/\p{L}/gu)?.length ?? 0) >= 2

/** Phone: digits (Latin or Arabic-Indic), spaces, dashes, brackets and a leading + only. */
export const cleanPhone = (value: string) => value.replace(/(?!^)\+/g, '').replace(/[^\d٠-٩+\s\-()]/g, '')

export const maxPasswordLength = 64
/** Signup rule: min length, a letter, a digit, no spaces. */
export const isStrongPassword = (value: string) =>
  value.length >= minPasswordLength && value.length <= maxPasswordLength && /\p{L}/u.test(value) && /\d/.test(value) && !/\s/.test(value)
