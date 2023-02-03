import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { parseISO, formatISO, addDays, startOfDay, endOfDay } from "date-fns";

export const defaultStartDate = () =>
  formatISO(
    addDays(
      zonedTimeToUtc(
        startOfDay(utcToZonedTime(Date.now(), "America/New_York")),
        "America/New_York"
      ),
      1
    )
  );

export const defaultEndDate = () =>
  formatISO(
    addDays(
      zonedTimeToUtc(
        endOfDay(utcToZonedTime(Date.now(), "America/New_York")),
        "America/New_York"
      ),
      1
    )
  );
