import React, { useMemo, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { Sidebar } from "./components/sidebar/Sidebar";
import { CampaignList } from "./campaignList/CampaignList";

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
import { useAdvertiserCampaignsQuery } from "graphql/advertiser.generated";
import { AdSetList } from "./adSet/AdSetList";
import { AdList } from "./ads/AdList";
import moment from "moment";
import { CampaignAgeFilter } from "components/Campaigns/CampaignAgeFilter";
import { populateFilter } from "./library";

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
          <Sidebar />
          <Routes />
        </Box>
      </Box>
    </ApolloProvider>
  );
}

const Routes = () => {
  const [fromDateFilter, setFromDateFilter] = useState<Date | null>(
    moment().subtract(6, "month").startOf("day").toDate()
  );

  const { loading, data } = useAdvertiserCampaignsQuery({
    variables: {
      id: window.localStorage.getItem("activeAdvertiser") ?? "",
      filter: populateFilter(fromDateFilter),
    },
    pollInterval: 600_000,
  });

  return (
    <Box
      width="100%"
      height="100%"
      padding={1}
      overflow="scroll"
      marginTop="64px"
    >
      <Switch>
        {/* /adsmanager */}
        <Route path={`/user/main/adsmanager/advanced/new/:draftId`}>
          <NewCampaign fromDate={fromDateFilter} />
        </Route>

        <Route path={`/user/main/adsmanager/advanced/:campaignId`}>
          <EditCampaign fromDate={fromDateFilter} />
        </Route>

        <Route path={`/user/main/complete/:mode`}>
          <CompletionForm />
        </Route>

        {/* /settings */}
        <Route path={`/user/main/settings`}>
          <Settings />
        </Route>

        {/* /campaigns/:campaignId/analytics - */}
        <Route path={`/user/main/campaign/:campaignId/analytics/overview`}>
          <AnalyticsOverview />
        </Route>

        {/* /campaigns */}
        <Route path={`/user/main/campaigns`}>
          <Stack>
            <CampaignAgeFilter
              fromDate={fromDateFilter}
              onChange={setFromDateFilter}
            />
            <CampaignList
              advertiserCampaigns={data?.advertiserCampaigns}
              loading={loading}
              fromDate={fromDateFilter}
            />
          </Stack>
        </Route>
        <Route path={`/user/main/adsets`}>
          <AdSetList
            advertiserCampaigns={data?.advertiserCampaigns}
            loading={loading}
            fromDate={fromDateFilter}
          />
        </Route>

        <Route path={`/user/main/ads`}>
          <AdList
            advertiserCampaigns={data?.advertiserCampaigns}
            loading={loading}
            fromDate={fromDateFilter}
          />
        </Route>

        {/* default */}
        <Redirect to={`/user/main/campaigns`} />
      </Switch>
    </Box>
  );
};
