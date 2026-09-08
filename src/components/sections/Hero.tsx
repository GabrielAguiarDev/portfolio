import { ArrowDown, ArrowRight, Github, Linkedin } from "lucide-react"

import { RevealText, motionScrollTo, useReveal } from "@/animation"
import PointField from "@/components/hero/PointField"
import { COPY } from "@/content/copy"
import { hasEmail, LINKS, PROFILE } from "@/content/profile"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * The hero.
 *
 * No app interfaces here, deliberately. Phones in the first screen made the
 * page read as the landing page of one product, when what is being introduced
 * is the person who builds them — so the product screens now start where the
 * case studies start, and the opening is a name, a claim, and one object.
 *
 * That object is the point field: it carries the whole visual weight, which is
 * why it is sized and positioned as a subject rather than as a backdrop.
 */
const Hero = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>({ delay: 0.05 })
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.5 })
  const actions = useReveal<HTMLDivElement>({ delay: 0.6 })
  const scroll = useReveal<HTMLDivElement>({ delay: 0.95 })

  const contactHref = hasEmail ? LINKS.email : LINKS.linkedin

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-28 pt-[calc(var(--nav-h)+3.5rem)] md:pb-32 lg:pb-24"
    >
      {/* A single, very soft bloom at the top of the page. The only light
          source in the whole layout. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[30%] left-1/2 -z-20 h-[70vh] w-[120vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(248,107,39,0.07),transparent_70%)]"
      />

      {/*
        The point field, now the hero's only image.
        On desktop it sits to the right of the type as the counterweight to the
        headline. On a phone there is no room beside anything, so it becomes a
        full-bleed atmosphere behind the text at a much lower opacity — the
        headline is the LCP element and nothing is allowed to compete with it.
      */}
      <PointField
        className={cn(
          // On a phone the type sits right on top of the glyph. It cannot be
          // masked into a ring the way a sphere could — punching out the middle
          // would take the slash with it — so it just drops to a level where it
          // reads as texture behind the copy, with its top and bottom edges
          // dissolved so it never looks cropped by the fold.
          "opacity-[0.28] [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)]",
          "-z-10 lg:opacity-100",
          // A plain left-hand fade, not a vignette: the glyph stays whole and
          // only the edge running under the type falls away. Held well left of
          // where the "<" starts, so the tag is never dimmed at one end. It
          // also catches the points that scatter leftward across the copy on
          // scroll.
          "lg:[mask-image:linear-gradient(to_right,transparent_14%,#000_42%)]",
        )}
      />

      <div className="container relative w-full">
        <div className="max-w-[34rem] md:max-w-[42rem] lg:max-w-[46rem]">
          <p
            {...eyebrow.revealProps}
            className={cn(
              eyebrow.revealProps.className,
              "flex flex-wrap items-center gap-x-3 gap-y-1",
            )}
          >
            <span className="text-[0.8125rem] font-medium tracking-tight text-foreground">
              {PROFILE.name}
            </span>
            {/* Hidden on the narrowest screens, where the pair wraps and the
                rule is left dangling at the end of the first line. */}
            <span aria-hidden="true" className="hidden h-3 w-px bg-border sm:block" />
            <span className="eyebrow">{pick(PROFILE.role)}</span>
          </p>

          <h1 className="mt-7 md:mt-9">
            <RevealText
              as="span"
              text={pick(COPY.hero.headline)}
              className="display-xl block max-w-[15ch] text-balance text-foreground"
              delay={0.08}
            />
          </h1>

          <p
            {...lead.revealProps}
            className={cn(
              lead.revealProps.className,
              "mt-7 max-w-[42ch] text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground md:mt-9 md:text-base",
            )}
          >
            {pick(COPY.hero.lead)}
          </p>

          <div
            {...actions.revealProps}
            className={cn(
              actions.revealProps.className,
              "mt-9 flex flex-wrap items-center gap-3 md:mt-11",
            )}
          >
            <button
              type="button"
              onClick={() => {
                const element = document.getElementById("work")
                if (element) motionScrollTo(element)
              }}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium tracking-tight text-background transition-opacity hover:opacity-85"
            >
              {pick(COPY.hero.primary)}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>

            <a
              href={contactHref}
              target={hasEmail ? undefined : "_blank"}
              rel={hasEmail ? undefined : "noreferrer noopener"}
              className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium tracking-tight text-foreground transition-colors hover:border-foreground/30 hover:bg-white/[0.03]"
            >
              {pick(COPY.hero.secondary)}
            </a>

            <div className="ml-1 flex items-center gap-1">
              {[
                { icon: Github, href: LINKS.github, label: "GitHub" },
                { icon: Linkedin, href: LINKS.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Parked against the bottom of the viewport rather than trailing the
          copy, so it reads as the edge of the first screen. */}
      <div
        {...scroll.revealProps}
        className={cn(
          scroll.revealProps.className,
          "container absolute inset-x-0 bottom-10 hidden items-center gap-3 lg:flex",
        )}
      >
        <ArrowDown size={13} className="text-muted-foreground" aria-hidden="true" />
        <span className="eyebrow">{pick(COPY.hero.scroll)}</span>
      </div>
    </section>
  )
}

export default Hero
