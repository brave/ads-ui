import dayjs from "dayjs";
import { t } from "@lingui/macro";

export interface TimeFilterEntry {
  label: string;
  id: string;
  from: dayjs.Dayjs | undefined;
  to: dayjs.Dayjs | undefined;
  divider?: boolean;
}

export function buildTimeFilters(
  minDate?: dayjs.Dayjs,
  maxDate?: dayjs.Dayjs,
): TimeFilterEntry[] {
  const now = dayjs().utc();
  const actualMaxDate = dayjs.min(maxDate ?? now, now);

  return [
    {
      label: t`All time`,
      id: "all-time",
      divider: true,
      from: undefined,
      to: undefined,
    },
    {
      label: t`Today`,
      id: "today",
      from: dayjs().utc().startOf("day"),
      to: undefined,
    },
    {
      label: t`Yesterday`,
      id: "yesterday",
      from: dayjs().utc().subtract(1, "day").startOf("day"),
      to: dayjs().utc().subtract(1, "day").endOf("day"),
    },
    {
      label: t`This week (Sun - Today)`,
      id: "this-week-sun-today",
      from: dayjs().utc().startOf("week"),
      to: undefined,
    },
    {
      label: t`Last 7 days`,
      id: "last-seven-days",
      from: dayjs().utc().subtract(7, "day").startOf("day"),
      to: undefined,
    },
    {
      label: t`Last week (Sun - Sat)`,
      id: "last-week-sun-sat",
      from: dayjs().utc().subtract(1, "week").startOf("week"),
      to: dayjs().utc().subtract(1, "week").endOf("week"),
    },
    {
      label: t`Last 14 days`,
      id: "last-fourteen-days",
      from: dayjs().utc().subtract(14, "day").startOf("day"),
      to: undefined,
    },
    {
      label: t`This month`,
      id: "this-month",
      from: dayjs().utc().startOf("month"),
      to: undefined,
    },
    {
      label: t`Last 30 days`,
      id: "last-thirty-days",
      from: dayjs().utc().subtract(30, "day").startOf("day"),
      to: undefined,
    },
    {
      label: t`Last month`,
      id: "last-month",
      from: dayjs().utc().subtract(1, "month").startOf("month"),
      to: dayjs().utc().subtract(1, "month").endOf("month"),
    },
    {
      id: "custom",
      label: t`Custom`,
      from: minDate ?? dayjs().subtract(1, "month"),
      to: actualMaxDate ?? now,
    },
  ];
}

export function getTimeFilter(
  id: string | undefined | null,
  minDate?: dayjs.Dayjs,
  maxDate?: dayjs.Dayjs,
): TimeFilterEntry | undefined {
  return buildTimeFilters(minDate, maxDate).find((filter) => filter.id === id);
}
