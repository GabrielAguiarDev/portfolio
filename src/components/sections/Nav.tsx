import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react"
import { ArrowRight, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { motionScrollTo, setSmoothScrollPaused, animation } from "@/animation"
import { COPY, NAV } from "@/content/copy"
import { hasEmail, LINKS } from "@/content/profile"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * A nav item.
 *
 * On the home page it is a fragment anchor whose default is cancelled so the
 * smooth scroll can own the movement. Anywhere else that same handler was a
 * trap: it cancelled the click, rewrote the URL to `/work/yago#work`, then
 * looked for a `#work` element that does not exist on that page — a dead link
 * that corrupted the address bar on the way. Off the home page the item has to
 * be a real navigation, so it becomes a router Link to `/#id`, and
 * `useHashScroll` resolves the fragment once the home page has mounted.
 *
 * Declared at module scope rather than inside `Nav`: a component defined in a
 * render body is a new component *type* on every render, so React would tear
 * down and rebuild every item each time the bar re-rendered — which it does on
 * every scroll frame — restarting the mobile menu's staggered entrance and
 * dropping keyboard focus mid-interaction.
 */
const SectionLink = ({
  id,
  onHome,
  active,
  onNavigate,
  className,
  style,
  children,
}: {
  id: string
  onHome: boolean
  active: boolean
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, id: string) => void
  className?: string
  style?: CSSProperties
  children: ReactNode
}) =>
  onHome ? (
    <a
      href={`#${id}`}
      onClick={(event) => onNavigate(event, id)}
      aria-current={active ? "location" : undefined}
      className={className}
      style={style}
    >
      {children}
    </a>
  ) : (
    <Link to={`/#${id}`} className={className} style={style}>
      {children}
    </Link>
  )

/** Scroll position, in px, past which the bar earns its background. */
const SOLID_AT = 24

