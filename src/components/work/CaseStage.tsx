import type { ReactNode } from "react"

import { animation, useFloat, useReveal } from "@/animation"
import Miniature from "@/components/device/Miniature"
import PhoneFrame from "@/components/device/PhoneFrame"
import { BrowserFrame, STUDIO_CANVAS } from "@/components/screens/Studio"
import type { Project } from "@/content/work"
import { cn } from "@/lib/utils"

import { CaseBeats, CaseFacts, CaseTitle } from "./parts"

/**
 * The one composition every case study uses.
 *
 * It replaced three bespoke ones. Those were the better idea on paper — a
 * composition tuned to each product, so no two cases read alike — and the wrong
 * one in practice for two reasons. They drifted: the same product fact ended up
 * staged three different ways and the reader had to learn each page instead of
 * each product. And they were sized independently, so the one that ran full
 * bleed ran off the screen while another sat too small to register.
 *
 * What every project here has in common is the thing worth staging: a console
 * somebody works in, an app somebody carries, and the moments that happen in
 * neither. So that is the frame, and a project fills the slots it has.
 *
 * Nothing is life-size. These are illustrations of a system, not documentation
 * of a screen — a reader should recognise "a dense back office with a lot of
 * modules" at a glance and never need to read a KPI. Everything is sized as a
 * percentage of the stage, so it is the same picture at any viewport and it
 * cannot escape the column.
 */

/** What a project puts on the stage. Every slot is optional. */
export type Stage = {
  /** The console, behind everything. A second one sits on its lower corner. */
  windows?: {
    url: string
    width: number
    screen: ReactNode
    background?: string
    /**
     * Width class for the second window, overriding the default.
     *
     * Written out as a literal Tailwind class so the scanner finds it. The
     * default suits a console that is a footnote to the one above it; a project
     * whose two consoles are equally the point needs more room than that.
     */
    span?: string
  }[]
  /** Handsets, standing in front of the console. Two at most. */
  phones?: ReactNode[]
  /** The moments that happen in neither: a push, a ticket, a confirmation. */
  cards?: ReactNode[]
}

/**
 * The proportion of an ordinary screen.
 *
 * 16:9, not the 16:10 the hover previews use, and the difference is the point:
 * a preview card is small and wants the extra rows, a stage wants the
 * silhouette of a monitor. At 16:10 these windows read as slightly too tall for
 * what they are standing in for.
 */
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
    /*
      Two arrangements, one tree.

      From `sm` up this is an aspect box with everything placed as a percentage
      of it. Below that, `sm:contents` dissolves the box and the pieces fall
      into a plain column — at 390px an overlapped composition is illegible no
      matter how the percentages are tuned, and a phone screen deserves its own
      layout rather than a shrunken copy of a wide one.
    */
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
            // Gives up a little width when a second console has to fit under it.
            windows[1] ? "sm:w-[66%]" : "sm:w-[70%]",
          )}
        >
          <Window {...windows[0]} shadow="shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]" />
        </div>
      ) : null}

      {/* A second console, where a project has two altitudes rather than two
          surfaces. It shares the lower edge with the phones when there are any,
          and takes the whole corner when there are not. */}
      {windows[1] ? (
        <div
          ref={second}
          className={cn(
            "min-w-0 sm:absolute sm:z-10",
            phones.length
              ? // Sharing the stage with handsets: it tucks into the console's
                // lower edge so the group reads as one object rather than three
                // competing for the same corner.
                cn("sm:bottom-0 sm:left-[30%]", windows[1].span ?? "sm:w-[40%]")
              : // The whole lower-right is its own. Large enough to be a second
                // screen rather than a footnote, and lifted well clear of the
                // floor so the pair reads as a stack, not a staircase.
                cn("sm:bottom-[26%] sm:right-0", windows[1].span ?? "sm:w-[58%]"),
          )}
        >
          <Window {...windows[1]} shadow="shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)]" />
        </div>
      ) : null}

      {/* Phones stand on the console's lower-right, which is the quietest part
          of every dashboard here — rail, title and figures all live top-left. */}
      {phones.length ? (
        <div className="flex items-end justify-center gap-5 sm:contents">
          {phones.map((phone, index) => (
            <div
              key={index}
              ref={phoneRefs[index]}
              className={cn(
                "min-w-0 w-1/2 max-w-[12rem] sm:max-w-none",
                // Hung from the top rather than standing on the floor. A phone
                // is two and a bit times as tall as it is wide, so anchoring it
                // at the bottom pushed the whole pair down and left the column
                // beside the console empty above them — the one place on the
                // stage with room to spare.
                index === 0
                  ? "sm:absolute sm:right-0 sm:top-[5%] sm:z-20 sm:w-[24%]"
                  : "sm:absolute sm:right-[19.5%] sm:top-[16%] sm:z-10 sm:w-[20%]",
              )}
            >
              {/*
                Both at full strength. The one behind used to carry `opacity-95`
                for depth, which is depth the overlap and the drop shadow give
                for free — all the dimming did was make a real screen look like
                a disabled one.
              */}
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

      {/*
        The fragments last, over everything, and pressed up against the phones
        rather than parked in the opposite corner.

        They are notifications *these handsets* receive. Floated off on their
        own they read as a third exhibit competing with the devices; tucked into
        the phones' lower-left, overlapping them slightly, they read as what
        they are — something arriving on the screen next to them.
      */}
      {cards.length ? (
        <div
          ref={note}
          className={cn(
            "flex flex-col gap-4 sm:absolute sm:bottom-[2%] sm:z-30 sm:gap-2.5",
            /*
              Along the floor, never floating in the middle.

              Lifting them to clear a second console put them squarely on top of
              everything else — over a phone, over the console, over the window
              behind both. There is no free air in the middle of a stage this
              full; the only reliable gap is the strip along the bottom, so both
              arrangements use it and differ only in which end.
            */
            windows[1]
              ? // The second console takes the lower middle, so they take the
                // corner it leaves — under the portal, clear of everything.
                "sm:left-0 sm:w-[26%]"
              : // Otherwise they tuck in beside the handsets they belong to.
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

/**
 * The brand field: two soft washes, no hard edges.
 *
 * Exported and rendered by the route rather than by this composition, because
 * it has to begin at the very top of the page. Scoped to the `<article>` it
 * started *below* the back-link bar, which left a black strip across the top of
 * every case study and a visible seam where the colour switched on. The colour
 * has to feel like light in the room, and light does not start two hundred
 * pixels down.
 */
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
