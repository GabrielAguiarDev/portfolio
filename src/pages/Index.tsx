import Nav from "@/components/sections/Nav"
import Hero from "@/components/sections/Hero"
import Work from "@/components/sections/Work"
import BuiltForMobile from "@/components/sections/BuiltForMobile"
import Process from "@/components/sections/Process"
import Impact from "@/components/sections/Impact"
import About from "@/components/sections/About"
import Experience from "@/components/sections/Experience"
import Toolkit from "@/components/sections/Toolkit"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"
import { useHashScroll } from "@/hooks/useHashScroll"

/**
 * The narrative order, and the reason for it:
 *
 *   Hero      — who, and what he makes
 *   Work      — the products themselves, straight away
 *   Mobile    — why they are built the way they are
 *   Process   — the cycle behind them, end to end
 *   Impact    — the same claim, as figures
 *   About     — the person, once the work has earned the attention
 *   Experience— where it happened
 *   Toolkit   — the appendix
 *   Contact   — the close
 */
const Index = () => {
  useHashScroll()

  return (
  <>
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border focus:border-border focus:bg-card focus:px-5 focus:py-3 focus:text-sm focus:font-medium"
    >
      Skip to content
    </a>

    <Nav />

    <main id="main">
      <Hero />
      <Work />
      <BuiltForMobile />
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
