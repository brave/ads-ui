import { FilterProps } from "./FilterBar";
import { FilterButton } from "./FilterButton";
import { buildTimeFilters } from "./time-filters";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useTimeFilterParams } from "@/routes/campaigns/analytics/hooks";
import dayjs from "dayjs";
import { DateRangePicker } from "@/components/Date/DateRangePicker";
import { Box } from "@mui/material";

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
    <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
      {selected.id === "custom" && (
        <DateRangePicker
          from={dayjs(props.filters.from) ?? null}
          to={dayjs(props.filters.to) ?? null}
          onFromChange={(from) =>
            props.onChange({ ...props.filters, from: from?.toISOString() })
          }
          onToChange={(to) =>
            props.onChange({ ...props.filters, to: to?.toISOString() })
          }
        />
      )}
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
    </Box>
  );
}
