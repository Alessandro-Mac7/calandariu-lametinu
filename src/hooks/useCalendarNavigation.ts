import { useState, useCallback } from "react";
import { addDays, subDays } from "date-fns";

/**
 * Get today's date only if current year is 2026, otherwise return Jan 1, 2026
 */
const getTodayIn2026 = (): Date => {
  const now = new Date();
  if (now.getFullYear() === 2026) {
    return now;
  }
  // Not in 2026 yet, default to first day of calendar
  return new Date(2026, 0, 1);
};

/**
 * Custom hook for calendar date navigation with immutable date operations
 * @param initialDate - Starting date (defaults to today in 2026)
 * @returns Object with current date and navigation functions
 */
export const useCalendarNavigation = (initialDate: Date = getTodayIn2026()) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  const goToNextDay = useCallback(() => {
    setCurrentDate((prev) => addDays(prev, 1));
  }, []);

  const goToPreviousDay = useCallback(() => {
    setCurrentDate((prev) => subDays(prev, 1));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(getTodayIn2026());
  }, []);

  const goToDate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  return {
    currentDate,
    goToNextDay,
    goToPreviousDay,
    goToToday,
    goToDate,
  };
};
