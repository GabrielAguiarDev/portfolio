import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { RevealText, animation, useParallax, useReveal } from "@/animation";
import { SocialMediaLinks } from "@/utils/links";
import { cn } from "@/lib/utils";

const socials = [
  { icon: FaGithub, label: "GitHub", link: SocialMediaLinks.github },
  { icon: FaLinkedin, label: "LinkedIn", link: SocialMediaLinks.linkedin },
  { icon: FaInstagram, label: "Instagram", link: SocialMediaLinks.instagram },
];

const Home = () => {
  const { t: translate } = useTranslation();
  const portraitRef = useParallax<HTMLImageElement>(animation.parallax.heroPortrait);
  const haloRef = useParallax<HTMLDivElement>(animation.parallax.heroHalo);
  const lead = useReveal<HTMLParagraphElement>({ delay: 0.24 });
  const actions = useReveal<HTMLDivElement>({ delay: 0.32 });
  const eyebrow = useReveal<HTMLParagraphElement>({ delay: 0.04 });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pb-24 md:pt-32"
    >
      <div className="container relative z-10">
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div>
            <p {...eyebrow.revealProps} className={cn(eyebrow.revealProps.className, "eyebrow")}>
              {translate("iamGabriel")}
            </p>

            <h1 className="mt-5 md:mt-6">
              <RevealText
                as="span"
                text={translate("mobileDeveloper")}
                className="block heading-xl text-balance text-foreground"
                delay={0.06}
              />
            </h1>

            <p
              {...lead.revealProps}
              className={cn(
                lead.revealProps.className,
                "mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:mt-8 md:text-lg",
              )}
            >
              {translate("smallDescription")}
            </p>

            <div {...actions.revealProps} className={cn(actions.revealProps.className, "mt-8 md:mt-10")}>
              <p className="eyebrow">{translate("contactMe")}</p>
              <ul className="mt-4 flex items-center gap-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
                    >
                      <social.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            {/* Soft accent field, drifting at its own rate behind the portrait.
                Positioned with insets, not translate, so GSAP owns the transform. */}
            <div
              ref={haloRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[12%] top-[12%] -z-10 h-[76%] rounded-full bg-primary/[0.07] blur-3xl"
            />
            <img
              ref={portraitRef}
              src="/image-home.png"
              alt="Gabriel Aguiar"
              width={512}
              height={768}
              decoding="async"
              className="h-auto w-[55%] max-w-[260px] object-contain md:w-[78%] md:max-w-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
