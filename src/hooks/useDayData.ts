import { useMemo } from "react";
import { getDayData } from "@/services/calendarService";
import type { DayData } from "@/data/calendar";

/**
 * Custom hook to get day data for a specific date
 * Memoizes the result to avoid unnecessary recalculations
 * @param date - The date to get data for
 * @returns DayData with month dialect or null
 */
export const useDayData = (
  date: Date
): { day: DayData; monthDialect: string } | null => {
  return useMemo(() => {
    return getDayData(date);
  }, [date.getMonth(), date.getDate(), date.getFullYear()]);
};
