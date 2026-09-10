import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { sectionScrollTop } from "@/animation"
import { findProject } from "@/content/work"

/**
 * Honours a section fragment in the URL on first load.
 *
 * The page is a single React route, so by the time the browser tries to resolve
 * `/#work` the section does not exist in the DOM yet and the fragment is
 * silently dropped. Shared deep links would land on the hero every time.
 *
 * The jump is deliberately instant rather than smooth. A deep link should
 * behave the way the browser's own fragment navigation does — you asked for
 * that section, so you arrive at it. Animating it would mean a second or more
 * of scrolling past everything above, and would race the motion runtime, which
 * is still initialising at this point in the page's life.
 *
 * Where it lands comes from `sectionScrollTop`, the same function the navbar
 * uses, so a shared link and a click arrive at exactly the same place.
 * `scrollIntoView` would honour the target's `scroll-margin-top` but not the
 * section's own top padding, which would leave a deep link 9rem short of the
 * heading it was pointing at.
 */
export function useHashScroll() {
  const navigate = useNavigate()

  useEffect(() => {
    // decodeURIComponent throws a URIError on a malformed escape such as
    // `/#%`, which would otherwise take down the whole effect on mount.
    let id = ""
    try {
      id = decodeURIComponent(window.location.hash.slice(1))
    } catch {
      id = window.location.hash.slice(1)
    }
    if (!id) return

    // Every case study used to be a section of this page, so `/#yago` and
    // `/#porto-seguro-shopping` were real, shareable deep links. They now live
    // at their own URLs, and a link someone already sent has to keep working —
    // so a fragment naming a project is treated as a request for that project.
    // `replace`, because the fragment URL should not sit in the history stack
    // waiting for Back to bounce the visitor through it again.
    const project = findProject(id)
    if (project) {
      navigate(`/work/${project.id}`, { replace: true })
      return
    }

    let cancelled = false

    const jump = () => {
      if (cancelled) return
      // `getElementById` rejects the empty string and tolerates anything else,
      // so a malformed fragment simply finds nothing.
      const element = document.getElementById(id)
      if (element) window.scrollTo({ top: sectionScrollTop(element), behavior: "auto" })
    }

    // One frame in, the sections exist.
    const frame = requestAnimationFrame(jump)

    // Webfonts and the portrait land after that and change the page's height,
    // so the first landing can be off by a few hundred pixels. Correcting once
    // everything has settled is the difference between arriving at a section
    // and arriving near it.
    const settled = Promise.allSettled([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((resolve) => {
        if (document.readyState === "complete") resolve(null)
        else window.addEventListener("load", resolve, { once: true })
      }),
    ])

    settled.then(jump)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
    // `navigate` is stable for the life of the router, so this still runs once
    // per mount — which is the whole point: it honours the fragment the page
    // was opened with, not every fragment it acquires later.
  }, [navigate])
}
