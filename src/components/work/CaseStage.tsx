import type { ReactNode } from "react"

import { animation, useFloat, useReveal } from "@/animation"
import Miniature from "@/components/device/Miniature"
import PhoneFrame from "@/components/device/PhoneFrame"
import { BrowserFrame, STUDIO_CANVAS } from "@/components/screens/Studio"
import type { Project } from "@/content/work"
import { cn } from "@/lib/utils"

import { CaseBeats, CaseFacts, CaseTitle } from "./parts"


export type Stage = {
  windows?: {
    url: string
    width: number
    screen: ReactNode
    background?: string
    span?: string
  }[]
  phones?: ReactNode[]
  cards?: ReactNode[]
}

const MONITOR = 16 / 9

const Window = ({
  url,
  width,
  screen,
  background,
  className,
  shadow,
}: Stage["windows"][number] & { className?: string; shadow: string }) => (
  <BrowserFrame url={url} className={cn(shadow, className)}>
    <Miniature width={width} ratio={MONITOR} background={background ?? STUDIO_CANVAS}>
      {screen}
    </Miniature>
  </BrowserFrame>
)

const Devices = ({ project, stage }: { project: Project; stage: Stage }) => {
  const windows = stage.windows ?? []
  const phones = stage.phones ?? []
  const cards = stage.cards ?? []

  const lead = useFloat<HTMLDivElement>({ y: animation.parallax.caseDeviceLead, rotate: 0 })
  const second = useFloat<HTMLDivElement>({ y: animation.parallax.caseDevice, rotate: 0 })
  const front = useFloat<HTMLDivElement>({ y: animation.parallax.caseDevice, rotate: -4 })
  const behind = useFloat<HTMLDivElement>({ y: animation.parallax.caseCard, rotate: 4 })
  const note = useFloat<HTMLDivElement>({ y: animation.parallax.caseCard, rotate: 0 })

  const phoneRefs = [front, behind]

  return (
    <div className="relative mx-auto flex max-w-5xl flex-col gap-6 sm:block sm:aspect-[5/3.15] sm:w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[95%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"
        style={{
          background: `radial-gradient(closest-side, ${project.brand.from}26, ${project.brand.to}16 52%, transparent 76%)`,
        }}
      />

      {windows[0] ? (
        <div
          ref={lead}
          className={cn(
            "min-w-0 sm:absolute sm:left-0 sm:top-0 sm:z-0",
            windows[1] ? "sm:w-[66%]" : "sm:w-[70%]",
          )}
        >
          <Window {...windows[0]} shadow="shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]" />
        </div>
      ) : null}

      {windows[1] ? (
        <div
          ref={second}
          className={cn(
            "min-w-0 sm:absolute sm:z-10",
            phones.length
              ?
                cn("sm:bottom-0 sm:left-[30%]", windows[1].span ?? "sm:w-[40%]")
              :
                cn("sm:bottom-[26%] sm:right-0", windows[1].span ?? "sm:w-[58%]"),
          )}
        >
          <Window {...windows[1]} shadow="shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)]" />
        </div>
      ) : null}

      {phones.length ? (
        <div className="flex items-end justify-center gap-5 sm:contents">
          {phones.map((phone, index) => (
            <div
              key={index}
              ref={phoneRefs[index]}
              className={cn(
                "min-w-0 w-1/2 max-w-[12rem] sm:max-w-none",
                index === 0
                  ? "sm:absolute sm:right-0 sm:top-[5%] sm:z-20 sm:w-[24%]"
                  : "sm:absolute sm:right-[19.5%] sm:top-[16%] sm:z-10 sm:w-[20%]",
              )}
            >
              <PhoneFrame
                lit={index === 0}
                screenshot={project.figures?.[index]?.src}
                alt={index === 0 ? project.name : undefined}
              >
                {phone}
              </PhoneFrame>
            </div>
          ))}
        </div>
      ) : null}

      {cards.length ? (
        <div
          ref={note}
          className={cn(
            "flex flex-col gap-4 sm:absolute sm:bottom-[2%] sm:z-30 sm:gap-2.5",
            windows[1]
              ?
                "sm:left-0 sm:w-[26%]"
              :
                "sm:right-[34%] sm:w-[28%]",
          )}
        >
          {cards.map((card, index) => (
            <div key={index} className={index ? "sm:-ml-[16%]" : undefined}>
              {card}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export const CaseField = ({ project }: { project: Project }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70rem]"
    style={{
      background: `radial-gradient(70% 40% at 15% 0%, ${project.brand.from}1A, transparent 70%),
                   radial-gradient(60% 45% at 95% 42%, ${project.brand.to}14, transparent 72%)`,
    }}
  />
)

const CaseStage = ({
  project,
  index,
  stage,
}: {
  project: Project
  index: number
  stage: Stage
}) => {
  const devices = useReveal<HTMLDivElement>({ delay: 0.08 })

  return (
    <article className="relative overflow-hidden pb-20 pt-10 md:pb-28 md:pt-12 lg:pb-32 lg:pt-14">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12">
          <CaseTitle project={project} index={index} className="lg:col-span-5" />
          <CaseFacts
            project={project}
            className="lg:col-span-6 lg:col-start-7 lg:pt-14"
            delay={0.12}
          />
        </div>

        <div
          {...devices.revealProps}
          className={cn(devices.revealProps.className, "mt-14 md:mt-16")}
        >
          <Devices project={project} stage={stage} />
        </div>

        <CaseBeats
          project={project}
          className="mt-16 grid md:mt-20 md:grid-cols-3 md:gap-x-10"
          delay={0.06}
        />
      </div>
    </article>
  )
}

export default CaseStage
