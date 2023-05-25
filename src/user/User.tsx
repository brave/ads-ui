import React, { useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import AnalyticsOverview from "./analytics/AnalyticsOverview";
import Settings from "./settings/Settings";
import { Box, Stack } from "@mui/material";
import { NewCampaign } from "./views/adsManager/views/advanced/components/form/NewCampaign";
import { EditCampaign } from "./views/adsManager/views/advanced/components/form/EditCampaign";
import { CompletionForm } from "./views/adsManager/views/advanced/components/completionForm/CompletionForm";
import { MainView } from "user/views/user/MainView";
import { Navbar } from "user/components/navbar/Navbar";

const buildApolloClient = () => {
  const httpLink = createHttpLink({
    uri: `${import.meta.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    credentials: "include",
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export function User() {
  const client = useMemo(() => buildApolloClient(), []);

  return (
    <ApolloProvider client={client}>
      <Box height="100%">
        <Box display="flex">
          <Navbar />
          <Box width="100%" height="100%" padding={1} marginTop="64px">
            <Switch>
              {/* /adsmanager */}
              <Route
                path={`/user/main/adsmanager/advanced/new/:draftId`}
                component={NewCampaign}
              />

              <Route
                path={`/user/main/adsmanager/advanced/:campaignId`}
                component={EditCampaign}
              />

              <Route
                path={`/user/main/complete/:mode`}
                component={CompletionForm}
              />

              {/* /settings */}
              <Route path={`/user/main/settings`} component={Settings} />

              {/* /campaigns/:campaignId/analytics - */}
              <Route
                path={`/user/main/campaign/:campaignId/analytics/overview`}
                component={AnalyticsOverview}
              />

              <Route path={`/user/main`} component={MainView} />

              {/* default */}
              <Redirect to={`/user/main`} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ApolloProvider>
  );
}
