import { useTranslation } from "../utils/i18n";
import { DateTicket } from "./DateTicket";

export type DateTicketType = {
  date?: string | undefined;
  url?: string | undefined;
  status?: number | undefined;
};

type Props = {
  dateTickets: DateTicketType[];
};

export const Tickets = ({ dateTickets }: Props) => {
  const { t } = useTranslation();
  return (
    <div id="tickets" className="flex flex-col">
      <h2 className="text-2xl text-white font-sans py-8">{t(texts.tickets)}</h2>
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
