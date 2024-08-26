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
      className={`sticky bottom-12 md:bottom-24 md:w-[100px] p-2 z-10 w-full flex flex-col ${textColor} text-center items-center md:items-start bg-red-400 text-lg lg:text-xl font-serif lg:left-32 2xl:left-1/4`}
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
