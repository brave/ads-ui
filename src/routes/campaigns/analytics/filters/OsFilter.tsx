import { FilterProps } from "./FilterBar";
import { FilterButton } from "./FilterButton";
import { applySelection } from "./multi-filters";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";
import { MessageDescriptor } from "@lingui/core";

interface OsFilterEntry {
  label: MessageDescriptor;
  id: string;
  divider?: boolean;
}

const MENU_ITEMS: OsFilterEntry[] = [
  { id: "all", label: msg`All OS`, divider: true },
  { id: "android", label: msg`Android` },
  { id: "ios", label: msg`iOS` },
  { id: "linux", label: msg`Linux` },
  { id: "macos", label: msg`macOS` },
  { id: "windows", label: msg`Windows` },
];

export function OsFilter(props: FilterProps) {
  const { _ } = useLingui();
  const filteredOs = props.filters.os;

  const buttonLabel = !filteredOs
    ? _(msg`All OS`)
    : filteredOs.length === 1
      ? filteredOs[0]
      : `${filteredOs.length} OS`;

  return (
    <FilterButton
      label={buttonLabel}
      onChange={(item) => {
        props.onChange({
          ...props.filters,
          os: applySelection(props.filters.os, item.id),
        });
      }}
      menuItems={MENU_ITEMS.map((item) => ({ ...item, label: _(item.label) }))}
      itemSelectionState={(item) =>
        item.id === "all"
          ? "no-selection-state"
          : filteredOs && filteredOs.includes(item.id)
            ? "selected"
            : "unselected"
      }
    />
  );
}
