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
            className={cn(frame.revealProps.className, "lg:col-span-5")}
          >
            <div className="relative mx-auto max-w-[22rem] lg:mx-0 lg:max-w-none">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 bg-[radial-gradient(closest-side,rgba(248,107,39,0.09),transparent_72%)] blur-2xl"
              />

              <div className="relative overflow-hidden rounded-[--radius] border border-border bg-card">
                <img
                  ref={portrait}
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  width={1254}
                  height={1254}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full scale-[1.04] object-cover object-[50%_26%] grayscale contrast-[1.04] brightness-[1.12] sepia-[0.08]"
                />
                {/* Grounds the portrait into the page rather than letting it
                    sit on the dark like a cut-out. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-background/5 to-transparent"
                />
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
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
