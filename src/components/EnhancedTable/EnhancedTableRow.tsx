import { TableCell, TableRow } from "@mui/material";
import { ColumnAccessor } from "./EnhancedTable";

interface EnhancedTableRowProps<T> {
  columns: ColumnAccessor<T>[];
  row: T;
}

export function EnhancedTableRow<T>({
  columns,
  row,
}: EnhancedTableRowProps<T>) {
  return (
    <TableRow>
      {columns.map((c, idx) => (
        <TableCell key={idx} sx={c.sx} align={c.align}>
          {c.render(row)}
        </TableCell>
      ))}
    </TableRow>
  );
}
