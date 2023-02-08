import { SortDirection, TableCell, TableSortLabel } from "@mui/material";
import { ColumnAccessor } from "./EnhancedTable";

interface EnhancedTableHeaderProps<T> {
  column: ColumnAccessor<T>;
  sortDirection: SortDirection;
  onSortClick: () => void;
}

export function EnhancedTableHeader<T>(props: EnhancedTableHeaderProps<T>) {
  return (
    <TableCell
      sortDirection={props.sortDirection}
      sx={props.column.sx}
      align={props.column.align}
    >
      {props.column.sortable ? (
        <TableSortLabel
          active={props.sortDirection !== false}
          direction={props.sortDirection || "asc"}
          onClick={props.onSortClick}
        >
          {props.column.title}
        </TableSortLabel>
      ) : (
        props.column.title
      )}
    </TableCell>
  );
}
