import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dot from "~/assets/Dot";
import { useBackgroundColor } from "~/utils/hooks/useBackgroundColor";
import { getColor } from "~/utils/colorCombinations";
import { createTexts, useTranslation } from "~/utils/i18n";
import { useColorCombination } from "~/utils/hooks/useColorCombination";

export default function NewsletterFooter() {
  const { color } = useBackgroundColor();
  const pathname = useLocation().pathname;

  return (
    <>
      <button
        className={`overflow-hidden ${
          (pathname.includes("program") || pathname.includes("meny")) &&
          `border-t border-black`
        }  hidden z-50 md:flex sticky bottom-0 h-14 text-black ${
          color !== "bg-white" ? color : "bg-black"
        } `}
      >
        <Content pathname={pathname} />
      </button>
    </>
  );
}

type ContentProps = {
  pathname?: string;
};

export const Content = ({ pathname }: ContentProps) => {
  const { t } = useTranslation();

  const { colorCombination } = useColorCombination();
  const { secondaryBorder, primaryTextColor } = getColor(colorCombination);

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="grid grid-cols-[2fr_10fr_2fr] h-full w-full">
      <Link
        to={pathname?.includes("/en") ? "/en/meny" : "/meny"}
        className={`flex justify-start items-center ${primaryTextColor} hover:bg-mainThemeColor`}
        aria-label={t(texts.menuText)}
      >
        <div className="px-4 text-xl font-bold">{t(texts.menuButton)}</div>
      </Link>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`border-l border-r ${secondaryBorder} hover:bg-mainThemeColor overflow-hidden whitespace-nowrap flex items-center`}
      >
        {isHovering ? (
          <div className="w-full">
            <p>{t(texts.newsletterText)}</p>
          </div>
        ) : (
          <div className="animate-marquee flex items-center">
            {Array.from({ length: 2 }).map((_, idx) =>
              Array.from({ length: 10 }).map((_, i) => (
                <div
                  className="flex items-center"
                  aria-hidden={idx === 1}
                  key={i}
                >
                  <span className="text-l font-thin mossDark mx-10">
                    {t(texts.marqueeText)}
                  </span>
                  <Dot
                    color={
                      pathname?.includes("program") ||
                      pathname?.includes("meny")
                        ? "#182D39"
                        : "#D4FF26"
                    }
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Link
        to={pathname?.includes("/en") ? "/en/program" : "/program"}
        className={`flex justify-end items-center hover:bg-mainThemeColor`}
        aria-label={t(texts.programText)}
      >
        <div className="px-4 text-xl font-bold ml-auto">
          {t(texts.programButton)}
        </div>
      </Link>
    </div>
  );
};

const texts = createTexts({
  marqueeText: {
    nb: "Nyhetsbrev",
    en: "Newsletter",
  },
  newsletterText: {
    nb: " Få ekslusiv info, billetter til redusert pris og andre tilbud! Meld deg på vårt nyhetsbrev",
    en: "Get exclusive info, tickets at reduced prices and other offers! Sign up for our newsletter!",
  },
  newsletterMobile: {
    nb: "Meld deg på vårt nyhetsbrev",
    en: "Sign up for our newsletter",
  },
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
  programButton: {
    nb: "Program",
    en: "Program",
  },
});
