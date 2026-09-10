import { useEffect, useLayoutEffect } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

import { motionScrollTo, refreshScrollTriggers, resizeSmoothScroll } from "@/animation"

/**
 * Scroll behaviour across route changes.
 *
 * React Router does not touch the scroll position, so without this a click on
 * a project at the bottom of the home page lands you in the middle of that
 * project's case study.
 *
 * The obvious fix — `window.scrollTo(0, 0)` — is not reliable here. Lenis owns
 * the scroll position through a RAF loop (see `animation/runtime.ts`) and it is
 * a module singleton that outlives every route. While it is mid-animation it
 * overwrites a native scroll on the next frame, so the jump goes through Lenis,
 * which also keeps its internal target in step with where the page really is.
 *
 * Restoration on Back is handled here rather than by the browser for the same
 * reason. `<ScrollRestoration>` would be the off-the-shelf answer, but it is
 * only wired up for the data router (`createBrowserRouter`), and it restores
 * with a native `scrollTo` that Lenis would undo. Both halves of the
 * replacement are more delicate than they look — see the comments below.
 */

const STORAGE_KEY = "portfolio:scroll-positions"

/** Scroll offsets by history key. */
const positions = new Map<string, number>()

/**
 * The browser's own restoration is switched off, so a Back that re-creates the
 * document — a bfcache miss, or a reload mid-session — would find this map
 * empty and land at the top, where the browser used to do the right thing on
 * its own. Persisting for the session buys that behaviour back.
 */
function load() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return
    for (const [key, top] of Object.entries(JSON.parse(stored) as Record<string, number>)) {
      if (typeof top === "number") positions.set(key, top)
    }
  } catch {
    // A private window, or storage disabled. Restoration degrades to "top".
  }
}

function save() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(positions)))
  } catch {
    /* empty */
  }
}

export function useRouteScroll() {
  const { key, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    load()

    // The browser would otherwise restore natively, mid-animation, and Lenis
    // would overwrite it on the next frame.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    const onHide = () => {
      save()
      // Handed back before the document goes away: if this page is restored
      // from the bfcache with the map gone, native restoration is better than
      // nothing at all.
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto"
      }
    }

    window.addEventListener("pagehide", onHide)
    return () => window.removeEventListener("pagehide", onHide)
  }, [])

  /*
    Recording the offset of the page being left.

    This has to be a *layout* effect, and it must not read the position in its
    own cleanup body.

    When the route changes, the outgoing page's DOM is removed and the document
    gets much shorter, so the browser clamps the scroll offset and queues a
    `scroll` event. That event fires before passive effects flush — so a passive
    effect here would record the clamped value, every stored position would be
    ~0, and Back would always land on the hero.

    A layout effect's cleanup runs during the commit's mutation phase. React
    commits a parent's deletions before recursing into its children, so this
    only detaches in time because `<RouteScroll/>` is rendered *before*
    `<Routes/>` in App.tsx — as a preceding sibling it is reached first. That
    ordering is load-bearing; there is a note on it at the call site.
  */
  useLayoutEffect(() => {
    const record = () => positions.set(key, window.scrollY)

    window.addEventListener("scroll", record, { passive: true })
    return () => window.removeEventListener("scroll", record)
  }, [key])

  useLayoutEffect(() => {
    // A fragment in the URL is a request for a specific section, and
    // `useHashScroll` is already resolving it. Two landings would race.
    if (hash) return

    // Back and Forward return you to where you were; everything else is an
    // arrival, and an arrival starts at the top.
    const top = navigationType === "POP" ? (positions.get(key) ?? 0) : 0

    // Lenis clamps every target against a cached document height, refreshed by
    // a ResizeObserver debounced by 250ms — so for a quarter of a second after
    // a route change it still believes the previous page's height. Restoring
    // 4200px into a page it measures as 1600px tall would silently land at
    // 1600. Re-measure first.
    if (top > 0) resizeSmoothScroll()

    // Layout effect rather than passive: this runs before the browser paints,
    // so the new page never flashes at the outgoing page's offset first.
    motionScrollTo(top, 0, { immediate: true })
  }, [key, hash, navigationType])

  useEffect(() => {
    // The new document's height is only final once this commit has painted.
    const frame = requestAnimationFrame(refreshScrollTriggers)
    return () => cancelAnimationFrame(frame)
  }, [key])
}
