import {
  formatDayAndDate,
  formatTimestamp,
  getMonth,
} from "~/utils/dateAndTime";
import { EventGenre } from "sanity.types";
import { Label } from "./Label";
import { TranslationObject, useTranslation } from "~/utils/i18n";

type DatesLabelProps = {
  dates: DateObject[];
  borderColor?: string | undefined;
  textColor?: string | undefined;
  fontStyle?: string;
  borderStyle?: string;
};

type DateObject = {
  date?: string | undefined;
  url?: string | undefined;
  _key?: string | undefined;
};

type EventLabelsProps = {
  dates: DateObject[];
  primaryText?: string;
  secondaryBgColor?: string;
  secondaryBorder?: string;
  textColor?: string;
  textColorBorder?: string;
  genre?: EventGenre | null;
  customLabels: null | string[];
  duration?: string | null;
};

export function formatDateOnly(dateString: string): string {
  const d = dateString.split("T")[0];
  const day = d.split("-");
  return day[day.length - 1];
}

type LabelProps = {
  dates: DateObject[];
  formattedDate: string;
  datesOnlyFirst: string;
  datesOnlyLast: string;
  firstDate: string;
  language: string;
  t?: (text: TranslationObject) => string;
};

export const getDateLabel = ({
  dates,
  formattedDate,
  datesOnlyFirst,
  datesOnlyLast,
  firstDate,
  language,
  t,
}: LabelProps) => {
  if (dates.length === 1) {
    return formattedDate.toUpperCase();
  }

  if (
    dates[dates.length - 1].date?.split("T")[0] === dates[0].date?.split("T")[0]
  ) {
    return formattedDate.toUpperCase();
  }

  return `${
    t ? t(texts.plays).toUpperCase() : ""
  } ${datesOnlyFirst}.- ${datesOnlyLast}. ${getMonth(
    firstDate,
    language
  )?.toLocaleUpperCase()}`;
};

export const EventLabels = ({
  dates,
  genre,
  primaryText,
  secondaryBgColor,
  secondaryBorder,
  textColor,
  textColorBorder,
  customLabels,
  duration,
}: EventLabelsProps) => {
  const { language, t } = useTranslation();

  const firstDate = dates[0].date ?? "";
  const lastdate = dates[dates.length - 1].date ?? "";
  const formattedTimestamp = formatTimestamp(firstDate, language);
  const formattedDate = formatDayAndDate(firstDate, language);
  const datesOnlyFirst = formatDateOnly(firstDate);
  const datesOnlyLast = formatDateOnly(lastdate);

  const dateLabel = getDateLabel({
    dates,
    formattedDate,
    datesOnlyFirst,
    datesOnlyLast,
    firstDate,
    language,
    t,
  });

  const genreMap = {
    en: {
      Konsert: genres.konsert.en,
      Skuespill: genres.skuespill.en,
    },
    nb: {
      Konsert: genres.konsert.nb,
      Skuespill: genres.skuespill.nb,
    },
  };

  const getGenre = () => {
    return genre && genre.length > 0
      ? genreMap[language]?.[genre]?.toUpperCase()
      : "";
  };

  const labels = [
    ...(customLabels ?? []),
    dateLabel,
    formattedTimestamp,
    duration,
    getGenre(),
  ];

  const handleScroll = () => {
    const target = document.getElementById("tickets");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        id="eventLabels"
        className="flex px-4 flex-wrap gap-4 md:float-start uppercase font-serif justify-start mx-auto"
      >
        {labels.map(
          (label, index) =>
            label &&
            label.length > 0 && (
              <Label
                key={index}
                borderColor={textColorBorder}
                textColor={textColor}
                label={label}
              />
            )
        )}
        <button
          onClick={handleScroll}
          className={`p-2 ${secondaryBorder} ${secondaryBgColor} ${primaryText} font-bold `}
        >
          {t(texts.buyTicket).toUpperCase()}
        </button>
      </div>
    </>
  );
};

export const DatesLabel = ({
  dates,
  borderColor,
  textColor,
  fontStyle,
  borderStyle,
}: DatesLabelProps) => {
  const { language } = useTranslation();
  const firstDate = dates[0].date ?? "";
  const lastdate = dates[dates.length - 1].date ?? "";
  const formattedDate = formatDayAndDate(firstDate, language);
  const datesOnlyFirst = formatDateOnly(firstDate);
  const datesOnlyLast = formatDateOnly(lastdate);
  const dateLabel = getDateLabel({
    dates,
    formattedDate,
    datesOnlyFirst,
    datesOnlyLast,
    firstDate,
    language,
  });

  return (
    <Label
      label={dateLabel}
      textColor={textColor}
      borderColor={borderColor}
      fontStyle={fontStyle}
      borderStyle={borderStyle}
    />
  );
};

const texts = {
  plays: {
    en: "Performs",
    nb: "Spilles",
  },
  buyTicket: {
    en: "Buy ticket",
    nb: "Kjøp billett",
  },
};
const genres = {
  konsert: {
    en: "Concert",
    nb: "Konsert",
  },
  skuespill: {
    en: "Play",
    nb: "Skuespill",
  },
};
