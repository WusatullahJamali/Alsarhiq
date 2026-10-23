import { lazy } from 'react'
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router'
import { defaultLocale } from '@/i18n'
import { pages, type PageKey } from '@/config/pages'
import { AuthLayout } from '@/layouts/AuthLayout'
import { LangGate } from '@/layouts/LangGate'
import { MainLayout } from '@/layouts/MainLayout'

/** One lazy chunk per page. Adding a page: file in pages/, entry here, entry in config/pages.ts, keys in the locale files. */
const components: Record<PageKey, React.LazyExoticComponent<React.ComponentType>> = {
  home: lazy(() => import('@/pages/Home')),
  services: lazy(() => import('@/pages/Services')),
  sectors: lazy(() => import('@/pages/Sectors')),
  process: lazy(() => import('@/pages/Process')),
  about: lazy(() => import('@/pages/About')),
  partners: lazy(() => import('@/pages/Partners')),
  contact: lazy(() => import('@/pages/Contact')),
  privacy: lazy(() => import('@/pages/Privacy')),
  terms: lazy(() => import('@/pages/Terms')),
  login: lazy(() => import('@/pages/Login')),
  signup: lazy(() => import('@/pages/Signup')),
  'forgot-password': lazy(() => import('@/pages/ForgotPassword')),
}
const NotFound = lazy(() => import('@/pages/NotFound'))

const routesFor = (layout: 'main' | 'auth'): RouteObject[] =>
  pages
    .filter((page) => page.layout === layout)
    .map((page) => {
      const Page = components[page.key]
      return page.path ? { path: page.path, element: <Page /> } : { index: true, element: <Page /> }
    })

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={`/${defaultLocale}`} replace /> },
  {
    path: '/:lang',
    element: <LangGate />,
    children: [
      { element: <MainLayout />, children: [...routesFor('main'), { path: '*', element: <NotFound /> }] },
      { element: <AuthLayout />, children: routesFor('auth') },
    ],
  },
  { path: '*', element: <Navigate to={`/${defaultLocale}`} replace /> },
])
