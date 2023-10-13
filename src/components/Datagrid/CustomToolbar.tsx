import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export function CustomToolbar({ children }: PropsWithChildren) {
  return (
    <GridToolbarContainer>
      {children}
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <Box flex={1} />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}
