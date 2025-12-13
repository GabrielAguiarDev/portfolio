import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useTranslation } from "react-i18next"
import { SocialMediaLinks } from "@/utils/links"

const WhatsappLink =
  "https://wa.me/5573998486884?text=Oi!%20Vi%20seu%20portf%C3%B3lio%20e%20queria%20trocar%20uma%20ideia,%20tudo%20bem%3F"

const Contacts = () => {
  const { t: translate } = useTranslation()
  const { elementRef, isVisible } = useScrollAnimation()
  const socials = [
    { icon: FaLinkedin, label: "LinkedIn", link: SocialMediaLinks.linkedin },
    { icon: FaGithub, label: "GitHub", link: SocialMediaLinks.github },
    { icon: FaInstagram, label: "Instagram", link: SocialMediaLinks.instagram },
  ]

  return (
    <section id="contacts" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`scroll-fade-in ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {translate("contacts")}
          </h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            {translate("descriptionContact")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-16">
            {socials.map((social, index) => {
              const SocialCard = () => {
                const { elementRef, isVisible } = useScrollAnimation()
                return (
                  <a
                    ref={elementRef as any}
                    href={social.link}
                    className={`flex flex-col items-center gap-3 p-6 bg-card border border-border rounded-lg card-hover scroll-fade-in ${
                      isVisible ? "visible" : ""
                    }`}
                    target="_blank"
                  >
                    <social.icon className="w-8 h-8 text-primary" />
                    <span className="text-sm text-center font-medium">
                      {social.label}
                    </span>
                  </a>
                )
              }
              return <SocialCard key={index} />
            })}
          </div>

          <div
            className={`bg-card border border-border rounded-lg p-8 scroll-fade-in ${
              isVisible ? "visible" : ""
            }`}
          >
            <div className="flex items-center gap-6">
              <img
                src="/profile.jpeg"
                alt="YouTube Channel"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Gabriel Aguiar</h3>
                <p className="text-muted-foreground mb-4">
                  {translate("descriptionLetsTalk")}
                </p>
                <Button
                  onClick={() => window.open(WhatsappLink, "_blank")}
                  className="bg-primary hover:bg-primary/90 gap-2"
                >
                  <FaWhatsapp className="size-5" />
                  {translate("letsTalk")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts
