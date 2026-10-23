import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SkipLink } from '@/components/layout/SkipLink'
import { useDirection } from '@/hooks/useLang'

/** Login flow pages: no navbar, no footer. The page itself carries the logo and language switch. */
export function AuthLayout() {
  useTranslation()
  useDirection()

  return (
    <>
      <SkipLink />
      <main id="main" tabIndex={-1} className="min-h-svh outline-none">
        <Suspense fallback={<div className="min-h-svh" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollToTop />
    </>
  )
}
