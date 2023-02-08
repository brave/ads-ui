import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import SigninContainer from "./Signin/Signin";

class Authentication extends React.Component<any, any> {
  public state = {
    tabValue: "SignIn"
  };

  public render() {
    return (
      <Switch>
        <Route path="/auth/signin" component={SigninContainer} />
        {this.getRedirect()}
      </Switch>
    );
  }

  private getRedirect() {
    const { advertisers, auth } = this.props;
    if (auth && auth.signedIn) {
      if (!auth.emailVerified) {
        return <Redirect to="/auth/verify" />;
      } else {
        const activeAdvertiser = _.find(advertisers, { state: "active" });
        if (!activeAdvertiser) {
          return <Redirect to="/auth/wait" />;
        } else {
          return <Redirect to="/a" />;
        }
      }
    } else {
      return <Redirect to="/auth/signin" />;
    }
  }
}

const mapStateToProps = (state: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer
});

export default connect(mapStateToProps)(Authentication);
