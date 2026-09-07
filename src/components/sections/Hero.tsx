import { ArrowDown, ArrowRight, Github, Linkedin } from "lucide-react"

import { RevealText, animation, motionScrollTo, useFloat, useReveal } from "@/animation"
import PhoneFrame from "@/components/device/PhoneFrame"
import { YagoBooking, YagoHome, YagoNotification } from "@/components/screens/Yago"
import { COPY } from "@/content/copy"
import { hasEmail, LINKS, PROFILE } from "@/content/profile"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * The device composition.
 *
 * Two phones, at different sizes, drifting at different rates and leaning by
 * different amounts — that difference is what makes them read as objects in a
 * space rather than one flat image pasted onto the page. The notification
 * floats free of both, because that is literally where a notification lives.
 */
const HeroDevices = () => {
  const lead = useFloat<HTMLDivElement>({
    y: animation.parallax.heroDevice,
    rotate: -3,
  })
  const back = useFloat<HTMLDivElement>({
    y: animation.parallax.heroDeviceBack,
    rotate: 6,
  })
  const glow = useFloat<HTMLDivElement>({ y: animation.parallax.heroGlow, tilt: { desktop: 0, mobile: 0 } })

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[27rem] lg:max-w-[34rem]">
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[92%] w-[124%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(53,168,167,0.18),rgba(55,88,173,0.11)_45%,transparent_76%)] blur-2xl"
      />

      {/*
        The aspect box stops the absolutely-positioned phones collapsing the
        grid cell. Its ratio is not arbitrary: a PhoneFrame is 2.16× as tall as
        it is wide, so the tallest phone here (46% of the width) needs roughly
        1.0× the container's width in height, plus room to sit off the bottom.
      */}
      <div className="relative aspect-[5/5.2] w-full">
        <div
          ref={back}
          className="absolute right-[3%] top-[2%] z-0 w-[38%]"
          aria-hidden="true"
        >
          <PhoneFrame lit={false} className="opacity-90">
            <YagoBooking />
          </PhoneFrame>
        </div>

        <div ref={lead} className="absolute bottom-0 left-[2%] z-10 w-[46%]">
          <PhoneFrame>
            <YagoHome />
          </PhoneFrame>
        </div>

        <div className="absolute bottom-[10%] right-0 z-20 w-[48%]">
          <YagoNotification />
        </div>
      </div>
    </div>
  )
}

const Hero = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>({ delay: 0.05 })
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.5 })
  const actions = useReveal<HTMLDivElement>({ delay: 0.6 })
  const devices = useReveal<HTMLDivElement>({ delay: 0.35 })
  const scroll = useReveal<HTMLDivElement>({ delay: 0.9 })

  const contactHref = hasEmail ? LINKS.email : LINKS.linkedin

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-20 pt-[calc(var(--nav-h)+3rem)] md:pb-28 md:pt-[calc(var(--nav-h)+5rem)] lg:min-h-[100svh] lg:pb-16 lg:pt-[calc(var(--nav-h)+4rem)]"
    >
      {/* A single, very soft bloom at the top of the page. The only light
          source in the whole layout. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[30%] left-1/2 -z-10 h-[70vh] w-[120vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(248,107,39,0.07),transparent_70%)]"
      />

      <div className="container relative flex h-full flex-col justify-center">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-16">
          <div className="lg:pr-4">
            <p
              {...eyebrow.revealProps}
              className={cn(eyebrow.revealProps.className, "flex flex-wrap items-center gap-x-3 gap-y-1")}
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
                "mt-7 max-w-[38ch] text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground md:mt-9 md:text-base",
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

          <div {...devices.revealProps} className={devices.revealProps.className}>
            <HeroDevices />
          </div>
        </div>

        <div
          {...scroll.revealProps}
          className={cn(
            scroll.revealProps.className,
            "mt-14 hidden items-center gap-3 lg:flex",
          )}
        >
          <ArrowDown size={13} className="text-muted-foreground" aria-hidden="true" />
          <span className="eyebrow">{pick(COPY.hero.scroll)}</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
