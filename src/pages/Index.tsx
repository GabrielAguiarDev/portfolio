import Nav from "@/components/sections/Nav"
import Hero from "@/components/sections/Hero"
import Work from "@/components/sections/Work"
import Foundations from "@/components/sections/Foundations"
import AiEngineering from "@/components/sections/AiEngineering"
import Process from "@/components/sections/Process"
import Impact from "@/components/sections/Impact"
import About from "@/components/sections/About"
import Experience from "@/components/sections/Experience"
import Toolkit from "@/components/sections/Toolkit"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"
import { COPY } from "@/content/copy"
import { useHashScroll } from "@/hooks/useHashScroll"
import { useLocale } from "@/i18n/useLocale"

/**
 * The narrative order, and the reason for it:
 *
 *   Hero      — who, and what he makes
 *   Work      — the products themselves, straight away
 *   Foundations — the decisions underneath all of them
 *   AI        — how those decisions get made now
 *   Process   — the cycle behind them, end to end
 *   Impact    — the same claim, as figures
 *   About     — the person, once the work has earned the attention
 *   Experience— where it happened
 *   Toolkit   — the appendix
 *   Contact   — the close
 */
const Index = () => {
  const { pick } = useLocale()
  useHashScroll()

  return (
  <>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border focus:border-border focus:bg-card focus:px-5 focus:py-3 focus:text-sm focus:font-medium"
    >
      {pick(COPY.a11y.skip)}
    </a>

    <Nav />

    <main id="main">
      <Hero />
      <Work />
      <Foundations />
      <AiEngineering />
      <Process />
      <Impact />
      <About />
      <Experience />
      <Toolkit />
      <Contact />
    </main>

    <Footer />
    </>
  )
}

export default Index
