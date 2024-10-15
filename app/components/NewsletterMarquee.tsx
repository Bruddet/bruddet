import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dot from "~/assets/Dot";
import { useBackgroundColor } from "~/utils/backgroundColor";
import { getColor } from "~/utils/colorCombinations";
import { createTexts, useTranslation } from "~/utils/i18n";

export function NewsletterMarquee() {
  const [displayText, setDisplayText] = useState(true);

  const { color } = useBackgroundColor();
  const location = useLocation();

  console.log("color", color)
  return (
    <>
      <button
        id="newsletter-marquee"
        className={`overflow-hidden ${location.pathname.includes("program") && 'border-t border-black'}  hidden z-50 md:flex sticky bottom-0 h-14 text-black ${color !== "bg-white" ? color : "bg-black"} `}
        onFocus={() => {
          setDisplayText(false);
        }}
        onBlur={() => {
          setDisplayText(true);
        }}
        onMouseEnter={() => {
          setDisplayText(false);
        }}
        onMouseLeave={() => {
          setDisplayText(true);
        }}
      >
        <Content displayText={displayText} />
      </button>
    </>
  );
}

type ContentProps = {
  displayText?: boolean;
};

export const Content = ({ displayText }: ContentProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = location?.pathname;

  return (
    <div className="grid grid-cols-[2fr_10fr_2fr] h-full">
      <Link
        to={pathname.includes("/en") ? "/en/meny" : "/meny"}
        className={`flex justify-start items-center hover:bg-mainThemeColor`}
        aria-label={t(texts.menuText)}
      >
        <div className="px-4 text-xl font-bold">{t(texts.menuButton)}</div>
      </Link>     
      <div className="border-l border-r border-black hover:bg-mainThemeColor overflow-hidden whitespace-nowrap flex items-center">
        <div className="animate-marquee flex items-center">
        {Array.from({ length: 2 }).map((_, idx) => (
          Array.from({ length: 10 }).map((_, i) => (
            <div className="flex items-center" aria-hidden={idx === 1} key={i}>
              <span className="text-l font-thin mossDark mx-10">{t(texts.marqueeText)}</span>
              <Dot color={pathname.includes("program") ? '#182D39' : '#D4FF26'} />
            </div>
            ))
          ))
        }
        </div>
      </div>
      <Link
        to={pathname.includes("/en") ? "/en/program" : "/program"}
        className={`flex justify-end items-center hover:bg-mainThemeColor`}
        aria-label={t(texts.programText)}
      >
        <div className="px-4 text-xl font-bold ml-auto">{t(texts.programButton)}</div>
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

export default NewsletterMarquee;

/*
{displayText ? (
        <>
          <div className="py-4 whitespace-nowrap animate-marquee ">
            {Array.from({ length: 30 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-xl mx-4">{t(texts.marqueeText)}</span>
                <PurpleDot />
              </React.Fragment>
            ))}
          </div>
          <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap">
            {Array.from({ length: 30 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-xl mx-4">{t(texts.marqueeText)}</span>
                <PurpleDot />
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        <div className="text-black py-4 text-xl flex flex-col items-center w-full">
          <div className=" text-center font-serif">
            <p className="text-center">{t(texts.newsletterText)}</p>
          </div>
        </div>
      )}
*/