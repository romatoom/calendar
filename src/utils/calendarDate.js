const PARTS_INDEXES = {
  year: 0,
  month: 1,
  day: 2,
};

const LOCALE = "en";

const getCalendarData = ({ month, year }) => {
  const calendarData = [];

  for (let d = 1; d <= 31; d++) {
    calendarData.push(d);
  }

  return calendarData;
};

const getNowDate = () => {
  return formatInnerDate(new Date());
};

const preparePartDate = (value) => {
  return value >= 10 ? `${value}` : `0${value}`;
};

const getDateFromDayMonthYear = ({ day, month, year }) => {
  return `${year}-${month}-${day}`;
};

/*
const getPartFromDate = (date, part) => {
  return date.split("-")[PARTS_INDEXES[part]];
};
*/

const getYearMonthDayFromDate = (date) => {
  const result = {};
  const splittedDate = date.split("-");

  for (const part in PARTS_INDEXES) {
    result[part] = splittedDate[PARTS_INDEXES[part]];
  }

  return result;
};

const formatInnerDate = (innerDate) => {
  const day = preparePartDate(innerDate.getDate());
  const month = preparePartDate(innerDate.getMonth());
  const year = innerDate.getFullYear();

  return getDateFromDayMonthYear({ day, month, year });
};

const monthFormatter = Intl.DateTimeFormat(LOCALE, {
  month: "long",
});

const weekDays = (locale = LOCALE) => {
  const startWeekIndex = new Intl.Locale(LOCALE).weekInfo.firstDay;
  const SHIFT = 4 + startWeekIndex;

  let date = new Date(0);

  return [0, 1, 2, 3, 4, 5, 6].map((index) => {
    date.setDate(index + SHIFT);
    return new Intl.DateTimeFormat(LOCALE, {
      weekday: "short",
    }).format(date);
  });
};

export {
  getNowDate,
  getCalendarData,
  getDateFromDayMonthYear,
  getYearMonthDayFromDate,
  monthFormatter,
  weekDays,
};
