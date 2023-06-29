import { isFuture, isPast, parseISO } from "date-fns";

export const isAfterEndDate = (end: string) => isPast(parseISO(end));

export const isBeforeStartDate = (start: string) => isFuture(parseISO(start));
