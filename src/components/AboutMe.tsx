import { useTranslation } from "react-i18next";

import { RevealText, gridDelay, useReveal } from "@/animation";
import { cn } from "@/lib/utils";

type Item = {
  number: string;
  title: string;
  description: string;
};

const items: Item[] = [
  {
    number: "01",
    title: "cardMobileDeveloper",
    description: "descriptionCardMobileDeveloper"
  },
  {
    number: "02",
    title: "cardArchitecture",
    description: "descriptionCardArchitecture"
  },
  {
    number: "03",
    title: "cardQuality",
    description: "descriptionCardQuality"
  },
  {
    number: "04",
    title: "cardEvolution",
    description: "descriptionCardEvolution"
  }
]

const ItemCard = ({ item, index }: { item: Item; index: number }) => {
  const { revealProps } = useReveal<HTMLLIElement>({ delay: gridDelay(index) });
  const { t: translate } = useTranslation();

  return (
    <li
      {...revealProps}
      className={cn(
        revealProps.className,
        "surface flex flex-col p-6 md:card-lift md:p-7",
      )}
    >
      <span className="font-display text-2xl leading-none text-primary">{item.number}</span>
      <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
        {translate(item.title)}
      </h3>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
        {translate(item.description)}
      </p>
    </li>
  );
};

const AboutMe = () => {
  const { revealProps } = useReveal<HTMLParagraphElement>({ delay: 0.12 });
  const { t: translate } = useTranslation();

  return (
    <section id="aboutMe" className="scroll-mt-20 py-16 md:py-28">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div className="border-t border-border pt-7 md:pt-10">
            <RevealText
              as="h2"
              text={translate("aboutMe")}
              className="heading-lg text-balance text-foreground"
            />
            <p
              {...revealProps}
              className={cn(
                revealProps.className,
                "mt-5 whitespace-pre-line text-pretty text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg",
              )}
            >
              {translate("descriptionAboutMe")}
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 md:mt-10 md:gap-5">
            {items.map((item, index) => (
              <ItemCard key={item.title} index={index} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
