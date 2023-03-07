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
import { Box } from "@mui/material";
import { NewCampaign } from "./views/adsManager/views/advanced/components/form/NewCampaign";
import { EditCampaign } from "./views/adsManager/views/advanced/components/form/EditCampaign";
import { CompletionForm } from "./views/adsManager/views/advanced/components/completionForm/CompletionForm";
import { getActiveAdvertiser } from "../state/context";
import { IAdvertiser, IAuthUser } from "../actions";
import { useAdvertiserCampaignsQuery } from "../graphql/advertiser.generated";
import { AdSetList } from "./adSet/AdSetList";
import { AdList } from "./ads/AdList";

const buildApolloClient = (accessToken: string) => {
  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
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
              <Route path={`${match.path}/adsmanager/advanced/new`}>
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

              {/* /campaigns */}
              <RoutesWithProps advertiser={activeAdvertiser} />

              {/* /campaigns/:campaignId/analytics - */}
              <Route
                path={`${match.path}/campaign/:campaignId/analytics/overview`}
              >
                <AnalyticsOverview auth={auth} />
              </Route>
            </Switch>
          </Box>
        </Box>
      </Box>
    </ApolloProvider>
  );
}

const RoutesWithProps: React.FC<{ advertiser: IAdvertiser }> = ({
  advertiser,
}) => {
  const match = useRouteMatch();
  const { loading, data } = useAdvertiserCampaignsQuery({
    variables: { id: advertiser.id },
  });

  return (
    <>
      <Route path={`${match.path}/campaigns`}>
        <CampaignList
          canEdit={advertiser.selfServiceEdit}
          campaigns={data?.advertiser?.campaigns ?? []}
          advertiserId={advertiser.id}
          loading={loading}
        />
      </Route>
      <Route path={`${match.path}/adsets`}>
        <AdSetList
          campaigns={data?.advertiser?.campaigns ?? []}
          loading={loading}
        />
      </Route>
      <Route path={`${match.path}/ads`}>
        <AdList
          campaigns={data?.advertiser?.campaigns ?? []}
          loading={loading}
          advertiserId={advertiser.id}
        />
      </Route>
      {/* default */}
      <Redirect to={`${match.path}/campaigns`} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
});

export default connect(mapStateToProps)(User);
