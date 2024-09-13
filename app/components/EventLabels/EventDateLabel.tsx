import { useTranslation } from "~/utils/i18n";
import { formatDayAndDate } from "~/utils/dateAndTimeConverters";
import { formatDateOnly, getDateLabel } from ".";

type Props = {
  dateObj: DateObject[];
};

type DateObject = {
  date?: string | undefined;
  url?: string | undefined;
  _key?: string | undefined;
};

function EventDateLabel({ dateObj }: Props) {
  const { language } = useTranslation();
  const firstDate = dateObj[0].date ?? "";
  const lastdate = dateObj[dateObj.length - 1].date ?? "";
  const formattedDate = formatDayAndDate(firstDate, language);
  const datesOnlyFirst = formatDateOnly(firstDate);
  const datesOnlyLast = formatDateOnly(lastdate);
  const dateLabel = getDateLabel({
    dateObj,
    formattedDate,
    datesOnlyFirst,
    datesOnlyLast,
    firstDate,
    language,
  });

  return (
    <div className="mb-16 border p-2 border-black text-black inline-block italic">
      {dateLabel}
    </div>
  );
}

export default EventDateLabel;
