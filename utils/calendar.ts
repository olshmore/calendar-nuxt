export interface ISelect {
  value: number;
  text: string;
}

type TFormat = "long"| "short"

const WEEK_DAYS = [1, 2, 3, 4, 5, 6, 7];

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const DEFAULT_LOCALE = "en-GB";

const FORMAT_LONG = "long";
const FORMAT_SHORT = "short";
const DATE_POSTFIX = "T00:00:00+00:00";

const UTC_TIME_ZONE = "UTC";

const year = (new Date()).getFullYear();

export const getWeekDayNames = (locale: string = DEFAULT_LOCALE, weekStart = 0): string[] => {
  const days = WEEK_DAYS.map((day) => {
    return new Intl.DateTimeFormat(locale, { weekday: FORMAT_SHORT, timeZone: UTC_TIME_ZONE })
      .format(new Date(`${year}-01-0${day}${DATE_POSTFIX}`))
      .slice(0, 3);
  });

  const beforeWeekStart = days.slice(0, weekStart);

  const afterWeekStart = days.slice(weekStart + 1, days.length);

  return [days[weekStart]].concat(...afterWeekStart).concat(...beforeWeekStart);
};

export const getMonths = (locale: string = DEFAULT_LOCALE, format: TFormat = FORMAT_SHORT): ISelect[] => {
  const formatter = new Intl.DateTimeFormat(locale, { month: format, timeZone: UTC_TIME_ZONE });

  const months = MONTHS.map((month) => {
    const mm = month < 10 ? `0${month}` : month;

    return new Date(`${year}-${mm}-01${DATE_POSTFIX}`);
  });
  return months.map((date, i) => {
    const month = formatter.format(date);

    return {
      text: month.charAt(0).toUpperCase() + month.substring(1),
      value: i
    };
  });
};

export const getYears = (yearRange: number[] | string[] = [1970, 2030], reverse?: boolean): ISelect[] => {
  const years: ISelect[] = [];

  for (let year = +yearRange[0]; year <= +yearRange[1]; year++) {
    years.push({ value: +year, text: `${year}` });
  }

  return reverse ? years.reverse() : years;
};
