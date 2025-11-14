import { FilterProps } from "./FilterBar";
import { FilterButton } from "./FilterButton";
import { useOsFilterParams } from "@/routes/campaigns/analytics/hooks";
import { applySelection } from "@/routes/campaigns/analytics/filters/multi-filters";

interface OsFilterEntry {
  label: string;
  id: string;
  divider?: boolean;
}

export interface LocalizedOsFilterEntry extends Omit<OsFilterEntry, "label"> {
  label: string;
}

const OS_FILTER_ITEMS: OsFilterEntry[] = [
  { id: "all", label: "All OS", divider: true },
  { id: "android", label: "Android" },
  { id: "ios", label: "iOS" },
  { id: "linux", label: "Linux" },
  { id: "macos", label: "macOS" },
  { id: "windows", label: "Windows" },
];

const osLookup = new Map<string, OsFilterEntry>(
  OS_FILTER_ITEMS.map((m) => [m.id, m]),
);

export function getOsFilter(
  id: string | null | undefined,
): LocalizedOsFilterEntry | undefined {
  const item = osLookup.get(id ?? "");
  return item ? { id: item.id, label: item.label } : undefined;
}

export function OsFilter(props: FilterProps) {
  const {
    isSelected,
    forceDefaultSelection,
    selectedMetrics,
    toggleMetric,
    removeMetric,
  } = useOsFilterParams();

  if (selectedMetrics.length === 0) {
    forceDefaultSelection();
    return null;
  }

  return (
    <FilterButton
      label={
        selectedMetrics?.length === 1
          ? selectedMetrics[0].label
          : `${selectedMetrics?.length} OS`
      }
      onChange={(item) => {
        const isAll = item.id === "all";
        if (isAll) {
          forceDefaultSelection(true);
        } else {
          removeMetric("all");
          toggleMetric(item);
        }
        const selection = applySelection(props.filters.os, item.id);
        props.onChange({
          ...props.filters,
          os: !isAll && selection?.length !== 0 ? selection : undefined,
        });
      }}
      menuItems={OS_FILTER_ITEMS.map((item) => ({
        ...item,
        label: item.label,
      }))}
      itemSelectionState={(item) => {
        if (item.id === "all") return "no-selection-state";
        return isSelected(item) ? "selected" : "unselected";
      }}
    />
  );
}
