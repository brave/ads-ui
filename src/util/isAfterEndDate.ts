import { isPast, parseISO } from "date-fns";

export const isAfterEndDate = (end: string) => isPast(parseISO(end));
