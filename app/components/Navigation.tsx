import { useTranslation } from "~/utils/i18n";
import Triangle from "~/assets/Triangle";
import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ColorCombinations, SanityImagePalette } from "~/sanity.types";
import { getColor } from "~/utils/colorCombinations";

type Props = {
  colorCombination: ColorCombinations | undefined;
};

export const Navigation = ({ colorCombination }: Props) => {
  const location = useLocation();
  const lang = location?.pathname;

  const { t } = useTranslation();
  const pathsWithBlackText = ["/program", "/meny", "/en/program", "/en/meny"];

  const { shadowColor, primaryTextColor, bgColor } = getColor(
    colorCombination || "creamBlue"
  );

  const navigationButtonStyle = `${
    pathsWithBlackText.includes(location?.pathname)
      ? "text-black"
      : `${primaryTextColor} ${bgColor}`
  } px-8 rounded self-center font-serif text-2xl lg:text-4xl hidden flex-row`;

  const triangleColor = pathsWithBlackText.includes(location?.pathname)
    ? "black"
    : "#D4FF26";

  const colorOnShadow =
    !pathsWithBlackText.includes(location?.pathname) && shadowColor;

  useEffect(() => {}, []);

  return (
    <div className="flex flex-row px-4 justify-between fixed w-full bottom-1/2">
      <Link
        id="menuNavigationButton"
        to={lang.includes("/en") ? "/en/meny" : "/meny"}
        className={`md:flex ${navigationButtonStyle} ${colorOnShadow}`}
        aria-label={t(texts.menuText)}
      >
        <div className={`self-center animate-horizontal-bounce-left`}>
          <Triangle color={triangleColor} direction="left" />
        </div>
        <div
          className={`px-4 text-xl hover:underline ${
            location.pathname.includes("meny") && "underline"
          }`}
        >
          {t(texts.menuButton)}
        </div>
      </Link>
      <Link
        id="programNavigationButton"
        to={lang.includes("/en") ? "/en/program" : "/program"}
        className={`md:flex ${navigationButtonStyle}  ${shadowColor}`}
        aria-label={t(texts.programText)}
      >
        <div
          className={`px-4 text-xl hover:underline ${
            location.pathname.includes("program") && "underline"
          }`}
        >
          Program
        </div>
        <div className="self-center animate-horizontal-bounce-right">
          <Triangle color={triangleColor} direction="right" />
        </div>
      </Link>
    </div>
  );
};

const texts = {
  programText: {
    nb: "Gå til programside",
    en: "Go to program page",
  },
  menuText: {
    nb: "Gå til menyside",
    en: "Go to menu page",
  },
  buyTicket: {
    nb: "Kjøp \nBillett",
    en: "Buy \nTicket",
  },
  menuButton: {
    nb: "Meny",
    en: "Menu",
  },
};
