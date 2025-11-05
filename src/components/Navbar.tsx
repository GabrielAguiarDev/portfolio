import { useState, useEffect } from "react";
import { Coffee } from "lucide-react";
import { Texts } from "@/texts/nav";
import { useLanguage } from "@/utils/useLanguage";

const Navbar = () => {
  // const texts = useLanguage(Texts);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [language, setLanguage] = useState("pt");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "identity", "ops", "loadouts", "intel", "comms"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleLanguage = () => {
    const newLang = language === "pt" ? "en" : "pt";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
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
            <button
              onClick={() => scrollToSection("identity")}
              className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === "identity" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
                Sobre mim
              {activeSection === "identity" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-fade-in" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("ops")}
              className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === "ops" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Ops
              {activeSection === "ops" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-fade-in" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("loadouts")}
              className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === "loadouts" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Loadouts
              {activeSection === "loadouts" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-fade-in" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("intel")}
              className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === "intel" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Intel
              {activeSection === "intel" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-fade-in" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("comms")}
              className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === "comms" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              Comms
              {activeSection === "comms" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-fade-in" />
              )}
            </button>
          </div>
          <button
            onClick={toggleLanguage}
            className="absolute right-0 flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
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
  );
};

export default Navbar;
