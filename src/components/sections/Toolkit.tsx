import type { CSSProperties } from "react"

import { RevealText, gridDelay, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { MOBILE } from "@/content/mobile"
import { TOOLKIT, type ToolGroup } from "@/content/toolkit"
import { useScrollEdges } from "@/hooks/useScrollEdges"
import { tagKey, useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * Tools I build with.
 *
 * Set as an index, not a gallery: a label on the left, the names on the right,
 * a hairline between each. It is deliberately the quietest section on the page
 * — the products are the argument, this is just the appendix that backs it up.
 *
 * ── Why each row scrolls sideways below `lg` ─────────────────────────────────
 *
 * These are lists of names, and a list of names that wraps stops being a list:
 * the AI group broke onto three lines on a phone, leaving a single orphaned
 * item under a full one and turning a row of the index into a paragraph. Every
 * group fits on one line at 1440px and none of them does at 390px, so above
 * `lg` the rows still wrap — two of them onto a second line, which at that
 * width reads as an indent — and below it each row keeps its single line and
 * scrolls instead.
 *
 * Below `lg` and not `md`: `md` is where the label moves out to its own
 * column, which is a layout decision, while this is a decision about where a
 * thumb is more likely than a wheel. A row that can only be scrolled sideways
 * is a bad row to hand someone holding a mouse.
 */

/** How much of a scrolling row is dissolved at an edge that has more past it. */
const FADE = { start: "1.75rem", end: "2.5rem", none: "0px" }

const Group = ({ group, index }: { group: ToolGroup; index: number }) => {
  const { pick, pickTag } = useLocale()
  const { revealProps } = useReveal<HTMLDivElement>({ delay: gridDelay(index) })
  const row = useScrollEdges<HTMLDivElement>()

  // Nine rows is a reasonable appendix to run an eye down and a long way to
  // drag a thumb through on the way to the contact section. A phone gets the
  // five groups the page argues for by name; see `content/mobile.ts` for why
  // it is a named list rather than the first five.
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

      {/*
        The scroller bleeds out to the screen edges while the label is still
        stacked above it, so a name is cut off by the edge of the phone rather
        than stopping short of an invisible box — the difference between a row
        that reads as continuing and one that reads as finished. From `md` the
        row lives in its own grid column and the bleed would pull it out of
        alignment with the label beside it, so it stops there.
      */}
      <div
        ref={row.ref}
        // A region that scrolls has to be reachable without a thumb or a
        // trackpad, or the names past the edge are simply unavailable to a
        // keyboard — focus it and the arrow keys walk the row. Only rows that
        // actually have something hidden take a tab stop: nine unconditional
        // ones through the page's appendix would be a worse trade than the
        // problem it solves.
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

        {/* `mt-14` and not `mt-4`: a "swipe to see more" line used to stand
            between this and the lead above it, and it was carrying the gap.
            The edge fades say the same thing better — a row that dissolves at
            its right edge reads as continuing without being told to. */}
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
