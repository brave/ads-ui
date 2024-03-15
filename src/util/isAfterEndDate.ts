import dayjs from "dayjs";

export const isAfterEndDate = (end: string) => dayjs(end).isAfter();

export const isBeforeStartDate = (start: string) => dayjs(start).isBefore();
