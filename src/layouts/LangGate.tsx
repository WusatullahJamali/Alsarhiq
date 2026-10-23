import { Navigate, Outlet, useLocation, useParams } from 'react-router'
import i18n, { defaultLocale, isLocale } from '@/i18n'

/** Valid /:lang renders the page tree; anything else goes to /en. */
export function LangGate() {
  const { lang } = useParams()
  const { search } = useLocation()
  if (!isLocale(lang)) return <Navigate to={`/${defaultLocale}${search}`} replace />
  // Resources are bundled, so this switches synchronously before children render.
  if (i18n.language !== lang) void i18n.changeLanguage(lang)
  return <Outlet />
}
