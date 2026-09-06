import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import { motionScrollTo } from "@/animation";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t: translate } = useTranslation();

  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const homeSection = document.getElementById("home");
        if (!homeSection) return;
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        setIsVisible(window.scrollY > homeBottom);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => motionScrollTo(0)}
      className={`fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/90 text-foreground backdrop-blur transition-[opacity,transform,background-color] duration-300 hover:bg-foreground hover:text-background md:bottom-8 md:right-8 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-label={translate("home")}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <FaArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
