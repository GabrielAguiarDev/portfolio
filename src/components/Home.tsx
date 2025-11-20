import { Github, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
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
            <p className="text-secondary font-semibold text-2xl tracking-wider">I Am Gabriel Aguiar</p>

            <h1 className="text-5xl md:text-5xl font-bold leading-tight">
              <span className="block text-foreground text-primary">Desenvolvedor Mobile</span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-lg">
              Desenvolvedor mobile focado em criar interfaces modernas e eficientes.
            </p>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Contact me</p>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <Github className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute right-0 bottom-0 inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <img
              src="/image-home.png"
              alt="Gabriel Aguiar"
              className="relative left-36 rounded-2xl w-1/2 h-auto object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
