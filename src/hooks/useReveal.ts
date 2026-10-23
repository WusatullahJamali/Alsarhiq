import { useEffect, useRef } from 'react'

/**
 * Marks the element once, as soon as any part of it is about to enter the viewport (threshold 0 + 8% margin below,
 * so tall elements and elements at the very end of a page can never stay hidden). CSS (.reveal) does the animation.
 * Safety net: if the observer has not fired after 2.5s but the element is on screen, it is shown anyway.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const show = () => node.setAttribute('data-in', '')
    if (!('IntersectionObserver' in window)) {
      show()
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show()
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px 8% 0px', threshold: 0 },
    )
    observer.observe(node)
    const safety = window.setTimeout(() => {
      if (node.getBoundingClientRect().top < window.innerHeight) show()
    }, 2500)
    return () => {
      observer.disconnect()
      window.clearTimeout(safety)
    }
  }, [])

  return ref
}
