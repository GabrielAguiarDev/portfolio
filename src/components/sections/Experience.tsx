import { RevealText, gridDelay, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { ROLES, type Role } from "@/content/experience"
import { MOBILE } from "@/content/mobile"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * Experience, as a set of equal entries.
 *
 * It used to run the first role as a full editorial spread and the rest as
 * compact sidebars underneath. That said the mobile work was the story and
 * everything else was a footnote — which was true when there was one product to
 * talk about, and stopped being true once the work spanned mobile, web and
 * commissioned deliveries. It also argued against the page's own thesis, that
 * the surface is the least durable decision in a product.
 *
 * So every role now gets the same two columns: who and what on the left, what
 * that actually involved on the right. The reader compares them instead of
 * being told which one matters.
 */

/** Only the relationships a company name doesn't already explain get a label. */
const KindLabel = ({ kind }: { kind: Role["kind"] }) => {
  const { pick } = useLocale()

  if (kind === "employment") return null

  return (
    <span className="tag border-foreground/20 text-foreground/80">
      {pick(COPY.experience.kindFreelance)}
    </span>
  )
}

const Entry = ({ role, index }: { role: Role; index: number }) => {
  const { pick } = useLocale()
  const header = useReveal<HTMLDivElement>({ delay: gridDelay(index) })
  const detail = useReveal<HTMLDivElement>({ delay: gridDelay(index) + 0.08 })

  return (
    <article className="border-t border-border pt-8 md:pt-10">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div {...header.revealProps} className={cn(header.revealProps.className, "lg:col-span-5")}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-[0.8125rem] font-medium tracking-tight text-foreground">
              {role.company}
            </span>
            {role.period ? (
              <>
                <span aria-hidden="true" className="h-3 w-px bg-border" />
                <span className="eyebrow">{pick(role.period)}</span>
              </>
            ) : null}
            <KindLabel kind={role.kind} />
          </div>

          <h3 className="display-sm mt-4 text-balance text-foreground">{pick(role.title)}</h3>

          <p className="mt-4 max-w-[44ch] text-pretty text-sm leading-relaxed text-foreground/85 md:text-[0.9375rem]">
            {pick(role.summary)}
          </p>

          {/* Rendered only where there is something to say. An empty
              "Key contributions" heading reads as a role that had none. */}
          {role.highlights.length ? (
            <>
              {/* Driven by `MOBILE.roleHighlights` rather than hardcoded here,
                  because this is the one trim on the page that removes copy a
                  phone can find nowhere else — so it is the one most likely to
                  want tuning. See the note on it in `content/mobile.ts`.

                  Hidden per element rather than behind one wrapper, so the
                  desktop tree stays exactly what it was. */}
              <p
                className={cn(
                  "eyebrow mt-8",
                  !MOBILE.roleHighlights && "hidden md:block",
                )}
              >
                {pick(COPY.experience.highlights)}
              </p>
              <ul
                className={cn(
                  "mt-4 space-y-4",
                  !MOBILE.roleHighlights && "hidden md:block",
                )}
              >
                {role.highlights.map((item, itemIndex) => (
                  <li
                    key={item.en}
                    className={cn(
                      "border-l border-primary/40 pl-5 text-pretty text-sm leading-relaxed text-foreground/85",
                      // `md:list-item` and not `md:block`: an <li> restored as
                      // a block stops being a list item to a screen reader.
                      itemIndex >= MOBILE.roleHighlights && "hidden md:list-item",
                    )}
                  >
                    {pick(item)}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <div
          {...detail.revealProps}
          className={cn(detail.revealProps.className, "lg:col-span-6 lg:col-start-7")}
        >
          <p className="eyebrow">{pick(COPY.experience.responsibilities)}</p>
          <ul className="mt-5 space-y-3.5">
            {role.responsibilities.map((item, itemIndex) => (
              <li
                key={item.en}
                className={cn(
                  "flex gap-3.5",
                  // Written most-important-first, so a phone can take the top
                  // of each list and lose nothing that decides anything. Six
                  // bullets across four roles is twenty-four lines of the same
                  // shape — see `content/mobile.ts`.
                  itemIndex >= MOBILE.roleResponsibilities && "hidden md:flex",
                )}
              >
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

          {role.stack.length ? (
            <ul className="mt-8 hidden flex-wrap gap-2 md:flex">
              {role.stack.map((tool) => (
                <li key={tool} className="tag">
                  {tool}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  )
}

const Experience = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.14 })

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

        <div className="mt-16 space-y-14 md:mt-20 md:space-y-16">
          {ROLES.map((role, index) => (
            <Entry key={role.id} role={role} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
