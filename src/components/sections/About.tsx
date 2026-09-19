import { animation, RevealText, useParallax, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { MOBILE } from "@/content/mobile"
import { PROFILE } from "@/content/profile"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

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

              <img
                ref={portrait}
                src={PROFILE.photo}
                alt={PROFILE.name}
                width={1254}
                height={1254}
                loading="lazy"
                decoding="async"
                className="portrait-fade block aspect-[4/5] w-full object-cover object-[50%_26%] grayscale contrast-[1.04] brightness-[1.12] sepia-[0.08]"
              />

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
                      index >= MOBILE.aboutParagraphs && "hidden md:block",
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
