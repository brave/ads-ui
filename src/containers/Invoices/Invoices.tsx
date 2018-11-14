import { AppBar, Card, CardContent, CardHeader, Toolbar, Typography, withStyles } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { GetInvoices } from "../../actions";

import { styles } from "./Invoices.style";

import InvoiceList from "../../components/Invoices/InvoiceList/InvoiceList";

class Invoices extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.GetInvoices(this.props.auth);
  }

  public render() {

    const { classes, invoices, match } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">Invoices</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader />
          <CardContent className={classes.content}>
            <InvoiceList invoices={invoices} match={match}/>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  invoices: state.invoiceReducer.invoices,
  reports: state.reportReducer.reports,
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
  GetInvoices: (auth: any) => dispatch(GetInvoices(auth)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(Invoices));
