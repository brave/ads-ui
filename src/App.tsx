import React, { useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import { DraftContext, getAllDrafts } from "state/context";
import { User } from "user/User";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { theme } from "theme";
import { CampaignForm } from "user/views/adsManager/types";
import { useIsAuthenticated } from "auth/hooks/queries/useIsAuthenticated";
import { SignIn } from "auth/views/Signin";

const Protected = () => {
  return <Redirect to="/auth/signin" />;
};

export function App() {
  const [drafts, setDrafts] = useState<CampaignForm[]>(getAllDrafts());
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated == null) {
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
              <SignIn />
            </Route>
            <Route path="*" component={isAuthenticated ? User : Protected} />
            <Redirect to="/user/main" />
          </Switch>
        </DraftContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
