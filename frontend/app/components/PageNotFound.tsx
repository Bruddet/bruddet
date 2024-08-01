import { useTranslation } from "../utils/i18n";
import { Link, useParams } from "@remix-run/react";

export default function PageNotFound() {
  const { t } = useTranslation();
  const params = useParams();
  return (
    <div className="h-screen bg-strongblue flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl ">{t(texts.notFound)}</h1>
      <p className="mt-4n ">{t(texts.notFoundText)}</p>
      <Link to={params.lang == "en" ? "/en" : "/"}>
        <button className="text-xl underline mt-6">
          {t(texts.backToMain)}
        </button>
      </Link>
    </div>
  );
}

const texts = {
  notFound: {
    en: "404 - OOPS! ",
    nb: "404 - OPS! ",
  },
  notFoundText: {
    en: "The page you are looking for does not exist",
    nb: "Siden du leter etter eksisterer ikke",
  },
  backToMain: {
    en: " Back to main page",
    nb: " Gå tilbake til hovedsiden",
  },
};
