import { DateRangePicker } from "@/components/Date/DateRangePicker";
import { useStickyState } from "@/hooks/useStickyState";
import { useTimeFilterParams } from "@/routes/campaigns/analytics/hooks";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { FilterProps } from "./FilterBar";
import { FilterButton } from "./FilterButton";
import { buildTimeFilters } from "./time-filters";

export function TimeFilter(props: FilterProps) {
  const [, setCustom] = useStickyState<string | undefined>(
    "custom-date",
    undefined,
  );
  const menuItems = buildTimeFilters();

  const { selected, setSelected, forceDefaultBreakdownSelection } =
    useTimeFilterParams();

  if (!selected) {
    forceDefaultBreakdownSelection();
    return null;
  }

  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
      {selected.id === "custom" && (
        <DateRangePicker
          from={dayjs(props.filters.from) ?? null}
          to={dayjs(props.filters.to) ?? null}
          onFromChange={(from) => {
            const filter = { to: props.filters.to, from: from?.toISOString() };
            setCustom(JSON.stringify(filter));
            props.onChange({ ...props.filters, ...filter });
          }}
          onToChange={(to) => {
            const filter = { to: to?.toISOString(), from: props.filters.from };
            setCustom(JSON.stringify(filter));
            props.onChange({ ...props.filters, ...filter });
          }}
        />
      )}
      <FilterButton
        label={selected?.label || "Custom"}
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
    </Box>
  );
}
