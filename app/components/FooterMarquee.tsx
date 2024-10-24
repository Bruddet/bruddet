import Dot from "~/assets/Dot";
import { createTexts, useTranslation } from "~/utils/i18n";
import { TFooterContent } from "./Footer";

type Props = {
  isHovering: boolean;
  pathname: string;
  footerContent: TFooterContent | undefined | null;
};

export const FooterMarquee = ({
  isHovering,
  pathname,
  footerContent,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {isHovering ? (
        <div className="w-full">
          <p>{footerContent?.hoverText ?? t(texts.newsletterText)}</p>
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
                  {footerContent?.text ?? t(texts.marqueeText)}
                </span>
                <Dot
                  color={
                    pathname?.includes("program") || pathname?.includes("meny")
                      ? "#182D39"
                      : "#D4FF26"
                  }
                />
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

const texts = createTexts({
  newsletterText: {
    nb: "Få ekslusiv info, billetter til redusert pris og andre tilbud! Meld deg på vårt nyhetsbrev",
    en: "Get exclusive info, tickets at reduced prices and other offers! Sign up for our newsletter!",
  },
  marqueeText: {
    nb: "Nyhetsbrev",
    en: "Newsletter",
  },
});
