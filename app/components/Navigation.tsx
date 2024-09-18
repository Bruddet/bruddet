import { useTranslation } from "~/utils/i18n";
import GreenTriangle from "~/assets/GreenTriangle";
import { Link } from "@remix-run/react";

type Props = {
  lang: string | undefined;
  color?: string;
};

export const Navigation = ({ lang }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-row justify-center content-center w-full mt-4">
        <Link
          to={lang == "en" ? "/en/meny" : "/meny"}
          className="text-white w-1/5 absolute left-0 text-left px-8 py-2 rounded self-center font-serif text-2xl lg:text-4xl hidden md:flex flex-row content-start"
          aria-label={t(texts.menuText)}
        >
          <div className="self-center animate-horizontal-bounce-left ">
            <GreenTriangle direction="left" />
          </div>
          <div className="px-4">{t(texts.menuButton)}</div>
        </Link>
        <Link
          to={lang == "en" ? "/en/program" : "/program"}
          className="text-white w-1/5 px-8 absolute right-0 py-2 text-right rounded self-center font-serif text-2xl lg:text-4xl flex-row content-end hidden md:flex"
          aria-label={t(texts.programText)}
        >
          <div className="px-4 ml-auto">Program</div>
          <div className="self-center animate-horizontal-bounce-right">
            <GreenTriangle direction="right" />
          </div>
        </Link>
      </div>
      {/*<div className="flex md:hidden flex-row  w-full mt-4">
        <Link
          to={lang == "en" ? "/en/meny" : "/meny"}
          className="text-white w-1/2  text-left py-2 rounded self-center font-serif text-2xl lg:text-4xl flex flex-row content-start"
          aria-label={t(texts.menuText)}
        >
          <div className="self-center ml-auto animate-horizontal-bounce-left ">
            <GreenTriangle direction="left" />
          </div>
          <div className="px-4">{t(texts.menuButton)}</div>
        </Link>
        <Link
          to={lang == "en" ? "/en/program" : "/program"}
          className="text-white w-1/2 py-2 text-right rounded self-center font-serif text-2xl lg:text-4xl flex-row content-end flex"
          aria-label={t(texts.programText)}
        >
          <div className="px-4">Program</div>
          <div className="self-center animate-horizontal-bounce-right">
            <GreenTriangle direction="right" />
          </div>
        </Link>
      </div>*/}
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
