import { useMemo, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import Settings from "./settings/Settings";
import { Box } from "@mui/material";
import { NewCampaign } from "./views/adsManager/views/advanced/components/form/NewCampaign";
import { EditCampaign } from "./views/adsManager/views/advanced/components/form/EditCampaign";
import { CompletionForm } from "./views/adsManager/views/advanced/components/completionForm/CompletionForm";
import { Navbar } from "@/components/Navigation/Navbar";
import { CampaignView } from "@/user/views/user/CampaignView";
import { Profile } from "@/user/views/user/Profile";
import { FilterContext } from "@/state/context";
import { CreativeList } from "@/components/Creatives/CreativeList";
import { CreativeForm } from "@/components/Creatives/CreativeForm";
import { ProtectedRoute } from "@/components/Route/ProtectedRoute";
import { AdvertiserDetailsForm } from "@/auth/components/AdvertiserDetailsForm";
import { ErrorBoundary } from "@/ErrorBoundary";
import { CampaignReportViewSelector } from "./views/user/CampaignReportViewSelector";
import dayjs from "dayjs";
import { useIsAuthenticated } from "@/auth/hooks/queries/useIsAuthenticated";
import { CreateSearchCampaignBetaPage } from "./views/user/search/CreateSearchCampaignBetaPage";

const buildApolloClient = () => {
  const httpLink = createHttpLink({
    uri: `${import.meta.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    credentials: "include",
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
      typePolicies: {
        // these are not normal objects identifed by an id, so don't try to cache them as such
        // see https://www.apollographql.com/docs/react/caching/cache-configuration#disabling-normalization
        PerformanceResults: {
          keyFields: false,
        },
        Performance: {
          keyFields: false,
        },
        Dimensions: {
          keyFields: false,
        },
        Metrics: {
          keyFields: false,
        },
        MetricRates: {
          keyFields: false,
        },

        // and these have special keys
        OS: {
          keyFields: ["name"],
        },
      },
    }),
    connectToDevTools: true,
  });
};

export default function User() {
  const client = useMemo(() => buildApolloClient(), []);
  const [fromDate, setFromDate] = useState<Date | null>(
    dayjs().subtract(6, "month").startOf("day").toDate(),
  );

  const isAuthenticated = useIsAuthenticated();
  if (!isAuthenticated) {
    return (
      <Switch>
        <Redirect to="/auth/link" exact={true} />
      </Switch>
    );
  }

  return (
    <ApolloProvider client={client}>
      <FilterContext.Provider
        value={{
          fromDate,
          setFromDate,
        }}
      >
        <Box display="flex" height="100vh" width="100vw" flexDirection="row">
          <Navbar />
          <Box
            flex={1}
            component="main"
            marginTop="64px"
            // eslint-disable-next-line lingui/no-unlocalized-strings
            height="calc(100% - 64px)"
            overflow="auto"
            padding={1}
            // this is flexing vertically, so that screens that wish to be
            // exactly in viewport without scrollbars can set flex=1 on the
            // child they wish to fill the screen with
            display="flex"
            flexDirection="column"
            bgcolor="background.default"
          >
            <ErrorBoundary>
              <Switch>
                {/* /adsmanager */}
                <ProtectedRoute
                  path="/user/main/adsmanager/advanced/new/:draftId"
                  authedComponent={NewCampaign}
                  validateAdvertiserProperty={(a) =>
                    a.selfServiceManageCampaign
                  }
                />

                <ProtectedRoute
                  path="/user/main/adsmanager/advanced/:campaignId"
                  authedComponent={EditCampaign}
                  validateAdvertiserProperty={(a) =>
                    a.selfServiceManageCampaign
                  }
                />

                <ProtectedRoute
                  path="/user/main/creative/:id"
                  authedComponent={CreativeForm}
                  validateAdvertiserProperty={(a) =>
                    a.selfServiceManageCampaign
                  }
                />

                <ProtectedRoute
                  path="/user/main/complete/:mode"
                  authedComponent={CompletionForm}
                />

                {/* /campaigns/:campaignId/analytics - */}
                <ProtectedRoute
                  path="/user/main/report/:campaignId"
                  authedComponent={CampaignReportViewSelector}
                />

                <Redirect
                  to={"/user/main/report/:campaignId"}
                  from={"/user/main/campaign/:campaignId"}
                  exact={true}
                />

                <Route path="/user/main/settings" component={Settings} />
                <Route path="/user/main/profile" component={Profile} />

                <ProtectedRoute
                  path="/user/main/campaign"
                  authedComponent={CampaignView}
                  unauthedComponent={AdvertiserDetailsForm}
                />

                <ProtectedRoute
                  path="/user/main/ads"
                  authedComponent={CreativeList}
                />

                <Redirect
                  from="/user/main/creatives"
                  to="/user/main/ads"
                  exact
                />
                <Redirect
                  from="/user/main/assets"
                  to="/user/main/ads/assets"
                  exact
                />

                <ProtectedRoute
                  path="/user/main/search/new"
                  authedComponent={CreateSearchCampaignBetaPage}
                />

                {/* default */}
                <Redirect to="/user/main/campaign" />
              </Switch>
            </ErrorBoundary>
          </Box>
        </Box>
      </FilterContext.Provider>
    </ApolloProvider>
  );
}
