import dayjs from "dayjs";

export const isNowAfterDate = (end: string) => dayjs().isAfter(end);

export const isNowBeforeDate = (start: string) => dayjs().isBefore(start);
