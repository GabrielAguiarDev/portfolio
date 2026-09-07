import { animation, useFloat, useReveal } from "@/animation"
import PhoneFrame from "@/components/device/PhoneFrame"
import { ShoppingCheckout, ShoppingHome, ShoppingOrder } from "@/components/screens/Shopping"
import type { Project } from "@/content/work"
import { useLocale, type Localized } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

import { CaseBeats, CaseFacts, CaseTitle } from "./parts"

/**
 * Composition three — "the flow, laid out as objects".
 *
 * Three phones, three steps: storefront → payment → tracking. They sit at
 * different heights and sizes so the eye travels left to right the way the
 * flow does, and each one drifts at its own rate so the group has depth.
 *
 * The captions under each device are what make this a case study rather than a
 * product shot — the visitor understands the flow on a fast scroll, without
 * reading a word of the body copy.
 */

const steps: { caption: Localized }[] = [
  { caption: { pt: "01 — Vitrine multi-loja", en: "01 — Multi-store storefront" } },
  { caption: { pt: "02 — Checkout", en: "02 — Checkout" } },
  { caption: { pt: "03 — Do pagamento à entrega", en: "03 — Payment to delivery" } },
]

const Devices = ({ project }: { project: Project }) => {
  const { pick } = useLocale()

  const first = useFloat<HTMLDivElement>({ y: animation.parallax.caseDevice, rotate: -4 })
  const second = useFloat<HTMLDivElement>({ y: animation.parallax.caseDeviceLead, rotate: 0 })
  const third = useFloat<HTMLDivElement>({ y: animation.parallax.caseCard, rotate: 4 })

  // Capped rather than fluid: at container width a third of the row is ~430px,
  // and a PhoneFrame that wide is 930px tall — the section would swallow two
  // viewports. The middle device stays a little larger to hold the centre.
  const devices = [
    { ref: first, screen: <ShoppingHome />, offset: "lg:mt-14", width: "max-w-[13.5rem]" },
    { ref: second, screen: <ShoppingCheckout />, offset: "lg:-mt-2", width: "max-w-[15rem]" },
    { ref: third, screen: <ShoppingOrder />, offset: "lg:mt-20", width: "max-w-[13.5rem]" },
  ]

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"
        style={{
          background: `radial-gradient(closest-side, ${project.brand.ink}12, transparent 74%)`,
        }}
      />

      {/* Three across from `sm` up. On the narrowest screens it becomes a
          snap-scrolling strip rather than three unreadably small phones. */}
      <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:max-w-4xl sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:mx-auto lg:items-start lg:gap-10">
        {devices.map((device, index) => (
          <li
            key={index}
            className={cn(
              "flex w-[62%] shrink-0 snap-center flex-col items-center sm:w-auto",
              device.offset,
            )}
          >
            <div ref={device.ref} className={cn("w-full", device.width)}>
              <PhoneFrame
                lit={index === 1}
                screenshot={project.screenshots?.[index]}
                alt={project.name}
              >
                {device.screen}
              </PhoneFrame>
            </div>

            <p className="mt-6 text-center text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {pick(steps[index].caption)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

const CaseConstellation = ({ project, index }: { project: Project; index: number }) => {
  const devices = useReveal<HTMLDivElement>({ delay: 0.08 })

  return (
    <article id={project.id} className="section-anchor container py-20 md:py-28 lg:py-32">
      <div className="grid gap-10 lg:grid-cols-12">
        <CaseTitle project={project} index={index} className="lg:col-span-6" />
        <CaseBeats
          project={project}
          className="lg:col-span-5 lg:col-start-8 lg:pt-14"
          delay={0.12}
        />
      </div>

      <div
        {...devices.revealProps}
        className={cn(devices.revealProps.className, "mt-16 md:mt-20")}
      >
        <Devices project={project} />
      </div>

      <CaseFacts
        project={project}
        className="mt-16 max-w-3xl border-t border-border pt-8 md:mt-20"
        delay={0.06}
      />
    </article>
  )
}

export default CaseConstellation
