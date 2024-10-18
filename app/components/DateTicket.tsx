import { DateTicketType } from "./Tickets";
import { formatDayAndDate, formatTimestamp } from "../utils/dateAndTime";
import { useTranslation } from "../utils/i18n";
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from "~/styles/buttonConstants";

type Props = {
  dateTicket: DateTicketType;
  color?: string;
};

export const DateTicket = ({ dateTicket, color = "black" }: Props) => {
  const { language, t } = useTranslation();
  const formattedDate = formatDayAndDate(dateTicket.date!, language);
  const formattedTimestamp = formatTimestamp(dateTicket.date!, language);
  const status =
    dateTicket.eventTicketStatus == 2
      ? t(texts.fewLeft)
      : dateTicket.eventTicketStatus == 3
      ? t(texts.soldOut)
      : undefined;

  return (
    <div className={`flex flex-col gap-2 my-4 text-black`}>
      <p className="capitalize font-bold text-3xl">{formattedDate}</p>
      <p className="font-bold text-xl">{formattedTimestamp}</p>
      {status && <p>{status}</p>}
      <div className="flex gap-2">
        <button
          disabled={dateTicket.eventTicketStatus === 3}
          className={`min-w-36 md:w-52 h-14 ${primaryButtonClassName}`}
          onClick={() => window.open(dateTicket.ticketUrl, "_blank")}
        >
          <p className="font-bold">
            {dateTicket.eventTicketStatus == 3
              ? t(texts.soldOut).toLocaleUpperCase()
              : t(texts.buy).toLocaleUpperCase()}
          </p>
        </button>
        <button
          disabled={dateTicket.busTicketStatus === 3}
          className={`min-w-36 md:w-52 h-14 ${secondaryButtonClassName}`}
          onClick={() => window.open(dateTicket.busTicketUrl, "_blank")}
        >
          <p className="hidden md:block font-bold">
            {dateTicket.busTicketStatus == 3
              ? t(texts.soldOut).toLocaleUpperCase()
              : t(texts.busTicket).toLocaleUpperCase()}
          </p>
          <p className="block md:hidden font-bold">
            {dateTicket.busTicketStatus == 3
              ? t(texts.soldOut).toLocaleUpperCase()
              : t(texts.busTicketMobile).toLocaleUpperCase()}
          </p>
        </button>
      </div>
    </div>
  );
};

const texts = {
  buy: {
    en: "Buy",
    nb: "Kjøp",
  },
  busTicket: {
    en: "Bus ticket",
    nb: "Bussbillett",
  },
  busTicketMobile: {
    en: "Bus",
    nb: "Buss",
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
