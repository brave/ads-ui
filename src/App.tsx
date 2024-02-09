import { useEffect, useState } from "react";

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
import { LandingPage } from "auth/views/LandingPage";
import { BraveAdsContactFrame } from "auth/registration/BraveAdsContactFrame";
import { SearchLandingPage } from "search/SearchLandingPage";
import { VERSION } from "util/version";
import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { BasicAttentionTokenLandingPage } from "basic-attention-token/BasicAttentionTokenLandingPage";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { dynamicActivate } from "./i18n";

const Protected = () => {
  return <Redirect to="/auth/link" />;
};

export function App() {
  console.log(`current build: ${VERSION.fullHash}`);
  const { enableLinkTracking } = useMatomo();
  const [drafts, setDrafts] = useState<CampaignForm[]>(getAllDrafts());
  const isAuthenticated = useIsAuthenticated();

  enableLinkTracking();

  useEffect(() => {
    const browserLanguage = navigator.language;
    dynamicActivate(browserLanguage);
  }, []);

  if (isAuthenticated == null) {
    return null;
  }

  return (
    <I18nProvider i18n={i18n}>
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
              <Route path="/contact" component={BraveAdsContactFrame} />
              <Route path="/search" component={SearchLandingPage} />
              <Route path="/bat" component={BasicAttentionTokenLandingPage} />
              <Route
                path="/user/main"
                component={isAuthenticated ? User : Protected}
              />
              <Route path="/" exact={true} component={LandingPage} />
              <Redirect to="/user/main" />
            </Switch>
          </DraftContext.Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </I18nProvider>
  );
}
