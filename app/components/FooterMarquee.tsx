import Dot from "~/assets/Dot";
import { createTexts, useTranslation } from "~/utils/i18n";

type Props = {
  isHovering: boolean;
  pathname: string;
  marqueeText: string;
  marqueeLink?:
    | { _ref: string; _type: "reference"; _weak?: boolean }
    | undefined;
};

export const FooterMarquee = ({
  isHovering,
  pathname,
  marqueeLink,
  marqueeText,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {isHovering ? (
        <div className="w-full">
          <p>{marqueeText}</p>
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
                  {marqueeText}
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
});