const Nav = () => {
  const { pick, locale, setLocale } = useLocale()
  const { pathname } = useLocation()
  // Off the home page the bar is solid from the first frame. Initialising to
  // false and correcting in an effect meant every case page opened with a
  // half-second background fade, through `transition-colors duration-500`.
  const [solid, setSolid] = useState(
    () => window.location.pathname !== "/" || window.scrollY > SOLID_AT,
  )
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const pending = useRef<string | null>(null)

  // Every nav item points at a section of the home page. On a case-study route
  // none of those sections is in the DOM, so the bar has to navigate rather
  // than scroll — and the scroll-spy has nothing to measure.
  const onHome = pathname === "/"

  useEffect(() => {
    if (!onHome) {
      setSolid(true)
      setActive(null)
      return
    }

    let frame = 0

    const measure = () => {
      frame = 0
      setSolid(window.scrollY > SOLID_AT)

      // The section whose top has most recently passed the reading line.
      const line = window.scrollY + window.innerHeight * 0.35
      let current: string | null = null
      for (const item of NAV) {
        const element = document.getElementById(item.id)
        if (element && element.offsetTop <= line) current = item.id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [onHome])

  // The overlay locks scrolling while it fades out, so a section chosen from
  // the menu is parked here and scrolled to once the overlay is gone.
  useEffect(() => {
    setSmoothScrollPaused(open)
    document.body.style.overflow = open ? "hidden" : ""

    const target = pending.current
    if (open || !target) return
    pending.current = null

    const timer = window.setTimeout(() => {
      const element = document.getElementById(target)
      if (element) motionScrollTo(element)
    }, animation.menuCloseMs)

    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(
    () => () => {
      setSmoothScrollPaused(false)
      document.body.style.overflow = ""
    },
    [],
  )

  const goTo = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      // Let the browser handle a click that asks for a new tab or window.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
      event.preventDefault()

      // Keep the fragment in the address bar so the section stays shareable,
      // without letting the browser jump there and fight the smooth scroll.
      //
      // The existing state has to be carried through: React Router keeps its
      // entry key and index in `history.state`, and passing `null` wipes them.
      // That was invisible while this was a one-route site; now it desynchronises
      // the history stack, and the per-entry scroll positions keyed on that key
      // start restoring the wrong offsets.
      window.history.replaceState(window.history.state, "", `#${id}`)

      if (open) {
        pending.current = id
        setOpen(false)
        return
      }
      const element = document.getElementById(id)
      if (element) motionScrollTo(element)
    },
    [open],
  )

  const contactHref = hasEmail ? LINKS.email : LINKS.linkedin

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[--nav-h] transition-colors duration-500",
          solid && "border-b border-border bg-background/70 backdrop-blur-xl",
        )}
      >
        <div className="container flex h-full items-center justify-between gap-6">
          {/* On the home page the mark scrolls to the top; anywhere else the
              top of the page is not what it means, so it goes home. */}
          {onHome ? (
            <button
              type="button"
              onClick={() => motionScrollTo(0)}
              className="font-display text-[1.0625rem] font-semibold tracking-[-0.03em] text-foreground transition-opacity hover:opacity-70"
            >
              Gabriel<span className="text-primary">.</span>
            </button>
          ) : (
            <Link
              to="/"
              className="font-display text-[1.0625rem] font-semibold tracking-[-0.03em] text-foreground transition-opacity hover:opacity-70"
            >
              Gabriel<span className="text-primary">.</span>
            </Link>
          )}

          <nav className="hidden items-center gap-8 md:flex" aria-label={pick(COPY.a11y.sections)}>
            {NAV.map((item) => (
              <SectionLink
                key={item.id}
                id={item.id}
                onHome={onHome}
                active={active === item.id}
                onNavigate={goTo}
                className={cn(
                  "relative text-[0.8125rem] font-medium tracking-tight transition-colors duration-300",
                  active === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {pick(item.label)}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-primary transition-opacity duration-300",
                    active === item.id ? "opacity-100" : "opacity-0",
                  )}
                />
              </SectionLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
              className="hidden h-8 items-center rounded-full border border-border px-3 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground sm:flex"
              aria-label={pick(COPY.nav.language)}
            >
              {locale === "pt" ? "PT" : "EN"}
            </button>

            <a
              href={contactHref}
              target={hasEmail ? undefined : "_blank"}
              rel={hasEmail ? undefined : "noreferrer noopener"}
              className="group hidden h-8 items-center gap-1.5 rounded-full bg-foreground px-4 text-[0.8125rem] font-medium tracking-tight text-background transition-opacity hover:opacity-85 md:flex"
            >
              {pick(COPY.nav.cta)}
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={pick(COPY.nav.menu)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center md:hidden"
            >
              <span className="flex flex-col items-end gap-[5px]" aria-hidden="true">
                <span className="block h-px w-5 bg-foreground" />
                <span className="block h-px w-3.5 bg-foreground" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-bleed menu. On a phone a drawer is fussy; a plain sheet of type
          is faster to read and cheaper to animate. */}
      {/*
        `invisible` matters as much as `opacity-0` here: an opacity-0 overlay is
        still in the tab order, so a keyboard user would tab through four
        invisible links — and they would sit inside an aria-hidden subtree,
        which is a violation in its own right. `visibility: hidden` takes them
        out of the tab order, and flips back instantly on open so the fade-in
        still reads.
      */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-background transition-opacity duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="container flex h-[--nav-h] shrink-0 items-center justify-between">
          <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.03em]">
            Gabriel<span className="text-primary">.</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={pick(COPY.nav.close)}
            className="flex h-9 w-9 items-center justify-center text-foreground"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="container flex flex-1 flex-col justify-center gap-1 pb-24">
          {NAV.map((item, index) => (
            <SectionLink
              key={item.id}
              id={item.id}
              onHome={onHome}
              active={active === item.id}
              onNavigate={goTo}
              className="flex items-baseline gap-4 py-2 text-left"
              style={{
                transitionDelay: `${index * 40}ms`,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.5s var(--motion-reveal-ease), transform 0.5s var(--motion-reveal-ease)",
              }}
            >
              <span className="w-6 shrink-0 font-mono text-[0.6875rem] text-muted-foreground">
                0{index + 1}
              </span>
              <span className="display-md text-foreground">{pick(item.label)}</span>
            </SectionLink>
          ))}

          <div className="mt-10 flex items-center gap-3">
            <a
              href={contactHref}
              target={hasEmail ? undefined : "_blank"}
              rel={hasEmail ? undefined : "noreferrer noopener"}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background"
            >
              {pick(COPY.nav.cta)}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
              className="inline-flex h-11 items-center rounded-full border border-border px-4 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground"
            >
              {locale === "pt" ? "PT" : "EN"}
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Nav
