const arabicIndic = /[٠-٩]/g

export const toLatinDigits = (s: string) => s.replace(arabicIndic, (c) => String(c.charCodeAt(0) - 1632))

/** Accepts local or international numbers; spaces, dashes, brackets and Arabic digits are allowed. */
export const normalizePhone = (raw: string) => toLatinDigits(raw).replace(/[\s\-()]/g, '')

export const isValidPhone = (normalized: string) => /^\+?[0-9]{7,15}$/.test(normalized)
