import { ArrowDown, ArrowRight, Github, Linkedin } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { animation, RevealText, motionScrollTo, useReveal } from "@/animation"
import PointField from "@/components/hero/PointField"
import { pointFieldIntroPlays } from "@/components/hero/pointFieldIntro"
import { COPY } from "@/content/copy"
import { hasEmail, LINKS, PROFILE } from "@/content/profile"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * The longest the copy is ever held for the point field's entrance, in ms.
 *
 * The field reports back the moment the glyph is there, and reports back
 * immediately when there is no entrance to run, so this is only ever reached
 * by a field that failed outright — a canvas context the browser refused, a
 * chunk that never evaluated. The copy is the page's content and it is not
 * allowed to depend on a piece of scenery, so it comes in on its own a beat
 * after the entrance would have finished either way.
 */
const HOLD_CEILING_MS =
  animation.pointField.intro.holdMs +
  animation.pointField.intro.durationMs +
  animation.pointField.intro.ceilingGraceMs

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
 *
 * On a phone it also carries the opening. There the field cannot stand beside
 * the type, so it is built in front of the visitor instead: the points arrive
 * scrambled, gather into `</>`, and the copy waits and then fades up over the
 * finished object. Desktop opens with everything already in place — see the
 * note on `pointField.intro` in the animation config.
 */
const Hero = () => {
  const { pick } = useLocale()

  // Decided synchronously, on the first render, and never re-opened. Deciding
  // it in an effect would paint the copy and then take it away again, which is
  // the one thing worse than either state.
  const [held, setHeld] = useState(
    () => animation.enabled.reveal && pointFieldIntroPlays(),
  )

  const release = useCallback(() => setHeld(false), [])

  useEffect(() => {
    if (!held) return
    const timer = window.setTimeout(release, HOLD_CEILING_MS)
    return () => window.clearTimeout(timer)
  }, [held, release])

  const eyebrow = useReveal<HTMLParagraphElement>({ delay: 0.05, hold: held })
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.5, hold: held })
  const actions = useReveal<HTMLDivElement>({ delay: 0.6, hold: held })
  const scroll = useReveal<HTMLDivElement>({ delay: 0.95, hold: held })

  const contactHref = hasEmail ? LINKS.email : LINKS.linkedin

  return (
    <section
      id="hero"
      // `overflow-x-clip` and not `overflow-hidden`: the point field's canvas
      // deliberately reaches above and below this section on a phone, and
      // `hidden` would cut it back to the section's own box. Only the sideways
      // axis needs clipping here — that is the bloom below, at 120vw — and
      // `clip` is not a scrolling value, so it is the one overflow keyword that
      // can be paired with `visible` on the other axis without turning the hero
      // into a scroll container. `html`/`body` also carry `overflow-x: hidden`
      // as a backstop, so a browser too old for `clip` still cannot be pushed
      // sideways; it would only fail to clip locally.
      className="relative flex min-h-[100svh] items-center overflow-y-visible overflow-x-clip pb-28 pt-[calc(var(--nav-h)+3.5rem)] md:pb-32 lg:pb-24"
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
        onFormed={release}
        className={cn(
          // On a phone the type sits right on top of the glyph. It cannot be
          // masked into a ring the way a sphere could — punching out the middle
          // would take the slash with it — so it drops to a level where it
          // reads behind the copy rather than through it, with its top and
          // bottom edges dissolved so it never looks cropped by the fold.
          //
          // Not as far down as it once sat, though: the glyph is the thing the
          // page opens with now, and a field faint enough to be mistaken for
          // noise is not worth assembling in front of anyone. It is held at a
          // level where the points read as points.
          //
          // While it is assembling it is nearly at full strength — for that
          // beat it is the only thing on the screen — and steps back over the
          // second the copy takes to arrive. The transition is the handover,
          // not a flourish.
          //
          // ── The bleed, on a phone ─────────────────────────────────────────
          //
          // The canvas is taller than the hero here: a fifth of the hero's
          // height past it at the top, and the same at the bottom. No layout
          // moves — it is absolutely positioned and the section clips sideways
          // only.
          //
          // It exists because scrolling scatters the field. The canvas used to
          // end where the hero ends, so by the time the hero had travelled far
          // enough up for the scatter to finish, its bottom edge sat around the
          // middle of the screen — and the points stopped dead on that line,
          // with nothing on screen to explain it. The bleed puts both edges out
          // of sight, and the field reads as spreading across the whole display.
          //
          // Symmetric, and it has to stay symmetric: the draw loop centres the
          // glyph on the canvas, so an uneven bleed would carry the resting
          // glyph off the hero's centre and out from behind the copy. See
          // `pointField.bleed`.
          // `h-[140%]` and not a matching `-bottom-[20%]`: a <canvas> is a
          // replaced element, so `height: auto` on it resolves from its
          // intrinsic 300x150 aspect ratio and the `bottom` offset is dropped
          // as over-constrained — which sized it to 197px instead of the
          // hero's 1193px. The height has to be stated, and 140% is the same
          // arithmetic said the other way: 100% of the hero plus the 20% bleed
          // at each end.
          "-top-[20%] h-[140%]",
          // The stops below are that bleed's arithmetic. A canvas at 140% of
          // the hero puts the hero's own top edge at 14.3% of it and its bottom
          // at 85.7%. So: opaque by 20%, which is a navbar's height into the
          // hero, where the field would otherwise show through the bar; and
          // still opaque at 88%, just past the fold, so the points are at full
          // strength across every pixel anybody can see. Both fades run inside
          // the bleed, off screen.
          "[mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_88%,transparent)]",
          // From `md` up, exactly what it was before any of this: the canvas is
          // the hero's own box, with the mask dissolving the two edges inside
          // it. `md` and not `lg` because that is where the draw loop stops
          // treating itself as mobile, and the two must not disagree.
          "md:top-0 md:h-full",
          "md:[mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)]",
          "transition-opacity duration-1000 ease-out",
          held ? "opacity-90" : "opacity-[0.45]",
          "-z-10 lg:opacity-100",
          // A plain left-hand fade, not a vignette: the glyph stays whole and
          // only the edge running under the type falls away. Held well left of
          // where the "<" starts, so the tag is never dimmed at one end. It
          // also catches the points that scatter leftward across the copy on
          // scroll.
          "lg:[mask-image:linear-gradient(to_right,transparent_14%,#000_42%)]",
        )}
      />

      {/* While the copy is held it is `opacity: 0` but still laid out, and a
          tap where the primary button is about to be would scroll to Work from
          what looks like empty space. It is not there yet, so it does not take
          taps yet either. */}
      <div className={cn("container relative w-full", held && "pointer-events-none")}>
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
              hold={held}
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
