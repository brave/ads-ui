import React, { useMemo, useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

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
import { connect } from "react-redux";
import { Box, Stack } from "@mui/material";
import { NewCampaign } from "./views/adsManager/views/advanced/components/form/NewCampaign";
import { EditCampaign } from "./views/adsManager/views/advanced/components/form/EditCampaign";
import { CompletionForm } from "./views/adsManager/views/advanced/components/completionForm/CompletionForm";
import { getActiveAdvertiser } from "../state/context";
import { IAdvertiser, IAuthUser } from "../actions";
import { useAdvertiserCampaignsQuery } from "../graphql/advertiser.generated";
import { AdSetList } from "./adSet/AdSetList";
import { AdList } from "./ads/AdList";
import moment from "moment";
import { CampaignAgeFilter } from "../components/Campaigns/CampaignAgeFilter";

const buildApolloClient = (accessToken: string) => {
  const httpLink = createHttpLink({
    uri: `${import.meta.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

interface Props {
  advertisers: IAdvertiser[];
  auth: IAuthUser;
}

function User({ advertisers, auth }: Props) {
  const match = useRouteMatch();
  const [activeAdvertiser, setActiveAdvertiser] = useState(
    getActiveAdvertiser()
  );
  const client = useMemo(
    () => buildApolloClient(auth.accessToken),
    [auth.accessToken]
  );

  if (!auth || !auth.signedIn || !auth.emailVerified || !activeAdvertiser) {
    return <Redirect to="/a" />;
  }

  return (
    <ApolloProvider client={client}>
      <Box height="100%">
        <Box display="flex">
          <Sidebar canCreate={activeAdvertiser.selfServiceCreate} />
          <Box
            width="100%"
            height="100%"
            padding={1}
            overflow="scroll"
            marginTop="64px"
          >
            <Switch>
              {/* /adsmanager */}
              <Route path={`${match.path}/adsmanager/advanced/new/:draftId`}>
                <NewCampaign auth={auth} advertiser={activeAdvertiser} />
              </Route>

              <Route path={`${match.path}/adsmanager/advanced/:campaignId`}>
                <EditCampaign advertiser={activeAdvertiser} auth={auth} />
              </Route>

              <Route path={`${match.path}/complete/:mode`}>
                <CompletionForm />
              </Route>

              {/* /settings */}
              <Route path={`${match.path}/settings`}>
                <Settings
                  userId={auth.id}
                  advertisers={advertisers}
                  activeAdvertiser={activeAdvertiser}
                  setActiveAdvertiser={setActiveAdvertiser}
                />
              </Route>

              {/* /campaigns/:campaignId/analytics - */}
              <Route
                path={`${match.path}/campaign/:campaignId/analytics/overview`}
              >
                <AnalyticsOverview auth={auth} />
              </Route>

              {/* /campaigns */}
              <RoutesWithProps advertiser={activeAdvertiser} auth={auth} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </ApolloProvider>
  );
}

const RoutesWithProps: React.FC<{
  advertiser: IAdvertiser;
  auth: IAuthUser;
}> = ({ advertiser, auth }) => {
  const match = useRouteMatch();
  const [fromDateFilter, setFromDateFilter] = useState<Date | null>(
    moment().subtract(3, "month").startOf("day").toDate()
  );

  const { loading, data } = useAdvertiserCampaignsQuery({
    variables: {
      id: advertiser.id,
      filter: {
        includeAds: true,
        includeCreativeSets: true,
        from: fromDateFilter,
      },
    },
    pollInterval: 600_000,
  });

  return (
    <Switch>
      <Route path={`${match.path}/campaigns`}>
        <Stack>
          <CampaignAgeFilter
            fromDate={fromDateFilter}
            onChange={setFromDateFilter}
          />
          <CampaignList
            campaigns={data?.advertiserCampaigns?.campaigns ?? []}
            advertiser={advertiser}
            loading={loading}
            fromDate={fromDateFilter}
          />
        </Stack>
      </Route>
      <Route path={`${match.path}/adsets`}>
        <AdSetList
          campaigns={data?.advertiserCampaigns?.campaigns ?? []}
          loading={loading}
          advertiser={advertiser}
        />
      </Route>
      <Route path={`${match.path}/ads`}>
        <AdList
          campaigns={data?.advertiserCampaigns?.campaigns ?? []}
          loading={loading}
          advertiser={advertiser}
        />
      </Route>

      {/* default */}
      <Redirect to={`${match.path}/campaigns`} />
    </Switch>
  );
};

const mapStateToProps = (state: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
});

export default connect(mapStateToProps)(User);
