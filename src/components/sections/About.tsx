import { animation, RevealText, useParallax, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { PROFILE } from "@/content/profile"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * About.
 *
 * The portrait is treated rather than presented: desaturated, slightly warmed,
 * and cropped tall so it sits as a column of the layout instead of a headshot
 * dropped into a circle. It drifts a little slower than the text beside it,
 * which is what stops the two columns feeling glued together.
 *
 * It used to be framed — a hairline border, a card ground, a rounded corner —
 * and filled its whole column, which made the one photograph on the page the
 * loudest thing in a section whose subject is the writing next to it. Now it
 * is capped well short of the column and dissolved into the ground at every
 * edge, so it reads as something the page fades up to rather than an object
 * dropped on top of it.
 */
const About = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>()
  const body = useReveal<HTMLDivElement>({ delay: 0.16 })
  const frame = useReveal<HTMLDivElement>({ delay: 0.08 })
  const portrait = useParallax<HTMLImageElement>(animation.parallax.portrait)

  return (
    <section id="about" className="section-anchor border-t border-border py-20 md:py-28 lg:py-36">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div
            {...frame.revealProps}
            className={cn(frame.revealProps.className, "lg:col-span-4")}
          >
            {/* Capped rather than filling the column. The track is wider than
                this, and the slack to its right is what keeps the portrait
                from crowding the paragraphs. */}
            <div className="relative mx-auto max-w-[19rem] lg:mx-0 lg:max-w-[21rem]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(closest-side,rgba(248,107,39,0.07),transparent_72%)] blur-2xl"
              />

              {/* No border, no card ground, no corner radius: the mask takes
                  the photograph to nothing at the edges, so a frame would only
                  draw the outline the fade exists to remove. */}
              <img
                ref={portrait}
                src={PROFILE.photo}
                alt={PROFILE.name}
                width={1254}
                height={1254}
                loading="lazy"
                decoding="async"
                className="portrait-fade block aspect-[4/5] w-full object-cover object-[50%_26%] grayscale contrast-[1.04] brightness-[1.08] sepia-[0.08]"
              />

              {/* Sits just clear of the image's box. The bottom of the fade is
                  short for exactly this reason — a longer one would put the
                  caption a hundred pixels below the last pixel of photograph
                  the eye can actually see. */}
              <div className="mt-2 flex items-baseline justify-between gap-4">
                <p className="text-[0.8125rem] font-medium tracking-tight text-foreground">
                  {PROFILE.name}
                </p>
                <p className="eyebrow">{pick(PROFILE.location)}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
              {pick(COPY.about.eyebrow)}
            </p>

            <h2 className="mt-5">
              <RevealText
                as="span"
                text={pick(COPY.about.title)}
                className="display-lg block text-balance text-foreground"
              />
            </h2>

            <div
              {...body.revealProps}
              className={cn(
                body.revealProps.className,
                "mt-8 space-y-6 md:mt-10",
              )}
            >
              {pick(COPY.about.body)
                .split("\n\n")
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      "max-w-[54ch] text-pretty leading-relaxed",
                      index === 0
                        ? "text-base text-foreground/90 md:text-lg"
                        : "text-sm text-muted-foreground md:text-base",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
