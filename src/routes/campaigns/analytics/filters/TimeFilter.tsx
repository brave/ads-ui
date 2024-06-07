import dayjs from "dayjs";
import { FilterProps } from "./FilterBar";
import { FilterButton } from "./FilterButton";
import { buildTimeFilters } from "./time-filters";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export function TimeFilter(props: FilterProps) {
  const { _ } = useLingui();
  const menuItems = buildTimeFilters();

  const matches = (
    a: dayjs.Dayjs | undefined,
    b: string | undefined | null,
  ): boolean => {
    if (!a && !b) {
      return true;
    }

    if (!a || !b) {
      return false;
    }

    return a.isSame(b);
  };

  const selected = menuItems.find(
    (mi) =>
      matches(mi.from, props.filters.from) && matches(mi.to, props.filters.to),
  );

  return (
    <FilterButton
      label={selected?.label || _(msg`Custom`)}
      value={selected}
      onChange={(item) => {
        props.onChange({
          ...props.filters,
          from: item.from?.toISOString(),
          to: item.to?.toISOString(),
        });
      }}
      menuItems={menuItems}
    />
  );
}
