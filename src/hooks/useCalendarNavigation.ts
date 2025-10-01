import { useState, useCallback } from "react";
import { addDays, subDays } from "date-fns";

/**
 * Custom hook for calendar date navigation with immutable date operations
 * @param initialDate - Starting date (defaults to today)
 * @returns Object with current date and navigation functions
 */
export const useCalendarNavigation = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  const goToNextDay = useCallback(() => {
    setCurrentDate((prev) => addDays(prev, 1));
  }, []);

  const goToPreviousDay = useCallback(() => {
    setCurrentDate((prev) => subDays(prev, 1));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
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
