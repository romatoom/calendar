const PARTS_INDEXES = {
  year: 0,
  month: 1,
  day: 2,
};

const LOCALE = "ru";

const getCalendarData = ({ month, year }, locale) => {
  const calendarData = [];

  const monthStartWeekDay = getWeekDayOfMonthStart({ month, year }, locale);
  const monthEndWeekDay = getWeekDayOfMonthEnd({ month, year }, locale);

  const countDaysBeforeFirstDay = weekDays(locale).indexOf(monthStartWeekDay);
  const countDaysAfterLastDay = 6 - weekDays(locale).indexOf(monthEndWeekDay);

  const countDaysInPreviousMonth = getCountDaysOfMonth(
    prevMonthData({ month, year })
  );

  for (let d = 0; d < countDaysBeforeFirstDay; d++) {
    calendarData.unshift({ day: countDaysInPreviousMonth - d, enabled: false });
  }

  const countDaysOfMonth = getCountDaysOfMonth({
    month,
    year,
  });

  for (let d = 1; d <= countDaysOfMonth; d++) {
    calendarData.push({ day: d, enabled: true });
  }

  for (let d = 1; d <= countDaysAfterLastDay; d++) {
    calendarData.push({ day: d, enabled: false });
  }

  return calendarData;
};

const getNowDate = () => {
  return formatInnerDate(new Date());
};

function getWeekDayOfMonthStart({ month, year }, locale = LOCALE) {
  const firstMonthDay = new Date(year, month - 1, 1);
  return weekDayFormatter(locale).format(firstMonthDay);
}

function getWeekDayOfMonthEnd({ month, year }, locale = LOCALE) {
  const endMonthDay = new Date(
    year,
    month - 1,
    getCountDaysOfMonth({ month, year })
  );
  return weekDayFormatter(locale).format(endMonthDay);
}

function getCountDaysOfMonth({ month, year }) {
  let date = new Date(year, month, 0);
  return date.getDate();
}

const preparePartDate = (value) => {
  return value >= 10 ? `${value}` : `0${value}`;
};

const getDateFromDayMonthYear = ({ day, month, year }) => {
  if (!(day && month && year)) return "";
  return `${year}-${preparePartDate(month)}-${preparePartDate(day)}`;
};

function prevMonthData({ month, year }) {
  let date = new Date();
  date.setFullYear(year);
  date.setMonth(month - 2);
  return { month: date.getMonth() + 1, year: date.getFullYear() };
}

function nextMonthData({ month, year }) {
  let date = new Date();
  date.setFullYear(year);
  date.setMonth(month);
  return { month: date.getMonth() + 1, year: date.getFullYear() };
}

/*
const getPartFromDate = (date, part) => {
  return date.split("-")[PARTS_INDEXES[part]];
};
*/

const getYearMonthDayFromDate = (date) => {
  const result = {};
  const splittedDate = date.split("-");

  for (const part in PARTS_INDEXES) {
    result[part] = parseInt(splittedDate[PARTS_INDEXES[part]]);
  }

  return result;
};

const formatInnerDate = (innerDate) => {
  const day = innerDate.getDate();
  const month = innerDate.getMonth() + 1;
  const year = innerDate.getFullYear();

  return getDateFromDayMonthYear({ day, month, year });
};

const monthFormatter = (locale = LOCALE) => {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
  });
};

function weekDayFormatter(locale = LOCALE) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
  });
}

function firstWeekDayIndex(locale = LOCALE) {
  return new Intl.Locale(locale).weekInfo.firstDay;
}

function weekDays(locale = LOCALE) {
  const startWeekIndex = firstWeekDayIndex(locale);
  const SHIFT = 4 + startWeekIndex;

  let date = new Date(0);

  return [0, 1, 2, 3, 4, 5, 6].map((index) => {
    date.setDate(index + SHIFT);
    return weekDayFormatter(locale).format(date);
  });
}

export {
  getNowDate,
  getCalendarData,
  getDateFromDayMonthYear,
  getYearMonthDayFromDate,
  monthFormatter,
  weekDays,
  prevMonthData,
  nextMonthData,
};
