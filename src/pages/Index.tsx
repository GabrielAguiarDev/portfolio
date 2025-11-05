import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Identity from "@/components/Identity";
import Operations from "@/components/Operations";
import Loadouts from "@/components/Loadouts";
import Intel from "@/components/Intel";
import Comms from "@/components/Comms";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Home />
      <Identity />
      <Operations />
      <Loadouts />
      <Intel />
      <Comms />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
