import { useEffect, useRef, useState } from "react"

export function useScrollEdges<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [edges, setEdges] = useState({ moreBefore: false, moreAfter: false })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const read = () => {
      const max = element.scrollWidth - element.clientWidth
      const moreBefore = element.scrollLeft > 1
      const moreAfter = element.scrollLeft < max - 1

      setEdges((current) =>
        current.moreBefore === moreBefore && current.moreAfter === moreAfter
          ? current
          : { moreBefore, moreAfter },
      )
    }

    read()
    element.addEventListener("scroll", read, { passive: true })

    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(read) : null

    if (observer) {
      observer.observe(element)
      if (element.firstElementChild) observer.observe(element.firstElementChild)
    }

    return () => {
      element.removeEventListener("scroll", read)
      observer?.disconnect()
    }
  }, [])

  return { ref, ...edges }
}
