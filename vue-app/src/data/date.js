import dayjs from 'dayjs';

export const CALENDAR_MIN_DATE = new Date(dayjs().year() - 3, 0, 1);
export const CALENDAR_MAX_DATE = new Date(dayjs().year() + 10, 11, 31);
