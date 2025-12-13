import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t: translate } = useTranslation();
  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center text-muted-foreground">
          <p>{translate("copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
