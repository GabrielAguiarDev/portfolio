import { useEffect } from "react"

import { SITE_URL } from "@/content/profile"
import { useLocale } from "@/i18n/useLocale"

export type DocumentMeta = {
  title: string
  description: string
  path: string
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

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

export function useDocumentMeta({
  title,
  description,
  path,
  noindex = false,
  jsonLd,
}: DocumentMeta) {
  const { locale } = useLocale()

  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const url = `${SITE_URL}${path}`

    const restores = [
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
      upsert(
        'meta[property="og:locale"]',
        property("og:locale"),
        locale === "pt" ? "pt_BR" : "en_US",
      ),
      upsert(
        'meta[property="og:locale:alternate"]',
        property("og:locale:alternate"),
        locale === "pt" ? "en_US" : "pt_BR",
      ),
    ]

    if (noindex) {
      restores.push(upsert('meta[name="robots"]', meta("robots"), "noindex, nofollow"))
    }

    let script: HTMLScriptElement | undefined

    if (jsonLd && !noindex) {
      script = document.createElement("script")
      script.type = "application/ld+json"
      script.dataset.route = path
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.title = previousTitle
      for (const restore of restores) restore()
      script?.remove()
    }
  }, [title, description, path, noindex, jsonLd, locale])
}
