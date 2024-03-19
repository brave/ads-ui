import dayjs from "dayjs";

export const isDateInThePast = (end: string) => dayjs().isAfter(end);

export const isDateInTheFuture = (start: string) => dayjs().isBefore(start);
