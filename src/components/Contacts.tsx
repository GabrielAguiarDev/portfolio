import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"
import { useTranslation } from "react-i18next"

import { gridDelay, useReveal } from "@/animation"
import SectionHeader from "@/components/SectionHeader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SocialMediaLinks } from "@/utils/links"

const WhatsappLink =
  "https://wa.me/5573998486884?text=Oi!%20Vi%20seu%20portf%C3%B3lio%20e%20queria%20trocar%20uma%20ideia,%20tudo%20bem%3F"

const socials = [
  { icon: FaLinkedin, label: "LinkedIn", link: SocialMediaLinks.linkedin },
  { icon: FaGithub, label: "GitHub", link: SocialMediaLinks.github },
  { icon: FaInstagram, label: "Instagram", link: SocialMediaLinks.instagram },
]

const SocialCard = ({
  social,
  index,
}: {
  social: (typeof socials)[number]
  index: number
}) => {
  const { revealProps } = useReveal<HTMLLIElement>({ delay: gridDelay(index) })

  return (
    <li {...revealProps} className={revealProps.className}>
      <a
        href={social.link}
        target="_blank"
        rel="noreferrer noopener"
        className="surface flex min-h-[6.5rem] flex-col items-center justify-center gap-3 p-5 transition-colors duration-300 hover:border-foreground/25 md:card-lift"
      >
        <social.icon className="h-6 w-6 text-foreground" aria-hidden="true" />
        <span className="text-sm font-medium text-foreground">{social.label}</span>
      </a>
    </li>
  )
}

const Contacts = () => {
  const { t: translate } = useTranslation()
  const card = useReveal<HTMLDivElement>({ delay: 0.14 })

  return (
    <section id="contacts" className="scroll-mt-20 py-16 md:py-28">
      <div className="container">
        <SectionHeader title={translate("contacts")} lead={translate("descriptionContact")} />

        <div className="mt-11 md:mt-16">
          <ul className="grid grid-cols-3 gap-4 md:gap-5">
            {socials.map((social, index) => (
              <SocialCard key={social.label} social={social} index={index} />
            ))}
          </ul>

          <div
            {...card.revealProps}
            className={cn(card.revealProps.className, "surface mt-4 p-6 md:mt-5 md:p-9")}
          >
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:gap-8 md:text-left">
              <img
                src="/profile.jpeg"
                alt="Gabriel Aguiar"
                width={128}
                height={128}
                loading="lazy"
                decoding="async"
                className="h-24 w-24 shrink-0 rounded-full object-cover md:h-28 md:w-28"
              />
              <div className="flex-1">
                <h3 className="heading-md text-foreground">Gabriel Aguiar</h3>
                <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
                  {translate("descriptionLetsTalk")}
                </p>
                <Button
                  onClick={() => window.open(WhatsappLink, "_blank", "noopener")}
                  size="lg"
                  className="mt-6 gap-2"
                >
                  <FaWhatsapp className="h-[18px] w-[18px]" aria-hidden="true" />
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
