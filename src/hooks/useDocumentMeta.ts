import { useEffect } from "react"

import { SITE_URL } from "@/content/profile"

/**
 * Per-route document metadata.
 *
 * With every route served from the same `index.html`, all six pages inherited
 * the home page's tags — and one of those, `<link rel="canonical">`, pointed at
 * `/`. A canonical tag is not a hint: it tells Google that this URL *is* that
 * URL, so every project page would have been folded into the home page and
 * dropped from the index. The five pages the routing exists to create would
 * have been the five pages nobody could find.
 *
 * Written as a hook rather than with react-helmet: this mutates six tags on two
 * routes, and `App.tsx` already establishes that a provider which doesn't pay
 * for itself doesn't ship. It also has to react to the locale, since the title
 * and description are bilingual.
 *
 * Social crawlers don't run JavaScript, so this fixes search but not link
 * previews: sharing /work/yago still shows the home page's card. Fixing that
 * needs static per-route tags, which means a post-build step — worth adding
 * only if project URLs are actually going to be shared directly.
 */
export type DocumentMeta = {
  title: string
  description: string
  /** Path with a leading slash, e.g. "/work/yago". */
  path: string
  /** Keep this page out of search results. */
  noindex?: boolean
}

/** Reads a tag's current content so it can be restored on unmount. */
function upsert(selector: string, create: () => HTMLElement, value: string) {
  let element = document.head.querySelector<HTMLElement>(selector)
  const owned = !element

  if (!element) {
    element = create()
    document.head.appendChild(element)
  }

  const previous =
    element instanceof HTMLLinkElement ? element.href : (element.getAttribute("content") ?? "")

  if (element instanceof HTMLLinkElement) element.href = value
  else element.setAttribute("content", value)

  return () => {
    if (owned) element?.remove()
    else if (element instanceof HTMLLinkElement) element.href = previous
    else element?.setAttribute("content", previous)
  }
}

const meta = (name: string) => () => {
  const element = document.createElement("meta")
  element.setAttribute("name", name)
  return element
}

const property = (name: string) => () => {
  const element = document.createElement("meta")
  element.setAttribute("property", name)
  return element
}

export function useDocumentMeta({ title, description, path, noindex = false }: DocumentMeta) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const url = `${SITE_URL}${path}`

    const restores = [
      // An empty description is worse than the one already in the document —
      // a draft case study has nothing to say about itself yet, so it keeps
      // the site-level description rather than declaring a blank one.
      ...(description
        ? [upsert('meta[name="description"]', meta("description"), description)]
        : []),
      upsert(
        'link[rel="canonical"]',
        () => {
          const element = document.createElement("link")
          element.rel = "canonical"
          return element
        },
        url,
      ),
      upsert('meta[property="og:title"]', property("og:title"), title),
      ...(description
        ? [upsert('meta[property="og:description"]', property("og:description"), description)]
        : []),
      upsert('meta[property="og:url"]', property("og:url"), url),
    ]

    if (noindex) {
      restores.push(upsert('meta[name="robots"]', meta("robots"), "noindex, nofollow"))
    }

    return () => {
      document.title = previousTitle
      for (const restore of restores) restore()
    }
  }, [title, description, path, noindex])
}
