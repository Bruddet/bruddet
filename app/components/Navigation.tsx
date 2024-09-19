import { useTranslation } from "~/utils/i18n";
import Triangle from "~/assets/Triangle";
import { Link, useLocation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  lang: string | undefined;
  color?: string;
};

export const Navigation = ({ lang }: Props) => {
  const location = useLocation();

  const [newsletterMarqueeHeight, setNewsletterMarqueeHeight] = useState(14);

  useEffect(() => {
    // remix is server-side rendering, so document can only be access on the client-side after the component has mounted
    setNewsletterMarqueeHeight(
      document.getElementById("newsletter-marquee")?.offsetHeight || 14
    );
    console.log(newsletterMarqueeHeight);
  }, []);

  const { t } = useTranslation();
  const pathsWithBlackText = ["/program", "/meny", "/en/program", "/en/meny"];

  const navigationButtonStyle = `${
    pathsWithBlackText.includes(location?.pathname)
      ? "text-black"
      : "text-white"
  } w-1/5 absolute px-8 py-2 rounded self-center font-serif text-2xl lg:text-4xl hidden flex-row`;

  const triangleColor = pathsWithBlackText.includes(location?.pathname)
    ? "black"
    : "#D4FF26";

  return (
    <>
      <div className="flex flex-row justify-center content-center w-full fixed inset-y-1/2">
        <Link
          to={lang == "en" ? "/en/meny" : "/meny"}
          className={`left-0 text-left px-8 py-2 md:flex content-start ${navigationButtonStyle}`}
          aria-label={t(texts.menuText)}
        >
          <div className={`self-center animate-horizontal-bounce-left`}>
            <Triangle color={triangleColor} direction="left" />
          </div>
          <div className="px-4 hover:underline">{t(texts.menuButton)}</div>
        </Link>
        <Link
          to={lang == "en" ? "/en/program" : "/program"}
          className={`right-0 py-2 text-right content-end md:flex ${navigationButtonStyle}`}
          aria-label={t(texts.programText)}
        >
          <div className="px-4 ml-auto hover:underline">Program</div>
          <div className="self-center animate-horizontal-bounce-right">
            <Triangle color={triangleColor} direction="right" />
          </div>
        </Link>
      </div>
    </>
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
