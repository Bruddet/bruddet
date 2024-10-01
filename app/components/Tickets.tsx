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
  dateTickets: DateTicketType[];
  textColor?: string;
};

export const Tickets = ({ dateTickets, textColor }: Props) => {
  const { t } = useTranslation();

  return (
    <div id="tickets" className="flex flex-col">
      <h3 className={`text-3xl ${textColor} py-8`}>{t(texts.tickets)}</h3>
      <p className="text-sm">
        Litt info om det med bussbilletter. Lorem ipsum dolor sit amet
        consectetur. Ridiculus venenatis felis gravida bibendum eget vel sed
        consequat sem.{" "}
      </p>
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
