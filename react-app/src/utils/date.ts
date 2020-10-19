import dayjs, { Dayjs } from 'dayjs';

export function getWeeksOfYear(year: number) {
  // 计算一年的第一天
  const firstDay = dayjs(new Date(year, 0, 1)).startOf('y');
  // 计算一年的第一周的第一天
  const firstWeekDay = firstDay.subtract(Math.abs(1 - firstDay.day()), 'd');

  const weeks = [];
  let t = firstWeekDay.clone();
  while (t.year() <= year) {
    weeks.push({
      start: t.clone(),
      end: t.add(6, 'd'),
    });
    t = t.add(7, 'd');
  }

  return weeks;
}

export function get10Number(day: number) {
  return day >= 10 ? `${day}` : `0${day}`;
}

export function getWeekOfYear(date: Dayjs) {
  const weeks = getWeeksOfYear(date.year());
  let currentWeek = weeks.findIndex(
    (d) =>
      date.valueOf() >= d.start.valueOf() && date.valueOf() < d.end.valueOf()
  );
  if (currentWeek <= -1) {
    currentWeek = 0;
  }

  return currentWeek;
}
