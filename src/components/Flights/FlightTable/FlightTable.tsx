import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from "material-ui";
import * as moment from "moment";
import * as React from "react";

import { styles } from "./FlightTable.style";

class FlightTable extends React.Component<any, any> {
  public render() {
    const { flights, classes } = this.props;
    const tableBodyRows = flights.map((item: any, index: number) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            {index}
          </TableCell>
          <TableCell>
            {moment(item.startedAt).format("DD-MM-YYYY")}
          </TableCell>
          <TableCell>
            {moment(item.endAt).format("DD-MM-YYYY")}
          </TableCell>
          <TableCell>
            {item.active.toString()}
          </TableCell>
        </TableRow>
      );
    });
    return (
      <div className={classes.root}>
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
              <TableCell>
                Active
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBodyRows}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(FlightTable);
