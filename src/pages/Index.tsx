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

const Index = () => {
  const { pick } = useLocale()

  useHashScroll()
  useDocumentMeta({
    title: `${PROFILE.name} — ${pick(PROFILE.role)}`,
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
