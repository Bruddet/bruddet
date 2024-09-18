import { getColor } from "~/utils/colorCombinations";
import { useTranslation } from "../utils/i18n";
import { DateTicket } from "./DateTicket";

export type DateTicketType = {
  date?: string | undefined;
  url?: string | undefined;
  status?: number | undefined;
};

type Props = {
  dateTickets: DateTicketType[];
  color?: string;
};

export const Tickets = ({ dateTickets, color = "black" }: Props) => {
  const { t } = useTranslation();

  const textColor = `text-${color}`;

  return (
    <div id="tickets" className="flex flex-col">
      <h2 className={`text-2xl ${textColor} font-sans py-8`}>
        {t(texts.tickets)}
      </h2>
      {dateTickets?.map((dateTicket: DateTicketType, index) => {
        return <DateTicket key={index} dateTicket={dateTicket} />;
      })}
    </div>
  );
};

const texts = {
  tickets: {
    en: "Tickets",
    nb: "Billetter",
  },
};
