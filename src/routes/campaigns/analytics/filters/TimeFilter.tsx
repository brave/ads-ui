import { FilterProps } from "./FilterBar";
import { FilterButton } from "./FilterButton";
import { buildTimeFilters } from "./time-filters";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useTimeFilterParams } from "@/routes/campaigns/analytics/hooks";
export function TimeFilter(props: FilterProps) {
  const { _ } = useLingui();
  const menuItems = buildTimeFilters();

  const { selected, setSelected, forceDefaultBreakdownSelection } =
    useTimeFilterParams();

  if (!selected) {
    forceDefaultBreakdownSelection();
    return null;
  }

  return (
    <FilterButton
      label={selected?.label || _(msg`Custom`)}
      value={selected}
      onChange={(item) => {
        setSelected(item);
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
