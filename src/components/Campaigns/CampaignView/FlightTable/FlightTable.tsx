import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "material-ui";
import * as React from "react";

class FlightTable extends React.Component<any, any> {
  public render() {
    const { flights } = this.props;
    const tableBodyRows = flights.map((item: any, index: number) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            {index}
          </TableCell>
          <TableCell>
            {item.startedAt}
          </TableCell>
          <TableCell>
            {item.endAt}
          </TableCell>
        </TableRow>
      );
    });
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Flight
                  </TableCell>
                <TableCell>
                  Start Date
                  </TableCell>
                <TableCell>
                  End Date
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBodyRows}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default FlightTable;
