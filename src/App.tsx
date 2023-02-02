import React, { useState } from "react";
import _ from "lodash";

import Authentication from "./containers/Authentication/Authentication";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Context from "./state/context";
import User from "./user/User";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import moment from "moment";

const App = props => {
  const [loading, setLoading] = useState(undefined)
  const [sidebar, setSidebar] = useState("visible")

  let expTime;
  if (props.auth.accessToken) {
    expTime = moment((jwt_decode(props.auth.accessToken) as any).exp * 1000)
  }

  const getRedirect = () => {
    if (expTime && expTime < moment()) {
      localStorage.clear();
      window.location.reload();
    }
    const { advertisers, auth } = props;
    if (auth && auth.signedIn && auth.emailVerified) {
      const activeAdvertiser = _.find(advertisers, { state: "active" });
      if (advertisers.length > 0 && activeAdvertiser) {
        return <Redirect to="/user/main" />;
      } else {
        return <Redirect to="/auth" />;
      }
    } else {
      return <Redirect to="/auth" />;
    }
  }

  return (
    <>
      <Context.Provider value={{
        loading,
        sidebar,
        setSidebar,
        setLoading
      }}>
        <Switch>
          <Route path="/user/main">
            <User />
          </Route>
          <Route path="/auth" component={Authentication} />
          <Route path='/' exact={true} component={() => {
            window.location.href = "https://brave.com/brave-ads-waitlist/";
            return null;
          }} />
          {getRedirect()}
        </Switch>

      </Context.Provider>
    </>
  );
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
  snackbar: state.snackBarReducer
});

export default withRouter(
  connect(
    mapStateToProps
  )(App));
