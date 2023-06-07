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
import { AuthVerify } from "auth/views/AuthVerify";
import { Login } from "auth/views/Login";
import { MagicLink } from "auth/views/MagicLink";
import { Register } from "auth/registration/Register";

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
            <Route path="/auth/signin" component={Login} />
            <Route path="/auth/link" component={MagicLink} />
            <Route path="/auth/verify" component={AuthVerify} />
            <Route path="/register" component={Register} />
            <Route path="*" component={isAuthenticated ? User : Protected} />
            <Redirect to="/user/main" />
          </Switch>
        </DraftContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
