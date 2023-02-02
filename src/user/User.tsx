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
  const context = useContext(Context);
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
      <S.Container>

        <Navbar userId={auth.id} advertiserId={activeAdvertiser.id}/>
        <S.Content>
          {
            context.sidebar === "visible" && <Sidebar/>
          }
          {
            context.sidebar === "hidden" &&
            // placeholder to keep layout normal, todo - cleanup
            <div style={{
              position: "sticky",
              visibility: "hidden",
              marginTop: "64px",
              top: "64px",
              opacity: 0,
              height: "calc(100vh - 64px)",
              width: "255px",
              borderRight: "2px solid #f6f6f5"
            }}/>
          }
          <S.Main>
            <Switch>
              {/* /adsmanager */}
              <Route path={`${match.path}/adsmanager/selection`} component={Selection}/>
              <Route path={`${match.path}/adsmanager/advanced`} component={Advanced}/>

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
                <AnalyticsOverview auth={auth} />
              </Route>

              {/* default */}
              <Redirect to={`${match.path}/campaigns`}/>
            </Switch>
          </S.Main>
        </S.Content>
      </S.Container>
    </ApolloProvider>
  );
}

const mapStateToProps = (state: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer
});

export default connect(mapStateToProps)(User);
