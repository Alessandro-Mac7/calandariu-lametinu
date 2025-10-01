import { calendarData, type DayData, type MonthData } from "@/data/calendar";

/**
 * Service layer for calendar data access
 * Provides clean, functional interface for calendar operations
 */

/**
 * Get day data for a specific date
 * @param date - The date to get data for
 * @returns DayData with month dialect or null if not found
 */
export const getDayData = (
  date: Date
): { day: DayData; monthDialect: string } | null => {
  const monthIndex = date.getMonth();
  const dayNumber = date.getDate();

  const monthData = calendarData.months[monthIndex];
  if (!monthData) return null;

  const dayData = monthData.days.find((d) => d.day === dayNumber);
  if (!dayData) return null;

  return {
    day: dayData,
    monthDialect: monthData.dialect,
  };
};

/**
 * Get all days for a specific month
 * @param monthIndex - Zero-based month index (0 = January)
 * @returns MonthData or null if not found
 */
export const getMonthData = (monthIndex: number): MonthData | null => {
  return calendarData.months[monthIndex] ?? null;
};

/**
 * Get all months
 * @returns Array of all months
 */
export const getAllMonths = (): MonthData[] => {
  return calendarData.months;
};

/**
 * Search days by celebration name
 * @param query - Search term
 * @returns Array of matching days with month context
 */
export const searchByCelebration = (
  query: string
): Array<{ day: DayData; monthName: string; monthDialect: string }> => {
  const searchTerm = query.toLowerCase();
  const results: Array<{
    day: DayData;
    monthName: string;
    monthDialect: string;
  }> = [];

  calendarData.months.forEach((month) => {
    month.days.forEach((day) => {
      if (day.celebration.toLowerCase().includes(searchTerm)) {
        results.push({
          day,
          monthName: month.name,
          monthDialect: month.dialect,
        });
      }
    });
  });

  return results;
};

/**
 * Get random day (for "surprise me" feature)
 * @returns Random day with month context
 */
export const getRandomDay = (): {
  day: DayData;
  monthDialect: string;
} | null => {
  const monthsWithDays = calendarData.months.filter((m) => m.days.length > 0);
  if (monthsWithDays.length === 0) return null;

  const randomMonth =
    monthsWithDays[Math.floor(Math.random() * monthsWithDays.length)];
  const randomDay =
    randomMonth.days[Math.floor(Math.random() * randomMonth.days.length)];

  return {
    day: randomDay,
    monthDialect: randomMonth.dialect,
  };
};

/**
 * Check if data exists for a given date
 * @param date - The date to check
 * @returns boolean indicating if data exists
 */
export const hasDataForDate = (date: Date): boolean => {
  return getDayData(date) !== null;
};
