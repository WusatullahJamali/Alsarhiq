import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { BackToTop } from '@/components/layout/BackToTop'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileCallBar } from '@/components/layout/MobileCallBar'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SkipLink } from '@/components/layout/SkipLink'
import { useDirection } from '@/hooks/useLang'

/** Full-height column: short pages (404) keep the footer at the bottom. */
export function MainLayout() {
  useDirection()

  return (
    <div className="flex min-h-svh flex-col max-[700px]:pb-15">
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<div className="min-h-[50svh]" aria-hidden="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileCallBar />
      <BackToTop />
      <ScrollToTop />
    </div>
  )
}
