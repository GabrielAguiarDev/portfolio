import { animation, useFloat, useParallax, useReveal } from "@/animation"
import PhoneFrame from "@/components/device/PhoneFrame"
import { BrowserFrame, StudioChat, StudioDashboard } from "@/components/screens/Studio"
import type { Project } from "@/content/work"
import { cn } from "@/lib/utils"

import { CaseBeats, CaseFacts, CaseTitle } from "./parts"

/**
 * Composition two — "the interface takes the whole stage".
 *
 * Y-Studio is a desktop product, so it earns a full-bleed brand field and a
 * browser window that runs edge to edge. The phone crossing its bottom-left
 * corner is the argument the case study is making: one platform, two surfaces.
 *
 * The field is a section-wide gradient rather than a card, which is what makes
 * this read as a different *place* on the page instead of another block.
 */
const CaseImmersive = ({ project, index }: { project: Project; index: number }) => {
  const frame = useReveal<HTMLDivElement>({ delay: 0.08 })
  const dashboard = useParallax<HTMLDivElement>(animation.parallax.caseDeviceLead)
  const phone = useFloat<HTMLDivElement>({ y: animation.parallax.caseDevice, rotate: -4 })

  return (
    <article className="relative overflow-hidden border-b border-border pb-20 pt-10 md:pb-28 md:pt-12 lg:pb-32 lg:pt-14">
      {/* The brand field. Two soft washes, no hard edges — the colour has to
          feel like light in the room, not a coloured rectangle. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(70% 55% at 15% 0%, ${project.brand.from}1F, transparent 70%),
                       radial-gradient(60% 60% at 95% 100%, ${project.brand.to}16, transparent 72%)`,
        }}
      />

      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12">
          <CaseTitle project={project} index={index} className="lg:col-span-6" />
          <CaseFacts
            project={project}
            className="lg:col-span-5 lg:col-start-8 lg:pt-14"
            delay={0.12}
          />
        </div>
      </div>

      {/* Pulled wider than the container on large screens so the window feels
          like it is running past the edge of the page. */}
      <div
        {...frame.revealProps}
        className={cn(frame.revealProps.className, "container mt-14 md:mt-20")}
      >
        <div className="relative lg:-mr-[6vw] xl:-mr-[8vw]">
          <div ref={dashboard}>
            <BrowserFrame
              url="app.y-studio.com/booking"
              className="shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
            >
              <div className="overflow-hidden">
                <StudioDashboard />
              </div>
            </BrowserFrame>
          </div>

          {/*
            The phone hangs off the window's lower-right corner.

            It was originally on the left, where it sat squarely on top of the
            module rail — covering the one element this case study exists to
            point at. The bottom-right is the window's quietest region, so the
            overlap still reads as depth without hiding the argument.
          */}
          <div
            ref={phone}
            className="absolute -bottom-12 right-[8%] w-[27%] max-w-[168px] sm:-bottom-16 sm:w-[22%] lg:-bottom-20 lg:right-[16%]"
          >
            <PhoneFrame screenshot={project.figures?.[0]?.src} alt={project.name}>
              <StudioChat />
            </PhoneFrame>
          </div>
        </div>
      </div>

      <div className="container">
        <CaseBeats
          project={project}
          className="mt-24 grid sm:mt-28 md:grid-cols-3 md:gap-x-10 lg:mt-24"
          delay={0.06}
        />
      </div>
    </article>
  )
}

export default CaseImmersive
