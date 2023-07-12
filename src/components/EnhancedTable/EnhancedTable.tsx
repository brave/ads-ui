import {
  Box,
  Grid,
  Skeleton,
  SortDirection,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import _ from "lodash";
import { ReactNode, useState } from "react";
import { EnhancedTableHeader } from "./EnhancedTableHeader";
import { EnhancedTableRow } from "./EnhancedTableRow";
import { FilterInput } from "./FilterInput";
import { CellValueRenderer, StandardRenderers } from "./renderers";
import { SxProps } from "@mui/system";

export type CellValue = string | string[] | number | boolean | undefined | null;

export interface ColumnDescriptor<T> {
  // text title to be shown in header
  title: string;

  // how to obtain the raw cell value from the row
  // this is used both to pass to a CellValueRenderer, and used for
  // filtering and sorting
  value: (row: T) => CellValue;

  // how to convert the raw cell value into a react node
  //  default: StandardRenderers.string
  renderer?: CellValueRenderer;

  // in some cases rendering a cell is not just a matter of taking the value and presenting it.
  // for example, rendering a link typically requires the cell value and also the id.
  // so an extendedRenderer, if defined, is used instead, which has access to the full row,
  // but is less genericisable.
  extendedRenderer?: undefined | ((row: T) => ReactNode);

  // is this column sortable?
  //  default: true
  sortable?: boolean;

  // style to apply to this column's header and cells
  //  use this to e.g. make fixed width using maxWidth or width
  sx?: SxProps;

  // default left
  align?: TableCellProps["align"];
}

interface EnhancedTableProps<T> {
  rows: T[] | undefined;
  columns: ColumnDescriptor<T>[];
  // defaults to 0
  initialSortColumn?: number;
  initialSortDirection?: SortDirection;
  initialRowsPerPage?: 5 | 10 | 25 | 100 | -1;

  additionalFilters?: ReactNode;
  filterable?: boolean;
}

// internally, we use a column accessor rather than the descriptor directly.
// This has default values populated and some helper methods
export interface ColumnAccessor<T>
  extends Pick<ColumnDescriptor<T>, "title" | "sx" | "align"> {
  sortable: boolean;
  render: (r: T) => React.ReactNode;
  getSortValue: (r: T) => string | number | undefined;
  matchesFilter: (r: T, filter: string) => boolean;
}

function mkColumnAccessor<T>(
  descriptor: ColumnDescriptor<T>,
): ColumnAccessor<T> {
  const {
    title,
    value,
    renderer = StandardRenderers.string,
    extendedRenderer,
    sortable = true,
    sx,
    align,
  } = descriptor;
  return {
    title,
    sortable,
    sx,
    align,
    render: (row) => {
      return extendedRenderer ? extendedRenderer(row) : renderer(value(row));
    },
    getSortValue: (row) => {
      const v = value(row);
      if (_.isString(v)) {
        return v.toLowerCase().trim();
      }
      if (_.isNumber(v)) {
        return v;
      }
      if (_.isBoolean(v)) {
        return v ? 1 : 0;
      }
      return undefined;
    },
    matchesFilter: (row, filter) => {
      const columnValue = value(row);
      return (
        _.isString(columnValue) && columnValue.toLowerCase().includes(filter)
      );
    },
  };
}

const LoadingSkeleton: React.FC<{ cols: number; rows: number }> = ({
  cols,
  rows,
}) => {
  return (
    <>
      {_.times(rows, (idx) => (
        <TableRow key={idx}>
          {_.times(cols, (idx2) => (
            <TableCell key={idx2}>
              <Skeleton variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export function EnhancedTable<T>(props: EnhancedTableProps<T>) {
  const [order, setOrder] = useState<SortDirection>(
    props.initialSortDirection ?? "asc",
  );
  const [orderBy, setOrderBy] = useState<number>(props.initialSortColumn ?? 0);
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    props.initialRowsPerPage ?? 25,
  );

  const { rows } = props;

  const columns = props.columns.map(mkColumnAccessor);

  const processSortUpdate = (col: number) => {
    if (orderBy === col) {
      setOrder((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(col);
      setOrder("asc");
      setPage(0);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterUpdate = (newFilter: string) => {
    if (!_.isEmpty(newFilter)) {
      setPage(0);
    }
    setFilter(newFilter.toLowerCase());
  };

  const matchesFilter = (row: T) => {
    if (_.isEmpty(filter)) return true;
    return _.some(columns, (c) => c.matchesFilter(row, filter));
  };

  const filteredRows = _(rows)
    .filter((r) => matchesFilter(r))
    .orderBy((r) => columns[orderBy].getSortValue(r), order)
    .valueOf();

  const data =
    rowsPerPage === -1
      ? filteredRows
      : filteredRows.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        );

  return (
    <Stack spacing={3}>
      <Grid container>
        <Grid item sm={8} xs={12}>
          <Box>{props.additionalFilters}</Box>
        </Grid>
        {props.filterable !== false && (
          <Grid item sm={4} xs={12}>
            <FilterInput filter={filter} setFilter={handleFilterUpdate} />
          </Grid>
        )}
      </Grid>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((c, idx) => (
                <EnhancedTableHeader
                  key={idx}
                  column={c}
                  sortDirection={orderBy === idx ? order : false}
                  onSortClick={() => processSortUpdate(idx)}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {_.isNil(rows) ? (
              <LoadingSkeleton
                cols={columns.length}
                rows={rowsPerPage > 0 ? rowsPerPage : 20}
              />
            ) : (
              data.map((r, idx) => (
                // TODO: key here should be the idenfier of the row
                <EnhancedTableRow key={idx} columns={columns} row={r} />
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  100,
                  { value: -1, label: "All" },
                ]}
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Stack>
  );
}
