import { Instagram, Github, Twitter, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Contacts = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const socials = [
    { icon: Instagram, label: "Instagram", link: "#" },
    { icon: Github, label: "GitHub", link: "#" },
    { icon: Twitter, label: "X (Twitter)", link: "#" },
    { icon: Youtube, label: "YouTube", link: "#" },
    { icon: Linkedin, label: "LinkedIn", link: "#" }
  ];

  return (
    <section id="contacts" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Contacts</h2>
          <p className="text-2xl text-muted-foreground mb-12">Signal Channels</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            {socials.map((social, index) => {
              const SocialCard = () => {
                const { elementRef, isVisible } = useScrollAnimation();
                return (
                  <a
                    ref={elementRef}
                    href={social.link}
                    className={`flex flex-col items-center gap-3 p-6 bg-card border border-border rounded-lg card-hover scroll-fade-in ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                <social.icon className="w-8 h-8 text-primary" />
                <span className="text-sm text-center font-medium">{social.label}</span>
              </a>
                );
              };
              return <SocialCard key={index} />;
            })}
          </div>

          <div className={`bg-card border border-border rounded-lg p-8 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="flex items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                alt="YouTube Channel"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Madhan Hacker</h3>
                <p className="text-muted-foreground mb-4">
                  Welcome! For mastering ethical hacking, cybersecurity, and online defence, 
                  you're in the right place.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Youtube className="mr-2 w-4 h-4" />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
