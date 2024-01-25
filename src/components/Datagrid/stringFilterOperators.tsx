import {
  getGridStringOperators,
  GridFilterInputValue,
  GridFilterItem,
} from "@mui/x-data-grid";

export function stringFilterOperators() {
  return [
    {
      label: "is not",
      value: "not",
      getApplyFilterFn: (field: GridFilterItem) => (params: any) =>
        params.value !== field.value,
      InputComponentProps: { type: "string" },
      InputComponent: GridFilterInputValue,
    },
    ...getGridStringOperators(),
  ];
}
