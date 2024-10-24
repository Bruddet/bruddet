import {
  formatDayAndDate,
  formatTimestamp,
  getMonth,
} from "~/utils/dateAndTime";
import { EventGenre } from "sanity.types";
import { Label } from "./Label";
import { TranslationObject, useTranslation } from "~/utils/i18n";
import { ColorCombinations } from "~/sanity.types";
import { getColor } from "~/utils/colorCombinations";
import { primaryButtonClassName } from "~/styles/buttonConstants";

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
  colorCombination?: ColorCombinations | null;
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
  customLabels,
  colorCombination,
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
    dates.length === 1 && formattedTimestamp,
    duration,
    getGenre(),
  ];

  const handleScroll = () => {
    const target = document.getElementById("tickets");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { primaryTextColor, textBorderColor } = getColor(
    colorCombination || "creamBlue"
  );

  return (
    <>
      <div
        id="eventLabels"
        className="flex flex-wrap gap-4 md:float-start uppercase font-serif justify-start mx-auto"
      >
        {labels.map(
          (label, index) =>
            label &&
            label.length > 0 && (
              <Label
                key={index}
                borderColor={textBorderColor}
                textColor={primaryTextColor}
                label={label}
                fontWeight={"font-bold"}
              />
            )
        )}
        <button
          onClick={handleScroll}
          className={`px-2 ${primaryButtonClassName} w-36 h-10 border-box`}
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
