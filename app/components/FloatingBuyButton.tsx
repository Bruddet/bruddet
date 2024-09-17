import { useTranslation } from "../utils/i18n";

interface FloatingBuyButtonProps {
  handleScroll: () => void;
  textColor: string;
}

export function FloatingBuyButton({
  handleScroll,
  textColor,
}: FloatingBuyButtonProps) {
  const { t } = useTranslation();
  return (
    <button
      id="buyButton"
      className={`sticky flex flex-col ${textColor} text-center items-center md:items-start bg-red-400 text-lg lg:text-xl font-serif lg:left-32 2xl:left-1/4`}
      onClick={handleScroll}
    >
      {t(text.allEvents)}
    </button>
  );
}
const text = {
  allEvents: {
    en: "Buy ticket",
    nb: "Kjøp billett",
  },
};
