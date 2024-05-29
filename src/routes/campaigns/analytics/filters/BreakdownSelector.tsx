import { useBreakdownParams } from "../hooks";
import { BREAKDOWNS } from "../breakdowns";
import { FilterButton } from "./FilterButton";
import { Trans, useLingui } from "@lingui/react";

export function BreakdownSelector() {
  const { _ } = useLingui();
  const { selected, setSelected, forceDefaultBreakdownSelection } =
    useBreakdownParams();

  if (!selected) {
    forceDefaultBreakdownSelection();
    return null;
  }

  return (
    <FilterButton
      label={<Trans id={selected.label} />}
      menuItems={BREAKDOWNS.map((item) => ({ ...item, label: _(item.label) }))}
      onChange={setSelected}
      value={selected}
    />
  );
}
