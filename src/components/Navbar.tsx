import { useState, useEffect } from "react";
import { Coffee } from "lucide-react";
import { Texts } from "@/texts";
import { useLanguage } from "@/utils/useLanguage";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  // const texts = useLanguage(Texts);
  const { i18n, t: translate } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [language, setLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "aboutMe", "experiences", "skills", "projects", "contacts"];
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
    i18n.changeLanguage(newLang)
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
              onClick={() => scrollToSection("aboutMe")}
              className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === "aboutMe" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              {translate("aboutMe")}
              {activeSection === "aboutMe" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-fade-in" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("experiences")}
              className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === "experiences" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              {translate("experiences")}
              {activeSection === "experiences" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-fade-in" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === "skills" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              {translate("skills")}
              {activeSection === "skills" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-fade-in" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === "projects" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              {translate("projects")}
              {activeSection === "projects" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-fade-in" />
              )}
            </button>
            <button
              onClick={() => scrollToSection("contacts")}
              className={`relative text-sm font-medium transition-colors hover:text-foreground py-2 ${activeSection === "contacts" ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              {translate("contacts")}
              {activeSection === "contacts" && (
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
