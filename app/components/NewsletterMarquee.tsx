import React from "react";
import { useState } from "react";
import PurpleDot from "~/assets/PurpleDot";
import { useBackgroundColor } from "~/utils/backgroundColor";
import { createTexts, useTranslation } from "~/utils/i18n";

export function NewsletterMarquee() {
  const [displayText, setDisplayText] = useState(true);

  const { color } = useBackgroundColor();

  return (
    <>
      <button
        id="newsletter-marquee"
        className={`overflow-hidden hidden z-50 md:flex sticky bottom-0 text-black border-t-2  ${
          displayText
            ? `border-t-white ${color !== "bg-white" ? color : "bg-black"}`
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

  return (
    <>
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
    </>
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
});

export default NewsletterMarquee;
