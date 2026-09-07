import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

import { RevealText, useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { EMAIL, hasEmail, LINKS } from "@/content/profile"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * The close.
 *
 * One question, one action, three ways to reach me. No form: a form asks a
 * visitor to do paperwork at the exact moment they were ready to just write.
 *
 * The email row only appears once EMAIL has been filled in — see profile.ts.
 * An unfilled address would render a mailto: to nowhere, which is worse than
 * not offering it.
 */
const Contact = () => {
  const { pick } = useLocale()
  const eyebrow = useReveal<HTMLParagraphElement>()
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.18 })
  const cta = useReveal<HTMLDivElement>({ delay: 0.26 })
  const links = useReveal<HTMLUListElement>({ delay: 0.32 })

  const channels = [
    ...(hasEmail ? [{ icon: Mail, label: "Email", value: EMAIL, href: LINKS.email, external: false }] : []),
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/gabriel-aguiar-dev",
      href: LINKS.linkedin,
      external: true,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@GabrielAguiarDev",
      href: LINKS.github,
      external: true,
    },
  ]

  return (
    <section
      id="contact"
      className="section-anchor relative overflow-hidden border-t border-border py-24 md:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(65%_100%_at_50%_100%,rgba(248,107,39,0.10),transparent_72%)]"
      />

      <div className="container">
        <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
          {pick(COPY.contact.eyebrow)}
        </p>

        <h2 className="mt-6 md:mt-8">
          <RevealText
            as="span"
            text={pick(COPY.contact.title)}
            className="display-xl block max-w-[14ch] text-balance text-foreground"
          />
        </h2>

        <p
          {...lead.revealProps}
          className={cn(
            lead.revealProps.className,
            "mt-8 max-w-[46ch] text-pretty text-base leading-relaxed text-muted-foreground md:mt-10 md:text-lg",
          )}
        >
          {pick(COPY.contact.lead)}
        </p>

        <div {...cta.revealProps} className={cn(cta.revealProps.className, "mt-10 md:mt-12")}>
          <a
            href={hasEmail ? LINKS.email : LINKS.linkedin}
            target={hasEmail ? undefined : "_blank"}
            rel={hasEmail ? undefined : "noreferrer noopener"}
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-foreground px-8 text-[0.9375rem] font-medium tracking-tight text-background transition-opacity hover:opacity-85"
          >
            {pick(COPY.contact.cta)}
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <ul
          {...links.revealProps}
          className={cn(
            links.revealProps.className,
            "mt-16 grid border-t border-border md:mt-20",
            channels.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
          )}
        >
          {channels.map(({ icon: Icon, label, value, href, external }) => (
            <li key={label} className="border-b border-border md:border-b-0 md:border-r md:last:border-r-0">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                className="group flex items-center gap-4 py-6 transition-colors md:px-6 md:first:pl-0"
              >
                <Icon
                  size={17}
                  strokeWidth={1.75}
                  className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="eyebrow block">{label}</span>
                  <span className="mt-1.5 block truncate text-sm font-medium tracking-tight text-foreground">
                    {value}
                  </span>
                </span>
                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Contact
