import React, { useState } from "react";

import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import { DraftContext, getAllDrafts } from "./state/context";
import { User } from "./user/User";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { theme } from "./theme";
import { CampaignForm } from "./user/views/adsManager/types";
import { useIsAuthenticated } from "./auth/hooks/queries/useIsAuthenticated";
import { SignIn } from "./containers/Authentication/Signin/Signin";

const Protected = () => {
  return <Redirect to="/auth/signin" />;
};

export function App() {
  const [drafts, setDrafts] = useState<CampaignForm[]>(getAllDrafts());

  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated === undefined) {
    return null;
  }

  return (
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
            <Route path="/auth/signin">
              <SignIn state={history.location.state} />
            </Route>
            <Route path="*" component={isAuthenticated ? User : Protected} />
            <Redirect to="/auth/signin" />
          </Switch>
        </DraftContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
