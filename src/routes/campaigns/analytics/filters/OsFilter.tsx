import { FilterProps } from "./FilterBar";
import { FilterButton } from "./FilterButton";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";
import { MessageDescriptor, i18n } from "@lingui/core";
import { useOsFilterParams } from "@/routes/campaigns/analytics/hooks";
import { applySelection } from "@/routes/campaigns/analytics/filters/multi-filters";

interface OsFilterEntry {
  label: MessageDescriptor;
  id: string;
  divider?: boolean;
}

export interface LocalizedOsFilterEntry extends Omit<OsFilterEntry, "label"> {
  label: string;
}

export const OS_FILTER_ITEMS: OsFilterEntry[] = [
  { id: "all", label: msg`All OS`, divider: true },
  { id: "android", label: msg`Android` },
  { id: "ios", label: msg`iOS` },
  { id: "linux", label: msg`Linux` },
  { id: "macos", label: msg`macOS` },
  { id: "windows", label: msg`Windows` },
];

const osLookup = new Map<string, OsFilterEntry>(
  OS_FILTER_ITEMS.map((m) => [m.id, m]),
);

export function getOsFilter(
  id: string | null | undefined,
): LocalizedOsFilterEntry | undefined {
  const item = osLookup.get(id ?? "");
  return item ? { id: item.id, label: i18n._(item.label) } : undefined;
}

export function OsFilter(props: FilterProps) {
  const { _ } = useLingui();
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
        label: _(item.label),
      }))}
      itemSelectionState={(item) => {
        if (item.id === "all") return "no-selection-state";
        return isSelected(item) ? "selected" : "unselected";
      }}
    />
  );
}
