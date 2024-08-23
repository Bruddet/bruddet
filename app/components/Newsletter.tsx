import { useState } from "react";
import NewsletterForm from "./NewsletterForm";
import { useTranslation } from "../utils/i18n";

export default function Newsletter() {
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="py-8 w-4/5 lg:max-w-1/3 text-center font-serif">
      <p>
        {t(texts.blurb)}
        <button className="underline" onClick={() => setShowForm(true)}>
          {t(texts.signUp)}
        </button>
      </p>
      {showForm && <NewsletterForm setShowForm={setShowForm} />}
    </div>
  );
}

const texts = {
  blurb: {
    en: "Crush the problem of keeping up to date with what's happening. ",
    nb: "Knus problemet med å holde deg oppdatert på hva som skjer. ",
  },
  signUp: {
    en: "Sign up for our newsletter",
    nb: "Meld deg på vårt nyhetsbrev",
  },
};
