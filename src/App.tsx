import { useState, lazy, Suspense, useCallback } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import { DraftContext, getAllDrafts } from "@/state/context";
import {
  CircularProgress,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { theme } from "./theme";
import { CampaignForm } from "@/user/views/adsManager/types";
import { AuthVerify } from "@/auth/views/AuthVerify";
import { LandingPage } from "@/auth/views/LandingPage";
import { BraveAdsContactFrame } from "@/auth/registration/BraveAdsContactFrame";
import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { BasicAttentionTokenLandingPage } from "@/basic-attention-token/BasicAttentionTokenLandingPage";

const UserView = lazy(() => import("@/user/User"));
const SearchPreview = lazy(() => import("@/search/preview/SearchPreviewPage"));
const SignIn = lazy(() => import("@/auth/views/Login"));
const Register = lazy(() => import("@/auth/registration/Register"));
const AuthLink = lazy(() => import("@/auth/views/MagicLink"));
const SearchLandingPage = lazy(() => import("@/search/SearchLandingPage"));

export function App() {
  const { enableLinkTracking } = useMatomo();
  const [drafts, setDrafts] = useState<CampaignForm[]>(getAllDrafts());

  const reloadDrafts = useCallback(() => {
    setDrafts(getAllDrafts());
  }, []);

  enableLinkTracking();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DraftContext.Provider
          value={{
            drafts,
            setDrafts: reloadDrafts,
          }}
        >
          <Suspense fallback={<CircularProgress />}>
            <Switch>
              <Route path="/auth/signin" component={SignIn} />
              <Route path="/auth/link" component={AuthLink} />
              <Route path="/auth/verify" component={AuthVerify} />
              <Route path="/register" component={Register} />
              <Route path="/contact" component={BraveAdsContactFrame} />
              <Route
                path="/bat"
                component={() => (
                  <BasicAttentionTokenLandingPage reroute={true} />
                )}
              />
              <Route path="/search/preview/:slug" component={SearchPreview} />
              <Route path="/search" component={SearchLandingPage} />
              <Route path="/user/main" component={UserView} />
              <Route path="/" exact={true} component={LandingPage} />
              <Redirect to="/user/main" />
            </Switch>
          </Suspense>
        </DraftContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
