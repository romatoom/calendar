const getCalendarData = (date) => {
  const calendarData = [];

  for (let d = 1; d <= 31; d++) {
    calendarData.push(d);
  }

  return calendarData;
};

export default getCalendarData;
