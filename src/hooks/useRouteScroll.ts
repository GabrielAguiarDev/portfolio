import { useEffect, useLayoutEffect } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

import { motionScrollTo, refreshScrollTriggers, resizeSmoothScroll } from "@/animation"


const STORAGE_KEY = "portfolio:scroll-positions"

const positions = new Map<string, number>()

function load() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return
    for (const [key, top] of Object.entries(JSON.parse(stored) as Record<string, number>)) {
      if (typeof top === "number") positions.set(key, top)
    }
  } catch {
    return
  }
}

function save() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(positions)))
  } catch {
    return
  }
}

export function useRouteScroll() {
  const { key, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    load()

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    const onHide = () => {
      save()
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto"
      }
    }

    window.addEventListener("pagehide", onHide)
    return () => window.removeEventListener("pagehide", onHide)
  }, [])

  useLayoutEffect(() => {
    const record = () => positions.set(key, window.scrollY)

    window.addEventListener("scroll", record, { passive: true })
    return () => window.removeEventListener("scroll", record)
  }, [key])

  useLayoutEffect(() => {
    if (hash) return

    const top = navigationType === "POP" ? (positions.get(key) ?? 0) : 0

    if (top > 0) resizeSmoothScroll()

    motionScrollTo(top, 0, { immediate: true })
  }, [key, hash, navigationType])

  useEffect(() => {
    const frame = requestAnimationFrame(refreshScrollTriggers)
    return () => cancelAnimationFrame(frame)
  }, [key])
}
