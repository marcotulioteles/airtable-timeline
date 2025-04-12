import { differenceInDays, parseISO } from "date-fns";
import { useCallback } from "react";

export const useTimelineHelpers = (minDate: Date) => {
  const getItemOffset = useCallback(
    (start: string) => differenceInDays(parseISO(start), minDate),
    [minDate]
  );

  const getItemSpan = useCallback(
    (start: string, end: string) =>
      differenceInDays(parseISO(end), parseISO(start)) + 1,
    []
  );

  return { getItemOffset, getItemSpan };
};
