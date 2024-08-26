import { Link } from "@remix-run/react";
import { useLocation } from "react-router-dom";
import BlackLogo from "./logo.svg";
import WhiteLogo from "./logo_white.svg";
import { createTexts, useTranslation } from "../../utils/i18n";

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
        <>
          <a
            href="#main"
            className="absolute -left-96 self-start top-auto overflow-hidden focus:static focus:h-auto bg-white"
          >
            {t(texts.goToMainContent)}
          </a>
          <div className="sticky z-10 top-2 left-0 w-12 h-12 ml-4">
            <Link to={isEnglish ? "/en" : "/"} aria-label={t(texts.goToMain)}>
              <img src={isProgramPage ? WhiteLogo : BlackLogo} alt="Logo" />
            </Link>
          </div>
        </>
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
