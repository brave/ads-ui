import dayjs, { Dayjs } from "dayjs";

interface TimeFilterEntry {
  label: string;
  id: string;
  from: Dayjs | undefined;
  to: Dayjs | undefined;
  divider?: boolean;
}

export function buildTimeFilters(
  baseDate: Dayjs = dayjs.utc(),
  minDate: Dayjs = baseDate.subtract(3, "month"),
  maxDate: Dayjs = baseDate,
): TimeFilterEntry[] {
  const buildFilterForMonth = (dateInMonth: Dayjs) => ({
    label: dateInMonth.format("MMMM YYYY"),
    id: dateInMonth.format("YYYY-MM"),
    from: dateInMonth.startOf("month"),
    to: dateInMonth.endOf("month"),
  });

  // build the per-month entries from minDate to maxDate
  let currentMonthFilter = minDate;

  // never count beyond the "baseDate" (usually "now" in the UI context)
  const actualMaxDate = dayjs.min(maxDate, baseDate);

  const monthsFilters = [];
  while (currentMonthFilter.startOf("month").isBefore(actualMaxDate)) {
    monthsFilters.push(buildFilterForMonth(currentMonthFilter));
    currentMonthFilter = currentMonthFilter.add(1, "month");
  }

  return [
    {
      // eslint-disable-next-line lingui/no-unlocalized-strings
      label: "All time",
      id: "all-time",
      divider: true,
      from: undefined,
      to: undefined,
    },
    // TODO: dayjs has a separate localization process, should use it but address in a separate PR
    ...monthsFilters.reverse(),
  ];
}
