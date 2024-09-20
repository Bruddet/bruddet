import { createTexts, useTranslation } from "../utils/i18n";

type Props = {
  handleScroll: () => void;
};

export default function BuyButtonFooter({ handleScroll }: Props) {
  let textcolor = "black";
  const { t } = useTranslation();

  return (
    <footer
      id="buyButton"
      className={`py-6 flex flex-row justify-center align-middle gap-10 w-full bottom-0 sticky border-t border-${textcolor} text-${textcolor} bg-red-400 font-serif text-2xl `}
    >
      <button className="hover:underline" onClick={handleScroll}>
        {t(text.buy).toUpperCase()}
      </button>
    </footer>
  );
}

const text = {
  buy: {
    en: "Buy ticket",
    nb: "Kjøp billett",
  },
};
