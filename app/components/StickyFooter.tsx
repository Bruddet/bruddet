import { Link, useLocation } from "@remix-run/react";
import { createTexts, useTranslation } from "../utils/i18n";
import { useBackgroundColor } from "../utils/backgroundColor";

interface StickyFooterProps {
  programUrl: string;
  menyUrl: string;
}

export default function StickyFooter({
  programUrl,
  menyUrl,
}: StickyFooterProps) {
  let textcolor = "black";
  const location = useLocation();
  const { t } = useTranslation();
  const isEnglish =
    location.pathname.includes("/en/") || location.pathname === "/en";
  const showFooter = !["/", "/en"].includes(location.pathname);
  const { color } = useBackgroundColor();

  if (!showFooter) {
    return null;
  }

  if (
    location.pathname.includes("/event") ||
    location.pathname.includes("/program")
  ) {
    textcolor = "white";
  }

  if (location.pathname.includes("/meny")) {
    textcolor = "black";
  }
  if (location.pathname.includes("/artikler")) {
    textcolor = "black";
  }

  return (
    <footer
      className={`w-full bottom-0 sticky border-t text-${textcolor} ${color} font-serif text-2xl border-${textcolor} shadow py-2  z-10 `}
    >
      <ul className="flex flex-row justify-center">
        <li>
          <Link
            to={isEnglish ? "/en" + menyUrl : menyUrl}
            aria-label={t(texts.menuText)}
            className="hover:underline me-12 w-1/2 "
          >
            MENY
          </Link>
        </li>
        <li>
          <Link
            to={isEnglish ? "/en" + programUrl : programUrl}
            aria-label={t(texts.menuText)}
            className="hover:underline me-6 w-1/2"
          >
            PROGRAM
          </Link>
        </li>
      </ul>
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
