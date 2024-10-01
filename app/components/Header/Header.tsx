import { Link } from "@remix-run/react";
import { useLocation } from "react-router-dom";
import BlackLogo from "./logo.svg";
import PrimaryLogo from "./logo_primary.svg";
import { createTexts, useTranslation } from "../../utils/i18n";
import LanguageButton from "../LanguageButton";

export default function Header() {
  const location = useLocation();
  const frontpageUrl = ["/", "/en"];
  const { t } = useTranslation();
  const isProgramPage =
    location.pathname.includes("/event") ||
    location.pathname.includes("/program");
  const isEnglish = location.pathname.includes("/en/");

  const className = !frontpageUrl.includes(location.pathname)
    ? "visible"
    : "invisible";
  return (
    <>
      <a
        href="#main"
        className="absolute -left-96 self-start top-auto overflow-hidden focus:static focus:h-auto bg-white"
      >
        {t(texts.goToMainContent)}
      </a>
      <div className="z-50 fixed flex items-center h-14 left-2 top-2">
        <Link
          className={className}
          to={isEnglish ? "/en" : "/"}
          aria-label={t(texts.goToMain)}
        >
          <img src={isProgramPage ? PrimaryLogo : BlackLogo} alt="Logo" />
        </Link>
      </div>
      <div className="z-50 fixed h-14 flex items-center right-2 top-2">
        <LanguageButton />
      </div>
    </>
  );
}

const texts = createTexts({
  goToMain: {
    en: " Go to main page",
    nb: " Gå til hovedsiden",
  },
  goToMainContent: {
    en: "Skip to main content",
    nb: "Hopp til hovedinnhold",
  },
});
