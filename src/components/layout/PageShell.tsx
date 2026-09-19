import type { ReactNode } from "react"

import Footer from "@/components/sections/Footer"
import Nav from "@/components/sections/Nav"
import { COPY } from "@/content/copy"
import { useLocale } from "@/i18n/useLocale"

const PageShell = ({ children }: { children: ReactNode }) => {
  const { pick } = useLocale()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border focus:border-border focus:bg-card focus:px-5 focus:py-3 focus:text-sm focus:font-medium"
      >
        {pick(COPY.a11y.skip)}
      </a>

      <Nav />

      <main id="main">{children}</main>

      <Footer />
    </>
  )
}

export default PageShell
