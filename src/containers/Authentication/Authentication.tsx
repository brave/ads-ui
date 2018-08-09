import { Paper, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { styles } from "./Authentication.style";

import AdvertiserContainer from "./Advertiser/Advertiser";
import SigninContainer from "./Signin/Signin";
import SignupContainer from "./Signup/Signup";
import VerifyContainer from "./Verify/Verify";

class Authentication extends React.Component<any, any> {
  public state = {
    tabValue: "SignIn",
  };

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Switch>
            <Route path="/auth/signin" component={SigninContainer} />
            <Route path="/auth/signup" component={SignupContainer} />
            <Route path="/auth/verify" component={VerifyContainer} />
            <Route path="/auth/advertiser" component={AdvertiserContainer} />
            {this.getRedirect()}
          </Switch>
        </Paper>
      </div>
    );
  }

  private getRedirect() {
    const { advertiser, auth } = this.props;
    if (auth && auth.signedIn) {
      if (!auth.emailVerified) {
        return <Redirect to="/auth/verify" />;
      } else {
        if (auth.role === "admin") {
          return <Redirect to="/admin/main" />;
        } else {
          if (!advertiser.advertisers || advertiser.advertisers.length < 1) {
            return <Redirect to="/auth/advertiser" />;
          } else {
            return <Redirect to="/user/main" />;
          }
        }
      }
    } else {
      return <Redirect to="/auth/signin" />;
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertiser: state.advertiserReducer,
  auth: state.authReducer,
});

export default withStyles(styles)(connect(mapStateToProps)(Authentication));
