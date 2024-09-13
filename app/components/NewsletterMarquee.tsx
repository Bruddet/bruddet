import React from "react";
import { useState } from "react";
import PurpleDot from "~/assets/PurpleDot";
import { createTexts, useTranslation } from "~/utils/i18n";

type Props = {
  bgColor?: string;
};

export function NewsletterMarquee({ bgColor }: Props) {
  const [displayText, setDisplayText] = useState(true);
  const { t } = useTranslation();
  return (
    <>
      <button
        className={`overflow-x-hidden sticky bottom-0 text-white border-t-2 hidden sm:flex ${
          displayText
            ? `border-t-white ${bgColor !== "bg-white" ? bgColor : "bg-black"}`
            : "border-t-[#24ED15] bg-[#24ED15]"
        }`}
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
      </button>
      <button className="overflow-x-hidden sticky bottom-0 text-white border-t-[#24ED15] border-t-2 flex sm:hidden ">
        <div className="text-black py-4 text-xl flex flex-col items-center w-full bg-[#24ED15]">
          <div className=" text-center font-serif">
            <p className="text-center">{t(texts.newsletterMobile)}</p>
          </div>
        </div>
      </button>
    </>
  );
}

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
});

export default NewsletterMarquee;
