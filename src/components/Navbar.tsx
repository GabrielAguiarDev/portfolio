import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { MdMenu } from "react-icons/md"

import { animation, motionScrollTo, setSmoothScrollPaused } from "@/animation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "./ui/button"

const sections = [
  "home",
  "aboutMe",
  "experiences",
  "skills",
  "projects",
  "contacts",
]

function normalizeLanguage(lang?: string): "pt" | "en" {
  if (lang?.toLowerCase().startsWith("pt")) return "pt"
  return "en"
}

const Navbar = () => {
  const { i18n, t: translate } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState(
    normalizeLanguage(i18n.language) || normalizeLanguage(navigator.language),
  )

  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const pendingSection = useRef<string | null>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      setScrolled(window.scrollY > 50)

      const scrollPosition = window.scrollY + 100
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10

      if (isAtBottom) {
        setActiveSection("contacts")
        return
      }

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    const handleScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Slide the active-section marker rather than repainting it in place.
  const syncIndicator = useCallback(() => {
    const element = itemRefs.current[activeSection]
    if (!element) return
    setIndicator({ left: element.offsetLeft, width: element.offsetWidth, ready: true })
  }, [activeSection])

  useLayoutEffect(() => {
    syncIndicator()
  }, [syncIndicator, language])

  useEffect(() => {
    window.addEventListener("resize", syncIndicator)
    return () => window.removeEventListener("resize", syncIndicator)
  }, [syncIndicator])

  useEffect(() => () => setSmoothScrollPaused(false), [])

  // The mobile sheet locks the body while it animates out, so a section picked
  // from the menu is parked here and scrolled to once the sheet is gone.
  useEffect(() => {
    setSmoothScrollPaused(mobileMenuOpen)

    const target = pendingSection.current
    if (mobileMenuOpen || !target) return
    pendingSection.current = null

    const timer = window.setTimeout(() => {
      const element = document.getElementById(target)
      if (element) motionScrollTo(element)
    }, animation.menuCloseMs)

    return () => window.clearTimeout(timer)
  }, [mobileMenuOpen])

  const scrollToSection = (id: string) => {
    if (mobileMenuOpen) {
      pendingSection.current = id
      setMobileMenuOpen(false)
      return
    }
    const element = document.getElementById(id)
    if (element) motionScrollTo(element)
  }

  const toggleLanguage = () => {
    const newLang = language === "pt" ? "en" : "pt"
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
  }

  const languageBadge = (
    <>
      <span className="text-[0.7rem] font-medium tracking-[0.15em]">
        {language === "pt" ? "PT" : "EN"}
      </span>
      <img
        src={language === "pt" ? "/brazil.svg" : "/eua.svg"}
        alt={language === "pt" ? "Português" : "English"}
        width={20}
        height={20}
        className="w-5"
      />
    </>
  )

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative flex h-16 items-center justify-center">
          <button
            type="button"
            onClick={() => motionScrollTo(0)}
            className="absolute left-0 flex h-11 w-11 items-center justify-start transition-opacity hover:opacity-70"
            aria-label={translate("home")}
          >
            <img src="/logo-p.png" alt="Gabriel Aguiar" width={32} height={21} className="w-8" />
          </button>

          <div className="relative hidden items-center gap-7 md:flex">
            {sections.map((section) => (
              <button
                key={section}
                type="button"
                ref={(node) => {
                  itemRefs.current[section] = node
                }}
                onClick={() => scrollToSection(section)}
                aria-current={activeSection === section ? "true" : undefined}
                className={`py-3 text-sm font-medium transition-colors ${
                  activeSection === section
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {translate(section)}
              </button>
            ))}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-primary transition-[transform,width,opacity] duration-500 ease-out"
              style={{
                transform: `translate3d(${indicator.left}px, 0, 0)`,
                width: `${indicator.width}px`,
                opacity: indicator.ready ? 1 : 0,
              }}
            />
          </div>

          <button
            type="button"
            onClick={toggleLanguage}
            className="absolute right-0 hidden h-11 items-center gap-2 px-2 transition-opacity hover:opacity-70 md:flex"
            aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
          >
            {languageBadge}
          </button>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="absolute right-0 md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <MdMenu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-10 flex flex-col">
                {sections.map((section) => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => scrollToSection(section)}
                    aria-current={activeSection === section ? "true" : undefined}
                    className={`border-b border-border py-4 text-left text-lg font-medium transition-colors ${
                      activeSection === section ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          activeSection === section ? "bg-primary" : "bg-transparent"
                        }`}
                      />
                      {translate(section)}
                    </span>
                  </button>
                ))}
              </nav>
              <button
                type="button"
                onClick={toggleLanguage}
                className="absolute bottom-5 right-5 flex h-11 items-center gap-2 px-2 transition-opacity hover:opacity-70"
                aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
              >
                {languageBadge}
              </button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
