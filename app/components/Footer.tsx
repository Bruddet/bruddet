import { useState } from "react";
import { useBackgroundColor } from "~/utils/hooks/useBackgroundColor";
import { getColor } from "~/utils/colorCombinations";
import { createTexts, useTranslation } from "~/utils/i18n";
import { useColorCombination } from "~/utils/hooks/useColorCombination";
import { Link, useLocation } from "@remix-run/react";
import { FooterMarquee } from "./FooterMarquee";

type TFooterContent = {
  link?: { _ref: string; _type: "reference"; _weak?: boolean };
  text?: string;
};

type Props = {
  footerContent: TFooterContent | undefined | null;
};

export default function Footer({ footerContent }: Props) {
  const { color } = useBackgroundColor();
  const pathname = useLocation()?.pathname;
  console.log("footerprops", footerContent);

  return (
    <>
      <button
        className={`overflow-hidden ${
          (pathname.includes("program") ||
            pathname.includes("meny") ||
            pathname.includes("event")) &&
          `border-t border-black`
        }  hidden z-50 md:flex sticky bottom-0 h-14 text-black ${
          color !== "bg-white" ? color : "bg-black"
        } `}
      >
        <Content footerContent={footerContent} pathname={pathname} />
      </button>
    </>
  );
}

type ContentProps = {
  pathname: string;
  footerContent: TFooterContent | undefined | null;
};

export const Content = ({ pathname, footerContent }: ContentProps) => {
  const { t } = useTranslation();

  const { colorCombination } = useColorCombination();
  const { secondaryBorder, primaryTextColor } = getColor(colorCombination);

  const [isHovering, setIsHovering] = useState(false);

  const handleScroll = () => {
    const target = document.getElementById("tickets");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="grid grid-cols-[2fr_10fr_2fr] h-full w-full">
      <Link
        to={pathname?.includes("/en") ? "/en/meny" : "/meny"}
        className={`flex justify-start items-center ${primaryTextColor} hover:bg-mainThemeColor hover:underline`}
        aria-label={t(texts.menuText)}
      >
        <div className="px-4 text-xl font-bold">{t(texts.menuButton)}</div>
      </Link>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`border-l border-r ${secondaryBorder} hover:bg-mainThemeColor overflow-hidden whitespace-nowrap flex items-center`}
      >
        {pathname?.includes("event") ? (
          <button
            className="py-4 flex flex-row justify-center align-middle gap-10 w-full hover:underline bottom-0 sticky text-${textcolor} hover:bg-mainThemeColor bg-beige font-serif font-bold text-xl"
            onClick={handleScroll}
          >
            {t(texts.buy).toUpperCase()}
          </button>
        ) : (
          <FooterMarquee
            marqueeText={footerContent?.text ?? t(texts.marqueeText)}
            marqueeLink={footerContent?.link}
            isHovering={isHovering}
            pathname={pathname}
          />
        )}
      </div>
      <Link
        to={pathname?.includes("/en") ? "/en/program" : "/program"}
        className={`flex justify-end items-center hover:bg-mainThemeColor hover:underline`}
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
    nb: "Få ekslusiv info, billetter til redusert pris og andre tilbud! Meld deg på vårt nyhetsbrev",
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
  buy: {
    en: "Buy ticket",
    nb: "Kjøp billett",
  },
});
