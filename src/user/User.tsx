import _ from "lodash";
import React, {useContext, useMemo, useState} from "react";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Selection from "./views/adsManager/views/selection/Selection";
import Advanced from "./views/adsManager/views/advanced/Advanced";

import Sidebar from "./components/sidebar/Sidebar";

import * as S from "./User.style";

import Context from "../state/context";
import CampaignList from "./campaignList/CampaignList";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import AnalyticsOverview from "./analytics/AnalyticsOverview";
import Settings from "./settings/Settings";
import {connect} from "react-redux";
import {Box} from "@mui/material";
import {CampaignFormV2} from "./views/adsManager/views/advanced/components/form/CampaignFormV2";

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
  advertisers: any;
  auth: any;
}

function User({advertisers, auth}: Props) {
  const match = useRouteMatch();
  const [activeAdvertiser, setActiveAdvertiser] = useState(_.find(advertisers, {state: "active"}));
  const client = useMemo(() => buildApolloClient(auth.accessToken), [auth.accessToken])

  if (
    !auth ||
    !auth.signedIn ||
    !auth.emailVerified ||
    (auth.role !== "user" && !activeAdvertiser)
  ) {
    return <Redirect to="/a"/>;
  }

  return (
    <ApolloProvider client={client}>
      <Box height="100%">
        <Box display="flex">
          <Sidebar userId={auth.id} advertiserId={activeAdvertiser.id} />
          <Box
            width="100%"
            height="100%"
            padding={1}
            overflow="scroll"
            marginTop="64px"
          >
            <Switch>
              {/* /adsmanager */}
              <Route path={`${match.path}/adsmanager/selection`} component={Selection}/>
              <Route path={`${match.path}/adsmanager/advanced`}>
                <CampaignFormV2 auth={auth} advertiser={activeAdvertiser}/>
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
              <Route path={`${match.path}/campaigns`}>
                <CampaignList userId={auth.id} advertiserId={activeAdvertiser.id}/>
              </Route>

              {/* /campaigns/:campaignId/analytics - */}
              <Route path={`${match.path}/campaign/:campaignId/analytics/overview`}>
                <AnalyticsOverview auth={auth}/>
              </Route>

              {/* default */}
              <Redirect to={`${match.path}/campaigns`}/>
            </Switch>
          </Box>
        </Box>
      </Box>
    </ApolloProvider>
  );
}

const mapStateToProps = (state: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer
});

export default connect(mapStateToProps)(User);
