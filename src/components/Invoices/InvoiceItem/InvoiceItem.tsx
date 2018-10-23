import { Icon, IconButton, TableCell, TableRow, withStyles } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";

import { styles } from "./InvoiceItem.style";

class InvoiceItem extends React.Component<any, any> {
  public render() {
    const { classes, invoice, match } = this.props;
    return (
      <TableRow className={classes.table}>
        <TableCell>
          <div>{invoice.balance}BAT</div>
        </TableCell>
        <TableCell>
          <div>{invoice.startDate}</div>
        </TableCell>
        <TableCell>
          <div>{invoice.endDate}</div>
        </TableCell>
        <TableCell>
          <div>{invoice.confirmationCount}</div>
        </TableCell>
        <TableCell>
          <div>{invoice.state}</div>
        </TableCell>
        <TableCell>
          <div>{invoice.paidAt}</div>
        </TableCell>
        <TableCell>
          <div>{invoice.paid}</div>
        </TableCell>
        <TableCell>
          <Link className={classes.viewButton} to={`${match.url}/invoices/${invoice.id}`}>
            <IconButton color="primary">
              <Icon>list</Icon>
            </IconButton>
          </Link>
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(InvoiceItem);
