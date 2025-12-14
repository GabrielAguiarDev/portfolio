import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslation } from "react-i18next";

type ItemCardProps = {
  item: {
    number: string;
    title: string;
    description: string;
  };
  index: number;
};

const items = [
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

const ItemCard = ({ item, index }: ItemCardProps) => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t: translate } = useTranslation();
  return (
    <div
      ref={elementRef}
      key={index}
      className={`p-6 bg-card border border-border rounded-lg md:card-hover scroll-fade-in ${isVisible ? 'visible' : ''}`}
    >
      <div className="text-4xl font-bold text-primary mb-4">{item.number}</div>
      <h3 className="text-1xl font-bold mb-3">{translate(item.title)}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{translate(item.description)}</p>
    </div>
  );
};


const AboutMe = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t: translate } = useTranslation();

  return (
    <section id="aboutMe" className="md:py-20 py-10 bg-background scroll-mt-10 md:scroll-mt-0">
      <div className="container mx-auto px-4 flex md:flex-row flex-col md:gap-20 gap-10">
        <div ref={elementRef} className={`md:w-2/5 w-full scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">{translate("aboutMe")}</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {translate("descriptionAboutMe")}
            </p>
          </div>
        </div>

        <div className="flex-1 md:mt-16 grid md:grid-cols-2 gap-8">
          {items.map((item, index) =>
            <ItemCard key={item.title} index={index} item={item} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
