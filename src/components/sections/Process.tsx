import { RevealText, useHorizontalTrack, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * How I build — the full cycle, told as one continuous sideways move.
 *
 * On desktop the section pins and the track scrolls horizontally, so the
 * pipeline is experienced as a pipeline rather than read as a list. On touch
 * it is a native snap-scrolling strip: same content, same order, no hijacked
 * scrolling. See `useHorizontalTrack` for why that split exists.
 */
const Process = () => {
  const { pick } = useLocale()
  const { sectionRef, trackRef } = useHorizontalTrack<HTMLDivElement, HTMLOListElement>()
  const eyebrow = useReveal<HTMLParagraphElement>()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-anchor relative overflow-hidden border-t border-border py-20 md:py-28 lg:flex lg:h-screen lg:min-h-[46rem] lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container shrink-0">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
              {pick(COPY.process.eyebrow)}
            </p>
            <h2 className="mt-5">
              <RevealText
                as="span"
                text={pick(COPY.process.title)}
                className="display-lg block text-balance text-foreground"
              />
            </h2>
          </div>

          <p
            {...lead.revealProps}
            className={cn(
              lead.revealProps.className,
              "max-w-[40ch] text-pretty text-sm leading-relaxed text-muted-foreground lg:pb-2",
            )}
          >
            {pick(COPY.process.lead)}
          </p>
        </div>
      </div>

      <div className="no-scrollbar mt-14 overflow-x-auto md:mt-16 lg:mt-20 lg:overflow-visible">
        <ol
          ref={trackRef}
          className="flex w-max snap-x snap-mandatory items-stretch gap-4 px-5 sm:gap-5 sm:px-8 lg:snap-none lg:gap-6 lg:px-[6vw]"
        >
          {COPY.process.steps.map((step, index) => {
            const last = index === COPY.process.steps.length - 1
            return (
              <li
                key={step.title.en}
                className="group relative flex w-[16rem] shrink-0 snap-center flex-col sm:w-[17.5rem] lg:w-[19rem]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.6875rem] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* The rail between steps. It stops at the last one, because
                      the cycle's end is a release, not another arrow. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px flex-1",
                      last
                        ? "bg-gradient-to-r from-primary/50 to-transparent"
                        : "bg-gradient-to-r from-border to-border/40",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                      last ? "bg-primary" : "bg-border group-hover:bg-foreground/40",
                    )}
                  />
                </div>

                <div className="mt-6 flex flex-1 flex-col rounded-[--radius] border border-border bg-card/60 p-6 transition-colors duration-500 hover:border-foreground/20 lg:p-7">
                  <h3 className="display-sm text-balance text-foreground">{pick(step.title)}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {pick(step.body)}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default Process
