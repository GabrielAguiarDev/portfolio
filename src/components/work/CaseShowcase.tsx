import { Check } from "lucide-react"

import { animation, useFloat, useReveal } from "@/animation"
import PhoneFrame from "@/components/device/PhoneFrame"
import { YagoBooking, YagoHome, YagoNotification } from "@/components/screens/Yago"
import type { Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

import { CaseBeats, CaseFacts, CaseTitle } from "./parts"

/**
 * Composition one — "one hero device, fragments orbiting it".
 *
 * The reservation screen is the lead because it is the app's one transactional
 * moment; everything around it is evidence that the moment worked. The
 * confirmation toast and the push notification are deliberately *not* inside a
 * phone: they are the parts of the product that happen outside the app.
 */
const Devices = ({ project }: { project: Project }) => {
  const { pick } = useLocale()

  const lead = useFloat<HTMLDivElement>({ y: animation.parallax.caseDeviceLead, rotate: 0 })
  const secondary = useFloat<HTMLDivElement>({ y: animation.parallax.caseDevice, rotate: -7 })
  const toast = useFloat<HTMLDivElement>({ y: animation.parallax.caseCard, rotate: 0 })
  const push = useFloat<HTMLDivElement>({ y: animation.parallax.caseCard, rotate: 0 })

  const confirmed = { pt: "Reserva confirmada", en: "Reservation confirmed" }
  const detail = { pt: "Vila Mare · 19:00 · mesa 12", en: "Vila Mare · 7:00pm · table 12" }

  return (
    /*
      Two arrangements, one tree.

      From `sm` up this is an aspect box with four absolutely-placed objects.
      Below it, `sm:contents` dissolves the phone row and everything falls into
      a plain column — because at 390px the floating fragments overlap each
      other and the phones no matter how the percentages are tuned. A phone
      screen deserves its own layout, not a scaled-down version of a layout
      that was designed for a wide one.
    */
    <div className="relative flex flex-col gap-5 sm:block sm:aspect-[5/5.4] sm:w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[95%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"
        style={{
          background: `radial-gradient(closest-side, ${project.brand.from}26, ${project.brand.to}18 50%, transparent 76%)`,
        }}
      />

      {/*
        A PhoneFrame is 2.16x as tall as it is wide. In a 5:5.4 box that caps
        the lead phone at ~44% of the width and the second at ~30%, which is
        exactly what clears the left column for the two fragments.
      */}
      <div className="flex items-end gap-4 sm:contents">
        <div
          ref={lead}
          className="min-w-0 w-1/2 sm:absolute sm:right-0 sm:top-0 sm:z-10 sm:w-[44%]"
        >
          <PhoneFrame screenshot={project.figures?.[0]?.src} alt={project.name}>
            <YagoBooking />
          </PhoneFrame>
        </div>

        <div
          ref={secondary}
          className="min-w-0 w-[38%] sm:absolute sm:bottom-0 sm:left-0 sm:z-0 sm:w-[30%]"
          aria-hidden="true"
        >
          <PhoneFrame lit={false} screenshot={project.figures?.[1]?.src} className="opacity-95">
            <YagoHome />
          </PhoneFrame>
        </div>
      </div>

      {/* The confirmation, in the clear space above the second phone. */}
      <div ref={toast} className="sm:absolute sm:left-0 sm:top-[2%] sm:z-20 sm:w-[48%]">
        <div className="glass rounded-2xl p-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              style={{ background: project.brand.from }}
            >
              <Check size={13} strokeWidth={3} className="text-white" />
            </span>
            <p className="text-[0.8125rem] font-semibold tracking-tight text-foreground">
              {pick(confirmed)}
            </p>
          </div>
          <p className="mt-2 pl-[2.125rem] text-[0.6875rem] text-muted-foreground">
            {pick(detail)}
          </p>
        </div>
      </div>

      {/* The push that lands 30 minutes later. Staggered right of the toast so
          the two fragments read as a sequence, not a stack. */}
      <div ref={push} className="sm:absolute sm:left-[10%] sm:top-[20%] sm:z-20 sm:w-[44%]">
        <YagoNotification />
      </div>
    </div>
  )
}

const CaseShowcase = ({ project, index }: { project: Project; index: number }) => {
  const devices = useReveal<HTMLDivElement>({ delay: 0.08 })

  return (
    <article className="container pb-20 pt-10 md:pb-28 md:pt-12 lg:pb-32 lg:pt-14">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-5 lg:pt-6">
          <CaseTitle project={project} index={index} />
          <CaseFacts project={project} className="mt-10 md:mt-12" />
        </div>

        <div
          {...devices.revealProps}
          className={cn(devices.revealProps.className, "min-w-0 lg:col-span-6 lg:col-start-7")}
        >
          <Devices project={project} />
        </div>
      </div>

      <CaseBeats
        project={project}
        className="mt-14 grid md:mt-16 md:grid-cols-3 md:gap-x-10"
      />
    </article>
  )
}

export default CaseShowcase
