import { withStyles } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { styles } from "./Authentication.style";
import * as S from "./Authentication.style";

import SigninContainer from "./Signin/Signin";

class Authentication extends React.Component<any, any> {
  public state = {
    tabValue: "SignIn"
  };

  public render() {
    return (
      <S.Container>
        <S.Content>
          <Switch>
            <Route path="/auth/signin" component={SigninContainer} />
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

export default withStyles(styles)(connect(mapStateToProps)(Authentication));