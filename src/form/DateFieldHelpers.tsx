import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { addDays, endOfDay, formatISO, startOfDay } from "date-fns";

export const defaultStartDate = () =>
  formatISO(
    addDays(
      zonedTimeToUtc(
        startOfDay(utcToZonedTime(twoDaysOut(), "America/New_York")),
        "America/New_York"
      ),
      1
    )
  );

export const defaultEndDate = () =>
  formatISO(
    addDays(
      zonedTimeToUtc(
        endOfDay(utcToZonedTime(twoDaysOut(), "America/New_York")),
        "America/New_York"
      ),
      1
    )
  );

export const twoDaysOut = () => {
  const now = new Date();
  now.setDate(now.getDate() + 2);
  return now;
};
