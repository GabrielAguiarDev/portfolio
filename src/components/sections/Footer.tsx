import { ArrowUp } from "lucide-react"

import { motionScrollTo } from "@/animation"
import { COPY } from "@/content/copy"
import { hasEmail, LINKS, PROFILE } from "@/content/profile"
import { useLocale } from "@/i18n/useLocale"

/** Sign-off. Name, role, three links, one line of small print. */
const Footer = () => {
  const { pick } = useLocale()

  const links = [
    { label: "GitHub", href: LINKS.github, external: true },
    { label: "LinkedIn", href: LINKS.linkedin, external: true },
    ...(hasEmail ? [{ label: "Email", href: LINKS.email, external: false }] : []),
  ]

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-[-0.03em] text-foreground">
              {PROFILE.name}
              <span className="text-primary">.</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{pick(PROFILE.role)}</p>
            <p className="mt-1 text-sm text-muted-foreground">{pick(PROFILE.location)}</p>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-7 gap-y-3"
            aria-label={pick(COPY.a11y.social)}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer noopener" : undefined}
                className="rule-link text-sm font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={() => motionScrollTo(0)}
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
            >
              {pick(COPY.footer.top)}
              <ArrowUp
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. {pick(COPY.footer.rights)}
          </p>
          <p>{pick(COPY.footer.built)}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
