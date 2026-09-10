import PageShell from "@/components/layout/PageShell"
import About from "@/components/sections/About"
import AiEngineering from "@/components/sections/AiEngineering"
import Contact from "@/components/sections/Contact"
import Experience from "@/components/sections/Experience"
import Foundations from "@/components/sections/Foundations"
import Hero from "@/components/sections/Hero"
import Impact from "@/components/sections/Impact"
import Process from "@/components/sections/Process"
import Toolkit from "@/components/sections/Toolkit"
import Work from "@/components/sections/Work"
import { COPY } from "@/content/copy"
import { PROFILE } from "@/content/profile"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
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
 *
 * Work used to carry every case study inline. It now carries the index and the
 * case studies live at `/work/<id>` — see `components/sections/Work.tsx`.
 */
const Index = () => {
  const { pick } = useLocale()

  useHashScroll()
  useDocumentMeta({
    title: `${PROFILE.name} — ${pick(PROFILE.role)}`,
    // Not the hero's line: that one is written to be the first thing read on a
    // page you are already on, and this one has to stand on its own in a search
    // result. See the note in copy.ts.
    description: pick(COPY.meta.home),
    path: "/",
  })

  return (
    <PageShell>
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
    </PageShell>
  )
}

export default Index
