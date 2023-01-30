import {
    withStyles
} from "@material-ui/core";
import _ from "lodash";
import React, {useMemo} from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { CloseDrawer } from "../actions";
import Navbar from "./components/navbar/Navbar";
import Selection from "./views/adsManager/views/selection/Selection";
import Advanced from "./views/adsManager/views/advanced/Advanced";

import Sidebar from "./components/sidebar/Sidebar";

import * as S from "./User.style";
import { styles } from "./User.style";

import Context from "../state/context";
import CampaignList from "./campaignList/CampaignList";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import AnalyticsOverview from "./analytics/analyticsOverview/AnalyticsOverview";
import Settings from "./settings/Settings";

const buildApolloClient = (accessToken: string) => {
  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return client;
};

class User extends React.Component<any, any> {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            activeAdvertiser: _.find(props.advertisers, { state: "active" })
        }
        this.setActiveAdvertiser = this.setActiveAdvertiser.bind(this);
    }

    setActiveAdvertiser = (activeAdvertiser) => {
        this.setState({ activeAdvertiser });
    }

    public render(): any {
        const { advertisers, auth, match } = this.props;
        const activeAdvertiser = _.find(advertisers, { state: "active" });

        const client = buildApolloClient(auth.accessToken);

        if (
            !auth ||
            !auth.signedIn ||
            !auth.emailVerified ||
            (auth.role !== "user" && !activeAdvertiser)
        ) {
            return <Redirect to="/a" />;
        }

        return (
            <ApolloProvider client={client}>
                <S.Container>

                    <Navbar userId={auth.id} advertiserId={activeAdvertiser.id} />
                    <S.Content>

                        {
                            this.context.sidebar === "visible" &&
                            <Sidebar match={match} />
                        }
                        {
                            this.context.sidebar === "hidden" &&
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
                            }} />
                        }
                        <S.Main>
                            <Switch>
                                {/* /adsmanager */}
                                <Route exact path={match.url + "/adsmanager/selection"} component={Selection} />
                                <Route exact path={match.url + "/adsmanager/advanced"} component={Advanced} />

                                {/* /settings */}
                                <Route exact path={match.url + "/settings"} render={(props) => <Settings {...props} userId={auth.id} advertisers={advertisers} activeAdvertiser={this.state.activeAdvertiser} setActiveAdvertiser={this.setActiveAdvertiser} />} />

                                {/* /campaigns */}
                                <Route exact path={match.url + "/campaigns"} render={(props) => <CampaignList {...props} userId={auth.id} advertiserId={this.state.activeAdvertiser.id} />} />

                                {/* /campaigns/:campaignId/analytics - */}
                                <Route exact path={match.url + "/campaign/:campaignId/analytics/overview"} render={(props) => <AnalyticsOverview {...props} auth={auth} userId={auth.id} advertiserId={this.state.activeAdvertiser.id} />} />
                                <Route exact path={match.url + "/campaign/:campaignId/analytics/audiences"} render={(props) => <CampaignList {...props} userId={auth.id} advertiserId={this.state.activeAdvertiser.id} />} />
                                <Route exact path={match.url + "/campaign/:campaignId/analytics/locations"} render={(props) => <CampaignList {...props} userId={auth.id} advertiserId={this.state.activeAdvertiser.id} />} />
                                <Route exact path={match.url + "/campaign/:campaignId/analytics/platforms"} render={(props) => <CampaignList {...props} userId={auth.id} advertiserId={this.state.activeAdvertiser.id} />} />

                                {/* default */}
                                <Redirect to={match.url + "/campaigns"} />
                            </Switch>
                        </S.Main>
                    </S.Content>
                </S.Container>
            </ApolloProvider>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    advertisers: state.advertiserReducer.advertisers,
    auth: state.authReducer,
    drawer: state.drawerReducer
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    CloseDrawer: () => dispatch(CloseDrawer({})),
    Signout: () => dispatch(CloseDrawer({}))
});

export default withStyles(styles, { withTheme: true })(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(User)
);
