import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t: translate } = useTranslation();
  // Extra bottom room on mobile so the floating back-to-top button, which sits
  // 24px from the bottom, never lands on the copyright line.
  return (
    <footer className="border-t border-border bg-background pb-24 pt-10 md:py-12">
      <div className="container">
        <p className="text-pretty text-center text-sm text-muted-foreground">
          {translate("copyright")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
