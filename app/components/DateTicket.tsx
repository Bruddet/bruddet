import { DateTicketType } from "./Tickets";
import {
  formatDayAndDate,
  formatTimestamp,
} from "../utils/dateAndTimeConverters";
import { useTranslation } from "../utils/i18n";

type Props = {
  dateTicket: DateTicketType;
  color?: string;
};

export const DateTicket = ({ dateTicket, color = "black" }: Props) => {
  const { language, t } = useTranslation();
  const formattedDate = formatDayAndDate(dateTicket.date!, language);
  const formattedTimestamp = formatTimestamp(dateTicket.date!, language);
  const status =
    dateTicket.status == 2
      ? t(texts.fewLeft)
      : dateTicket.status == 3
      ? t(texts.soldOut)
      : undefined;

  const textColor = `text-${color}`;
  const borderColor = `border-${color}`;

  return (
    <div className={`flex flex-col gap-2 my-4 ${textColor}`}>
      <p className="capitalize text-2xl">{formattedDate}</p>
      <p>{formattedTimestamp}</p>
      {status && <p>{status}</p>}
      <button
        disabled={dateTicket.status === 3}
        className={`py-2 text-base w-32 border ${borderColor} disabled:opacity-65 enabled:hover:bg-white enabled:hover:text-black`}
        onClick={() => window.open(dateTicket.url, "_blank")}
      >
        {dateTicket.status == 3
          ? t(texts.soldOut).toLocaleUpperCase()
          : t(texts.buy).toLocaleUpperCase()}
      </button>
    </div>
  );
};

const texts = {
  buy: {
    en: "Buy",
    nb: "Kjøp",
  },
  soldOut: {
    en: "Sold out",
    nb: "Utsolgt",
  },
  fewLeft: {
    en: "Few tickets left",
    nb: "Få billetter igjen",
  },
};
