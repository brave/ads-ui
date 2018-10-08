import { AppBar, Card, CardContent, Toolbar, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CreateAdvertisers } from "../../../actions";
import AdvertiserForm from "../AdvertiserForm/Advertiser-form";

import { styles } from "./AdvertiserNew.style";

class AdvertiserNew extends React.Component<any, any> {
  public render() {
    const { classes, create, auth, history, match } = this.props;
    const handleSubmit = async (value: any) => {
      const userId = match.params.id;
      const values = value;
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
      values.agreed = true;
      const result = await create(values, auth, userId);
      const url = match.url.replace("/new", "");
      history.push(`${url}/${result.id}`);
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">New Advertiser</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.card}>
          <CardContent>
            <AdvertiserForm auth={auth} unlock={true} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  create: (value: any, auth: any, userId: any) => dispatch((CreateAdvertisers(value, auth, userId))),
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdvertiserNew)) as any);
