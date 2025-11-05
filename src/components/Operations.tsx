import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Operations = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const projects = [
    {
      title: "White spikes",
      description: "Mirrors any site in real-time with live interaction — like a browser-based VNC session.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      link: "#"
    },
    {
      title: "Cyrix86",
      description: "Cyrix86 is a Windows Remote Administration Tool — just visual control and fast execution.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      link: "#"
    },
    {
      title: "HatStream",
      description: "Secure, decentralized chat for hackers — privacy-first and high-speed.",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
      link: "#"
    },
    {
      title: "PowerShell-Kovak",
      description: "PowerShell-Kovak — Obfuscate, confuse — turn readable code into an enigma.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      link: "#"
    }
  ];

  return (
    <section id="ops" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Operations</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            Crafting offensive and defensive cybersecurity tools — from exploit kits to defensive shields — 
            built to find flaws, test systems, and strengthen digital security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const ProjectCard = () => {
              const { elementRef, isVisible } = useScrollAnimation();
              return (
                <a
                  ref={elementRef}
                  href={project.link}
                  className={`group block bg-card border border-border rounded-lg overflow-hidden card-hover scroll-fade-in ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </a>
              );
            };
            return <ProjectCard key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Operations;
