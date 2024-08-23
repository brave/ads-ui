import { useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import { DraftContext, getAllDrafts } from "@/state/context";
import { User } from "@/user/User";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { theme } from "./theme";
import { CampaignForm } from "@/user/views/adsManager/types";
import { AuthVerify } from "@/auth/views/AuthVerify";
import { Login } from "@/auth/views/Login";
import { MagicLink } from "@/auth/views/MagicLink";
import { Register } from "@/auth/registration/Register";
import { LandingPage } from "@/auth/views/LandingPage";
import { BraveAdsContactFrame } from "@/auth/registration/BraveAdsContactFrame";
import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { SearchLandingPage } from "@/search/SearchLandingPage";
import { SearchPreviewPage } from "./search/preview/SearchPreviewPage";
import { BasicAttentionTokenLandingPage } from "@/basic-attention-token/BasicAttentionTokenLandingPage";

export function App() {
  const { enableLinkTracking } = useMatomo();
  const [drafts, setDrafts] = useState<CampaignForm[]>(getAllDrafts());

  enableLinkTracking();

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
            <Route path="/contact" component={BraveAdsContactFrame} />
            <Route
              path="/bat"
              component={() => (
                <BasicAttentionTokenLandingPage reroute={true} />
              )}
            />
            <Route path="/search/preview/:slug" component={SearchPreviewPage} />
            <Route path="/search" component={SearchLandingPage} />
            <Route path="/user/main" component={User} />
            <Route path="/" exact={true} component={LandingPage} />
            <Redirect to="/user/main" />
          </Switch>
        </DraftContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
