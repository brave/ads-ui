import { Paper, withStyles } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { styles } from "./Authentication.style";
import * as S from "./Authentication.style";

import AdvertiserContainer from "./Advertiser/Advertiser";
import SigninContainer from "./Signin/Signin";
import SignupContainer from "./Signup/Signup";
import VerifyContainer from "./Verify/Verify";
import WaitContainer from "./Wait/Wait";

class Authentication extends React.Component<any, any> {
  public state = {
    tabValue: "SignIn"
  };

  public render() {
    const { classes } = this.props;
    return (
      <S.Container>
        <S.Content>
          <Switch>
            <Route path="/auth/signin" component={SigninContainer} />
            <Route path="/auth/signup" component={SignupContainer} />
            <Route path="/auth/verify" component={VerifyContainer} />
            <Route path="/auth/advertiser" component={AdvertiserContainer} />
            <Route path="/auth/wait" component={WaitContainer} />
            {this.getRedirect()}
          </Switch>
        </S.Content>
      </S.Container>
    );
  }

  private getRedirect() {
    const { advertisers, auth } = this.props;
    if (auth && auth.signedIn) {
      if (!auth.emailVerified) {
        return <Redirect to="/auth/verify" />;
      } else {
        if (auth.role === "admin") {
          return <Redirect to="/a" />;
        } else {
          const activeAdvertiser = _.find(advertisers, { state: "active" });
          if (advertisers.length < 1) {
            return <Redirect to="/auth/advertiser" />;
          } else if (!activeAdvertiser) {
            return <Redirect to="/auth/wait" />;
          } else {
            return <Redirect to="/a" />;
          }
        }
      }
    } else {
      return <Redirect to="/auth/signin" />;
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer
});

export default withStyles(styles)(connect(mapStateToProps)(Authentication));
