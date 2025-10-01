import calendarJson from './calendar.json';

export interface DayData {
  day: number;
  weekday: string;
  weekday_dialect: string;
  celebration: string;
  aphorism: {
    title: string;
    content: string;
  };
}

export interface MonthData {
  name: string;
  dialect: string;
  days: DayData[];
}

export interface CalendarData {
  year: number;
  months: MonthData[];
}

export const calendarData: CalendarData = calendarJson as CalendarData;
