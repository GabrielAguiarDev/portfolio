import { Github, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-cyber-dark opacity-50" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-secondary font-medium tracking-wider">I Am Madhan</p>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-foreground">Ethical Hacker +</span>
              <span className="block bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent glitch">
                _?[_≈∂&gt;—1æ©Fæl˚∧©[
              </span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-lg">
              Obsessed with tech — I hack, build, and break (legally) to push the limits of cybersecurity.
            </p>

            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
              <span className="text-sm text-muted-foreground">Latest Focus</span>
              <a
                href="https://github.com/madhanmaaz/cyrix86"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Cyrix86 - Windows RAT →
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Trace My Signal</p>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <Github className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all">
                  <Youtube className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              alt="Profile"
              className="relative rounded-2xl w-full h-auto object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
