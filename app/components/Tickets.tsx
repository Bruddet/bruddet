import { useTranslation } from "../utils/i18n";
import { DateTicket } from "./DateTicket";

export type DateTicketType = {
  date?: string | undefined;
  ticketUrl?: string | undefined;
  busTicketUrl?: string | undefined;
  eventTicketStatus?: number | undefined;
  busTicketStatus?: number | undefined;
};

type Props = {
  dateTickets: DateTicketType[] | null;
  textColor?: string;
  ticketInformation?: string | null;
};

export const Tickets = ({
  dateTickets,
  textColor,
  ticketInformation,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div id="tickets" className="flex flex-col">
      <h3 className={`text-3xl ${textColor} py-8`}>{t(texts.tickets)}</h3>
      <p className="text-basic">{ticketInformation}</p>
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
