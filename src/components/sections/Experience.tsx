import { RevealText, gridDelay, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { ROLES, type Role } from "@/content/experience"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * Experience, composed as a magazine spread rather than a timeline.
 *
 * The lead role gets a full editorial layout — a large title, a standfirst, and
 * two columns of detail — because that is where the ownership story lives. The
 * supporting roles are set compactly underneath, the way a magazine runs a
 * feature and then its sidebars.
 */

const Featured = ({ role }: { role: Role }) => {
  const { pick } = useLocale()
  const header = useReveal<HTMLDivElement>()
  const columns = useReveal<HTMLDivElement>({ delay: 0.12 })

  return (
    <article className="border-t border-foreground/20 pt-8 md:pt-10">
      <div {...header.revealProps} className={header.revealProps.className}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-[0.8125rem] font-medium tracking-tight text-foreground">
            {role.company}
          </span>
          {role.period ? (
            <>
              <span aria-hidden="true" className="h-3 w-px bg-border" />
              <span className="eyebrow">{pick(role.period)}</span>
            </>
          ) : null}
        </div>

        <h3 className="display-lg mt-5 text-balance text-foreground">{pick(role.title)}</h3>

        <p className="mt-6 max-w-[40ch] text-pretty text-base leading-relaxed text-foreground/85 md:text-lg">
          {pick(role.summary)}
        </p>
      </div>

      <div
        {...columns.revealProps}
        className={cn(
          columns.revealProps.className,
          "mt-12 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-14",
        )}
      >
        <div>
          <p className="eyebrow">{pick(COPY.experience.responsibilities)}</p>
          <ul className="mt-5 space-y-3.5">
            {role.responsibilities.map((item) => (
              <li key={item.en} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-[0.55rem] h-px w-4 shrink-0 bg-foreground/30"
                />
                <span className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {pick(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">{pick(COPY.experience.highlights)}</p>
          <ul className="mt-5 space-y-5">
            {role.highlights.map((item) => (
              <li
                key={item.en}
                className="border-l border-primary/40 pl-5 text-pretty text-sm leading-relaxed text-foreground/85"
              >
                {pick(item)}
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-2">
            {role.stack.map((tool) => (
              <li key={tool} className="tag">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

const Compact = ({ role, index }: { role: Role; index: number }) => {
  const { pick } = useLocale()
  const { revealProps } = useReveal<HTMLElement>({ delay: gridDelay(index) })

  return (
    <article {...revealProps} className={cn(revealProps.className, "border-t border-border pt-7")}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[0.8125rem] font-medium tracking-tight text-muted-foreground">
          {role.company}
        </span>
        {role.period ? (
          <>
            <span aria-hidden="true" className="h-3 w-px bg-border" />
            <span className="eyebrow">{pick(role.period)}</span>
          </>
        ) : null}
      </div>

      <h3 className="display-sm mt-3 text-balance text-foreground">{pick(role.title)}</h3>

      <p className="mt-3 max-w-[42ch] text-pretty text-sm leading-relaxed text-muted-foreground">
        {pick(role.summary)}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {role.stack.map((tool) => (
          <li key={tool} className="tag">
            {tool}
          </li>
        ))}
      </ul>
    </article>
  )
}

const Experience = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })

  const [featured, ...rest] = ROLES

  return (
    <section id="experience" className="section-anchor border-t border-border py-20 md:py-28 lg:py-36">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
              {pick(COPY.experience.eyebrow)}
            </p>
            <h2 className="mt-5">
              <RevealText
                as="span"
                text={pick(COPY.experience.title)}
                className="display-lg block text-balance text-foreground"
              />
            </h2>
          </div>

          <p
            {...lead.revealProps}
            className={cn(
              lead.revealProps.className,
              "max-w-[44ch] self-end text-pretty text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem] lg:col-span-5 lg:col-start-8",
            )}
          >
            {pick(COPY.experience.lead)}
          </p>
        </div>

        <div className="mt-16 md:mt-20">
          <Featured role={featured} />
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-12">
          {rest.map((role, index) => (
            <Compact key={role.id} role={role} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
