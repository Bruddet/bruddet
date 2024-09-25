import { Link } from "@remix-run/react";
import { useLocation } from "react-router-dom";
import BlackLogo from "./logo.svg";
import WhiteLogo from "./logo_white.svg";
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
  return (
    <>
      {!frontpageUrl.includes(location.pathname) && (
        <div className="fixed flex justify-between items-center w-full px-4 py-2">
          <a
            href="#main"
            className="absolute -left-96 self-start top-auto overflow-hidden focus:static focus:h-auto bg-white"
          >
            {t(texts.goToMainContent)}
          </a>
          <div>
            <Link to={isEnglish ? "/en" : "/"} aria-label={t(texts.goToMain)}>
              <img src={isProgramPage ? WhiteLogo : BlackLogo} alt="Logo" />
            </Link>
          </div>
          <LanguageButton />
        </div>
      )}
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
