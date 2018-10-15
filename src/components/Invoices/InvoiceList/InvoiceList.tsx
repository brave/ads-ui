import {
  Card, CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";

import InvoiceItem from "../InvoiceItem/InvoiceItem";

import { styles } from "./InvoiceList.style";

class CreativeSetList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
    };
  }

  public handleChangePage = (event: any, page: number) => {
    this.setState({ page });
  }

  public handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  }

  public render() {
    const { classes, match } = this.props;
    let { invoices } = this.props;
    if (!invoices) {
      invoices = [];
    }
    const { rowsPerPage, page } = this.state;
    const listItems = invoices
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item: any) => {
        return (
          <InvoiceItem key={item.id} match={match} invoice={item} />
        );
      });
    return (
      <div className={classes.root}>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Balance
              </TableCell>
                  <TableCell>
                    Start Date
              </TableCell>
                  <TableCell>
                    End Date
              </TableCell>
              <TableCell>
                    Confirmations
              </TableCell>
                  <TableCell>
                    State
              </TableCell>
              <TableCell>
                    Paid At
              </TableCell>
              <TableCell>
                    Paid
              </TableCell>
                  <TableCell>
                    Action
              </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listItems}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={invoices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  invoices: state.invoiceReducer.invoices,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(CreativeSetList));
