import { useEffect, useRef, useState } from "react"

/**
 * Reports whether a horizontally scrollable element still has content past
 * either of its edges.
 *
 * It exists so that an affordance can tell the truth. A fade or an arrow that
 * is always painted claims there is more to see even when there is not, and a
 * strip that happens to fit its container then reads as broken rather than
 * complete. Both flags start false and end false, so the state of a strip with
 * nothing to scroll — a short group, a wide screen — is the honest one, with
 * no breakpoint needed to switch the hint off.
 *
 * Attach `ref` to the element that scrolls. If its first child is the row of
 * content, that child is watched too: the element's own box catches a viewport
 * resize, while the child's catches everything that changes how wide the
 * contents are without touching the strip — a locale switch, a webfont
 * landing, an item being added.
 */
export function useScrollEdges<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [edges, setEdges] = useState({ moreBefore: false, moreAfter: false })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const read = () => {
      const max = element.scrollWidth - element.clientWidth
      // A pixel of slack at either end. Sub-pixel layout and fractional device
      // pixel ratios leave `scrollLeft` a hair short of its own maximum, and
      // without the slack the "more this way" hint stays lit at the end of a
      // strip that has nothing left to show.
      const moreBefore = element.scrollLeft > 1
      const moreAfter = element.scrollLeft < max - 1

      // Bail out when nothing changed. `read` runs on every scroll event, and
      // returning the same object leaves React with no re-render to do — so
      // the component only re-renders at the two moments it has to.
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
