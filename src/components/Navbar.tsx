import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { MdMenu } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState(
    i18n.language || normalizeLanguage(navigator.language),
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const scrollPosition = window.scrollY + 100

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10

      if (isAtBottom) {
        setActiveSection("contacts")
        return
      }

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleLanguage = () => {
    const newLang = language === "pt" ? "en" : "pt"
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/95 backdrop-blur-sm border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 relative">
          <button
            onClick={scrollToTop}
            className="absolute left-0 flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Scroll to top"
          >
            <img src="/logo-p.png" alt="logo" className="w-8" />
          </button>
          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === section
                  ? "text-foreground"
                  : "text-muted-foreground"
                  }`}
              >
                {translate(section)}
                {activeSection === section && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-fade-in" />
                )}
              </button>
            ))}
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="absolute right-0 md:hidden">
              <Button variant="ghost" size="icon">
                <MdMenu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-left text-lg font-medium transition-colors hover:text-foreground py-2 px-4  ${activeSection === section
                      ? "text-foreground border-b-2 border-secondary/60 pb-2"
                      : "text-muted-foreground"
                      }`}
                  >
                    {translate(section)}
                  </button>
                ))}
              </nav>
              <button
                onClick={toggleLanguage}
                className="absolute bottom-5 right-5 flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                {language === "pt" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs">PT</span>
                    <img src="/brazil.svg" alt="flag brazil" className="w-5" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs">EN</span>
                    <img src="/eua.svg" alt="flag united states" className="w-5" />
                  </div>
                )}
              </button>
            </SheetContent>
          </Sheet>
          <button
            onClick={toggleLanguage}
            className="md:flex hidden absolute right-0 items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            {language === "pt" ? (
              <div className="flex items-center gap-2">
                <span className="text-xs">PT</span>
                <img src="/brazil.svg" alt="flag brazil" className="w-5" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs">EN</span>
                <img src="/eua.svg" alt="flag united states" className="w-5" />
              </div>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
