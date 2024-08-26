import { useTranslation } from "../utils/i18n";
import { useNavigate } from "@remix-run/react";

export default function NoTranslation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="h-screen bg-strongblue flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl">{t(texts.notFound)}</h1>
      <p className="mt-4n">{t(texts.notFoundText)}</p>
      <button onClick={goBack} className="text-xl underline mt-6">
        {t(texts.goBack)}
      </button>
    </div>
  );
}

const texts = {
  notFound: {
    en: "404 - OOPS! ",
    nb: "404 - OPS! ",
  },
  notFoundText: {
    en: "The page you are looking for does not exist in English",
    nb: "Siden du leter etter eksisterer ikke på norsk",
  },
  goBack: {
    en: "Return to previous page",
    nb: "Gå tilbake til forrige side",
  },
};
