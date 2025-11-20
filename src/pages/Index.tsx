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
      <Navbar />
      <Home />
      <AboutMe />
      <Experiences />
      <Skills />
      <Projects />
      <Contacts />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
