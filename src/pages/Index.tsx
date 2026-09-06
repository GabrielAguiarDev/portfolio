import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import AboutMe from "@/components/AboutMe";
import Experiences from "@/components/Experiences";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-border focus:bg-card focus:px-4 focus:py-3 focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Home />
        <AboutMe />
        <Experiences />
        <Skills />
        <Projects />
        <Contacts />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
