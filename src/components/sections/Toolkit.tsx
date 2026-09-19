import type { CSSProperties } from "react"

import { RevealText, gridDelay, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { MOBILE } from "@/content/mobile"
import { TOOLKIT, type ToolGroup } from "@/content/toolkit"
import { useScrollEdges } from "@/hooks/useScrollEdges"
import { tagKey, useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"


const FADE = { start: "1.75rem", end: "2.5rem", none: "0px" }

const Group = ({ group, index }: { group: ToolGroup; index: number }) => {
  const { pick, pickTag } = useLocale()
  const { revealProps } = useReveal<HTMLDivElement>({ delay: gridDelay(index) })
  const row = useScrollEdges<HTMLDivElement>()

  const kept = MOBILE.toolkitGroups.includes(group.label.en)

  return (
    <div
      {...revealProps}
      className={cn(
        revealProps.className,
        "gap-3 border-t border-border py-6 md:grid md:grid-cols-[10rem_1fr] md:gap-10 md:py-7",
        kept ? "grid" : "hidden",
      )}
    >
      <p className="eyebrow md:pt-1.5">{pick(group.label)}</p>

      <div
        ref={row.ref}
        role="group"
        aria-label={pick(group.label)}
        tabIndex={row.moreBefore || row.moreAfter ? 0 : -1}
        style={
          {
            "--edge-fade-start": row.moreBefore ? FADE.start : FADE.none,
            "--edge-fade-end": row.moreAfter ? FADE.end : FADE.none,
          } as CSSProperties
        }
        className={cn(
          "edge-fade no-scrollbar overflow-x-auto",
          "-mx-5 px-5 sm:-mx-8 sm:px-8 md:mx-0 md:px-0",
          "lg:overflow-visible",
        )}
      >
        <ul
          className={cn(
            "flex w-max items-baseline gap-x-2",
            "lg:w-auto lg:flex-wrap lg:gap-x-3 lg:gap-y-2.5",
          )}
        >
          {group.tools.map((tool, toolIndex) => (
            <li key={tagKey(tool)} className="flex items-baseline gap-2 md:gap-3">
              {toolIndex > 0 ? (
                <span aria-hidden="true" className="text-muted-foreground/35">
                  /
                </span>
              ) : null}
              <span className="whitespace-nowrap text-[0.9375rem] font-medium tracking-tight text-foreground/85 transition-colors duration-300 hover:text-foreground md:text-base">
                {pickTag(tool)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Toolkit = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })

  return (
    <section id="toolkit" className="section-anchor border-t border-border py-20 md:py-28">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
              {pick(COPY.toolkit.eyebrow)}
            </p>
            <h2 className="mt-5">
              <RevealText
                as="span"
                text={pick(COPY.toolkit.title)}
                className="display-md block text-balance text-foreground"
              />
            </h2>
          </div>

          <p
            {...lead.revealProps}
            className={cn(
              lead.revealProps.className,
              "max-w-[40ch] self-end text-pretty text-sm leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8",
            )}
          >
            {pick(COPY.toolkit.lead)}
          </p>
        </div>

        <div className="mt-14 md:mt-16">
          {TOOLKIT.map((group, index) => (
            <Group key={group.label.en} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Toolkit
