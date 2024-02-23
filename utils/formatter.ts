export const formatDateToString = (val: string | Date): string => {
  /*
  Date -> dd.mm.yyyy
  */

  const date = new Date(val);

  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return `${day}.${month}.${year}`;
};

export const formatDateToRoute = (val: string | Date): string => {
  /*
  Date -> yyyy/mm/dd
  */

  const date = new Date(val);

  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return `${year}/${month}/${day}`;
};

export const stringToDateFormat = (val: string): Date => {
  /*
  dd.mm.yyyy -> Date
  */
  const arr = val.split(".").map(item => Number(item));

  if (arr.length !== 3) { return new Date(); }

  const date = new Date(arr[2], arr[1] - 1, arr[0]);

  return date;
};

export const formatStringToDate = (val: string): Date => {
  /*
  dd.mm.yyyy -> Date
  */
  if (!val) { return new Date(); }

  return stringToDateFormat(val);
};

export const formatStringToDateStrict = (val: string): Date | null => {
  /*
  dd.mm.yyyy -> Date | null
  */
  if (!val) { return null; }

  return stringToDateFormat(val);
};

export const capitalizeString = (str: string): string => {
  if (!str) { return ""; }

  if (typeof str !== "string") { return ""; }

  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};
