import dayjs from "dayjs";
import { t } from "@lingui/macro";

export interface TimeFilterEntry {
  label: string;
  id: string;
  from: dayjs.Dayjs | undefined;
  to: dayjs.Dayjs | undefined;
  divider?: boolean;
}

export function buildTimeFilters(): TimeFilterEntry[] {
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
      label: t`Last 7 days`,
      id: "last-seven-days",
      from: dayjs().utc().subtract(7, "day").startOf("day"),
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
      from: dayjs().utc().startOf("week"),
      to: undefined,
    },
  ];
}

export function getTimeFilter(
  id: string | undefined | null,
): TimeFilterEntry | undefined {
  return buildTimeFilters().find((filter) => filter.id === id);
}
