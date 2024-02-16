import {
  getGridStringOperators,
  GridFilterInputValue,
  GridFilterItem,
} from "@mui/x-data-grid";
import { t } from "@lingui/macro";

export function stringFilterOperators() {
  return [
    {
      label: t`is not`,
      value: "not",
      getApplyFilterFn: (field: GridFilterItem) => (params: any) =>
        params.value !== field.value,
      InputComponentProps: { type: "string" },
      InputComponent: GridFilterInputValue,
    },
    ...getGridStringOperators(),
  ];
}
