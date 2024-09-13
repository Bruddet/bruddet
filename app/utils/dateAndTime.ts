export const weekdaysNorwegian = [
  "søndag",
  "mandag",
  "tirsdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lørdag",
];

export const weekdaysEnglish = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const monthsNorwegian = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const monthsEnglish = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const dateEndingsEnglish = ["st", "nd", "rd", "th"];

export function getEnglishDateEndings(day: number) {
  switch (true) {
    case [1, 21, 31].includes(day):
      return "st";
    case [2, 22].includes(day):
      return "nd";
    case [3, 23].includes(day):
      return "rd";
    default:
      return "th";
  }
}

function convertNumberToWeekday(number: number, language: string) {
  switch (language) {
    case "en":
      return weekdaysEnglish[number];
    case "nb":
      return weekdaysNorwegian[number];
  }
}

function convertNumberToMonth(number: number, language: string) {
  switch (language) {
    case "en":
      return monthsEnglish[number];
    case "nb":
      return monthsNorwegian[number];
  }
}

export function getWeekday(date: string, language: string) {
  const day = new Date(date).getDay();
  return convertNumberToWeekday(day, language);
}

export function getMonth(date: string, language: string) {
  const month = new Date(date).getMonth();
  return convertNumberToMonth(month, language);
}

export function formatTimestamp(date: string, language: string) {
  const hours = new Date(date).getHours();
  const minutes =
    (new Date(date).getMinutes() < 10 ? "0" : "") + new Date(date).getMinutes();
  switch (language) {
    case "en":
      return `${hours}:${minutes}`;
    case "nb":
      return `kl. ${hours}:${minutes}`;
    default:
      return `kl. ${hours}:${minutes}`;
  }
}

export function formatDayAndDate(date: string, language: string) {
  const d = new Date(date).getDate();
  const day = getWeekday(date, language);
  const month = getMonth(date, language);
  switch (language) {
    case "en":
      return `${day} ${month} ${d + getEnglishDateEndings(d)}`;
    case "nb":
      return `${day} ${d}.${month}`;
    default:
      return `${day} ${d}.${month}`;
  }
}
