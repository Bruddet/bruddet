import { Link, useLocation } from "@remix-run/react";
import { createTexts, useTranslation } from "../utils/i18n";
import { useBackgroundColor } from "../utils/hooks/useBackgroundColor";

export default function StickyFooter() {
  let textcolor = "black";
  const location = useLocation();
  const { t } = useTranslation();
  const isEnglish =
    location.pathname.includes("/en/") || location.pathname === "/en";
  const { color } = useBackgroundColor();

  return (
    <footer
      className={`md:hidden z-50 py-6 flex flex-row justify-center align-middle gap-10 w-full bottom-0 sticky border-t border-${textcolor} text-${textcolor} ${color} font-serif text-2xl `}
    >
      <Link
        to={isEnglish ? "/en" + "/meny" : "/meny"}
        aria-label={t(texts.menuText)}
        className="hover:underline"
      >
        MENY
      </Link>

      <Link
        to={isEnglish ? "/en" + "/program" : "/program"}
        aria-label={t(texts.menuText)}
        className="hover:underline"
      >
        PROGRAM
      </Link>
    </footer>
  );
}

const texts = createTexts({
  programText: {
    nb: "Gå til programside",
    en: "Go to program page",
  },
  menuText: {
    nb: "Gå til menyside",
    en: "Go to menu page",
  },
});
