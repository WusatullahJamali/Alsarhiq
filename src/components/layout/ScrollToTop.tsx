import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Page-wise routing: start each page at the top (and keep the position when only the language changes). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const page = pathname.split('/').slice(2).join('/')
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page])
  // Links like /services#service-2: the page is lazy, so wait until the target exists, then scroll to it.
  useEffect(() => {
    if (!hash) return
    let tries = 0
    let frame = 0
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
      else if (tries++ < 40) frame = requestAnimationFrame(seek)
    }
    frame = requestAnimationFrame(seek)
    return () => cancelAnimationFrame(frame)
  }, [page, hash])
  return null
}
