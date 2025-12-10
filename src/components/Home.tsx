import { Github, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Home = () => {
   const { t: translate } = useTranslation();
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-cyber-dark opacity-50" />

      <div
        className="absolute top-32 left-0 h-[400px] w-[400px]
         rounded-full
         bg-gradient-to-br from-[#6d28d9] via-[#9333ea] to-[#3b0764]
         opacity-40
         blur-[140px]"
      ></div>


      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 animate-fade-in-up">
            <p className="text-secondary font-semibold text-2xl tracking-wider">{translate("iamGabriel")}</p>

            <h1 className="text-5xl md:text-5xl font-bold leading-tight">
              <span className="block text-foreground text-primary">{translate("mobileDeveloper")}</span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-lg">
              {translate("smallDescription")}
            </p>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{translate("contactMe")}</p>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <Github className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -right-60 -top-10 w-2/4 h-4/5 bg-secondary/20 rounded-full blur-3xl" />
            <div className="relative left-36 w-1/2 h-auto rounded-2xl overflow-hidden">
              <img
                src="/image-home.png"
                alt="Gabriel Aguiar"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
