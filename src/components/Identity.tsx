import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Identity = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section id="identity" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={elementRef} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Identity</h2>
            
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm <span className="text-foreground font-semibold">Madhan</span> — a guy who loves hacking, 
                building tools, and breaking things (legally). If you're into hacking, programming, 
                cybersecurity, or anything tech, you're in the right place. I'm here to share, build, 
                and help you explore the digital world.
              </p>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {[
              {
                number: "01",
                title: "Offensive Security",
                description: "Simulating real-world attacks to breach systems (ethically) — uncovering vulnerabilities before malicious actors can exploit them."
              },
              {
                number: "02",
                title: "Toolsmithing",
                description: "Forging custom cybersecurity utilities — from exploit frameworks to defensive shields — built to test, harden, and fortify systems."
              },
              {
                number: "03",
                title: "Secure Engineering",
                description: "Designing and deploying software hardened against intrusion — converting concepts into fortified digital solutions."
              },
              {
                number: "04",
                title: "Signal Broadcasting",
                description: "Producing deep-dive content, tactical guides, and intelligence drops on hacking, programming, and the evolving cyber battlefield."
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
                    <div className="text-6xl font-bold text-primary/20 mb-4">{item.number}</div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                );
              };
              return <ItemCard key={index} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Identity;
