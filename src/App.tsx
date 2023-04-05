import React, { useState } from "react";
import _ from "lodash";

import Authentication from "./containers/Authentication/Authentication";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import {
  DraftContext,
  getActiveAdvertiser,
  getAllDrafts,
  setActiveAdvertiser,
} from "./state/context";
import User from "./user/User";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import moment from "moment";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { theme } from "./theme";
import { CampaignForm } from "./user/views/adsManager/types";

const App = (props) => {
  const [drafts, setDrafts] = useState<CampaignForm[]>(getAllDrafts());

  let expTime;
  if (props.auth.accessToken) {
    expTime = moment((jwt_decode(props.auth.accessToken) as any).exp * 1000);
  }

  const getRedirect = () => {
    if (expTime && expTime < moment()) {
      localStorage.removeItem("persist:root");
      window.location.reload();
    }
    const { advertisers, auth } = props;
    if (auth && auth.signedIn && auth.emailVerified) {
      const storageAdvertiser = getActiveAdvertiser();
      let isValid = false;
      if (storageAdvertiser) {
        isValid =
          _.find(advertisers, { id: storageAdvertiser.id }) !== undefined;
      }

      const activeAdvertiser = isValid
        ? storageAdvertiser
        : _.find(advertisers, { state: "active" });
      if (advertisers.length > 0 && activeAdvertiser) {
        setActiveAdvertiser(activeAdvertiser);
        return <Redirect to="/user/main" />;
      } else {
        return <Redirect to="/auth" />;
      }
    } else {
      return <Redirect to="/auth" />;
    }
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DraftContext.Provider
            value={{
              drafts,
              setDrafts: () => {
                setDrafts(getAllDrafts());
              },
            }}
          >
            <Switch>
              <Route path="/user/main">
                <User />
              </Route>
              <Route path="/auth" component={Authentication} />
              <Route
                path="/"
                exact={true}
                component={() => {
                  window.location.href =
                    "https://brave.com/brave-ads-waitlist/";
                  return null;
                }}
              />
              {getRedirect()}
            </Switch>
          </DraftContext.Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
  snackbar: state.snackBarReducer,
});

export default withRouter(connect(mapStateToProps)(App));
