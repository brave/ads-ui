import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { UpdateInvoices } from "../../../actions";

import InvoiceForm from "../../../components/Invoices/InvoiceForm/InvoiceForm";

import { styles } from "./InvoiceView.style";

class CreativesView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render() {
    const { classes, match, invoices, update, auth } = this.props;
    const { unlock } = this.state;
    const invoiceId = match.params.invoiceId;
    const invoice = _.find(invoices, (item) => {
      return item.id === invoiceId;
    });
    const switchLock = () => {
      if (invoice.state !== "paid") {
        this.setState({
          unlock: !unlock,
        });
      }
    };
    const handleSubmit = async (value: any, e: Event) => {
      const userId = match.params.userId;
      value.paid = parseFloat(value.paid);
      await update(value, auth, userId);
    };
    const getLockButton = () => {
      if (!unlock) {
        return (
          <IconButton onClick={switchLock} color="primary">
            <Icon>lock</Icon>
          </IconButton>
        );
      } else {
        return (
          <IconButton onClick={switchLock} color="primary">
            <Icon>lock_open</Icon>
          </IconButton>
        );
      }
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">{invoice.createdAt}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Detail" action={getLockButton()} />
          <CardContent className={classes.content}>
            <InvoiceForm invoice={invoice} unlock={unlock} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  invoices: state.invoiceReducer.invoices,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  update: (invoice: any, auth: any, userId: string) => dispatch(UpdateInvoices(invoice, auth, userId)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreativesView));
