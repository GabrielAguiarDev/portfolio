import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { sectionScrollTop } from "@/animation"
import { findProject } from "@/content/work"

export function useHashScroll() {
  const navigate = useNavigate()

  useEffect(() => {
    let id = ""
    try {
      id = decodeURIComponent(window.location.hash.slice(1))
    } catch {
      id = window.location.hash.slice(1)
    }
    if (!id) return

    const project = findProject(id)
    if (project) {
      navigate(`/work/${project.id}`, { replace: true })
      return
    }

    let cancelled = false

    const jump = () => {
      if (cancelled) return
      const element = document.getElementById(id)
      if (element) window.scrollTo({ top: sectionScrollTop(element), behavior: "auto" })
    }

    const frame = requestAnimationFrame(jump)

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
  }, [navigate])
}
