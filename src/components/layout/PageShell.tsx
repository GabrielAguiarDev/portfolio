import type { ReactNode } from "react"

import Footer from "@/components/sections/Footer"
import Nav from "@/components/sections/Nav"
import { COPY } from "@/content/copy"
import { useLocale } from "@/i18n/useLocale"

/**
 * The frame every page shares: skip link, navbar, main landmark, footer.
 *
 * Rendered *inside* each page rather than as a router layout with an
 * `<Outlet/>`, which would be the more usual shape. The reason is `Nav`: it
 * holds imperative global state — `document.body.style.overflow`, the Lenis
 * pause, a pending scroll target — and hands all three back in an unmount
 * cleanup. Keeping it mounted across routes would turn those three implicit
 * cleanups into three explicit `pathname` effects, and the failure mode if one
 * were missed is an open menu and a locked page on the destination route.
 *
 * Remounting a header is cheap. Getting that wrong is not.
 *
 * Scroll behaviour across routes deliberately does *not* live here — it is
 * mounted once at the router in `App.tsx`, so that NotFound, which renders its
 * own `<main>` rather than this shell, is covered too.
 */
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
