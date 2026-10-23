import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Page-wise routing: start each page at the top (and keep the position when only the language changes). */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const page = pathname.split('/').slice(2).join('/')
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page])
  return null
}
