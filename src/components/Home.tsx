import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { SocialMediaLinks } from "@/utils/links";

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
        <div className="grid md:grid-cols-2 md:gap-12 gap-0 items-center">
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
                <Button onClick={() => window.open(SocialMediaLinks.github, "_blank")} size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <FaGithub className="md:size-4 size-6" />
                </Button>
                <Button onClick={() => window.open(SocialMediaLinks.linkedin, "_blank")} size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <FaLinkedin className="md:size-4 size-6" />
                </Button>
                <Button onClick={() => window.open(SocialMediaLinks.instagram, "_blank")} size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <FaInstagram className="md:size-4 size-6" />
                </Button>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in flex justify-center md:block">
            <div className="absolute -right-60 -top-10 w-2/4 h-4/5 bg-secondary/20 rounded-full blur-3xl" />
            <div className="relative w-3/4 md:w-1/2 md:left-36 left-0 h-auto rounded-2xl overflow-hidden">
              <img
                src="/image-home.png"
                alt="Gabriel Aguiar"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
