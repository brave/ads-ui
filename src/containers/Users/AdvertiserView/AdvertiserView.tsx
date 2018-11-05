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
import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { GetInvoices, UpdateAdvertisers } from "../../../actions";

import AdvertiserForm from "../../../components/Advertisers/AdvertiserForm/Advertiser-form";
import InvoiceList from "../../../components/Invoices/InvoiceList/InvoiceList";

import { styles } from "./AdvertiserView.style";

class AdvertiserView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      unlock: false,
    };
  }

  public componentDidMount() {
    const id = this.props.match.params.id;
    const user = _.find(this.props.users, (item) => {
      return item.id === id;
    });
    this.props.GetInvoices(this.props.auth, user.id);

  }

  public render() {
    const { classes, match, auth, update, advertisers, invoices, users } = this.props;
    const { unlock } = this.state;
    const id = match.params.id;
    const advertiserId = match.params.advertiserId;
    const user = _.find(users, (item) => {
      return item.id === id;
    });
    const advertiser = _.find(advertisers, (item) => {
      return item.id === advertiserId;
    });
    const switchLock = () => {
      this.setState({
        unlock: !unlock,
      });
    };
    const handleSubmit = async (value: any, e: Event) => {
      const userId = user.id;
      const values = value;
      values.id = advertiser.id;
      values.mailingAddress = {
        city: values.city,
        country: values.country,
        state: values.state,
        street1: values.street1,
        street2: values.street2,
        zipcode: values.zipcode,
      };
      values.billingAddress = values.mailingAddress;
      values.state = value.ad_state;
      await update(values, auth, userId);
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
            <Typography variant="h5">{advertiser.name}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Detail" action={getLockButton()} />
          <CardContent className={classes.content}>
            <AdvertiserForm auth={auth} advertiser={advertiser} unlock={unlock} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
        <Card className={classes.infoCard}>
          <CardHeader title="Invoices" />
          <CardContent className={classes.content}>
            <InvoiceList invoices={invoices} match={match} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
  invoices: state.invoiceReducer.invoices,
  users: state.userReducer.users,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetInvoices: (auth: any, userId: string) => dispatch(GetInvoices(auth, userId)),
  update: (value: any, auth: any, userId: string) => dispatch(UpdateAdvertisers(value, auth, userId)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdvertiserView));
