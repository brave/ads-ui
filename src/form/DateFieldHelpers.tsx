import dayjs, { Dayjs } from "dayjs";

const ADS_DEFAULT_TIMEZONE = "America/New_York";

export const defaultStartDate = (): string =>
  dayjs().tz(ADS_DEFAULT_TIMEZONE).startOf("day").add(3, "days").toISOString();

export const defaultEndDate = (): string =>
  dayjs().tz(ADS_DEFAULT_TIMEZONE).endOf("day").add(3, "days").toISOString();

export const twoDaysOut = (): Dayjs => dayjs().add(2, "day");
