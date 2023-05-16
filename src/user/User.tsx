import React, { useMemo, useState } from "react";
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
import moment from "moment";
import { MainView } from "user/views/user/MainView";
import { Navbar } from "user/components/navbar/Navbar";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { ValidateCampaign } from "./views/adsManager/views/advanced/components/campaign/ValidateCampaign";

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
  const { advertiser } = useAdvertiser();
  const [fromDateFilter, setFromDateFilter] = useState<Date | null>(
    moment().subtract(6, "month").startOf("day").toDate()
  );

  return (
    <ApolloProvider client={client}>
      <Box height="100%">
        <Box display="flex">
          <Navbar canCreate={advertiser.selfServiceCreate} />
          <Box width="100%" height="100%" padding={1} marginTop="64px">
            <Switch>
              {/* /adsmanager */}
              <Route path={`/user/main/adsmanager/advanced/new/:draftId`}>
                <NewCampaign fromDate={fromDateFilter} />
              </Route>

              <Route
                path={`/user/main/adsmanager/advanced/complete/:referenceId`}
              >
                <ValidateCampaign fromDate={fromDateFilter} />
              </Route>

              <Route path={`/user/main/adsmanager/advanced/:campaignId`}>
                <EditCampaign fromDate={fromDateFilter} />
              </Route>

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

              <Route path={`/user/main`}>
                <MainView
                  fromDate={fromDateFilter}
                  onSetDate={setFromDateFilter}
                />
              </Route>

              {/* default */}
              <Redirect to={`/user/main`} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ApolloProvider>
  );
}
