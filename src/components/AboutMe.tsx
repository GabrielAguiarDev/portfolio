import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslation } from "react-i18next";

const AboutMe = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t: translate } = useTranslation();

  return (
    <section id="aboutMe" className="py-20 bg-background">
      <div className="container mx-auto px-4 flex gap-20">
        <div ref={elementRef} className={`w-2/5 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">{translate("aboutMe")}</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {translate("descriptionAboutMe")}
            </p>
          </div>
        </div>

        <div className="flex-1 mt-16 grid md:grid-cols-2 gap-8">
          {[
            {
              number: "01",
              title: translate("cardMobileDeveloper"),
              description: translate("descriptionCardMobileDeveloper")
            },
            {
              number: "02",
              title: translate("cardArchitecture"),
              description: translate("descriptionCardArchitecture")
            },
            {
              number: "03",
              title: translate("cardQuality"),
              description: translate("descriptionCardQuality")
            },
            {
              number: "04",
              title: translate("cardEvolution"),
              description: translate("descriptionCardEvolution")
            }
          ].map((item, index) => {
            const ItemCard = () => {
              const { elementRef, isVisible } = useScrollAnimation();
              return (
                <div
                  ref={elementRef}
                  key={index}
                  className={`p-6 bg-card border border-border rounded-lg card-hover scroll-fade-in ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl font-bold text-primary/20 mb-4">{item.number}</div>
                  <h3 className="text-1xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              );
            };
            return <ItemCard key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
