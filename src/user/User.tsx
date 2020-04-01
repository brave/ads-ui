import {
    withStyles
} from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import { CloseDrawer } from "../actions";
import Navbar from "./components/navbar/Navbar";
import Performances from "../containers/Performances/Performances";
import Selection from "./views/adsManager/views/selection/Selection";
import Advanced from "./views/adsManager/views/advanced/Advanced";

// Refactor
import Platforms from "../admin/views/campaigns/views/campaign/views/analytics/views/platforms/Platforms";


import Sidebar from "./components/sidebar/Sidebar";

import * as S from "./User.style";
import { styles } from "./User.style";

import Context from "../state/context";
import CampaignList from "./campaignList/CampaignList";

import ApolloClient from 'apollo-client';
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

class User extends React.Component<any, any> {
    static contextType = Context;
    public render(): any {
        const { advertisers, auth, classes, match } = this.props;
        const activeAdvertiser = _.find(advertisers, { state: "active" });

        const httpLink = createHttpLink({
            uri: `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
        });

        const authLink = setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            // return the headers to the context so httpLink can read them
            return {
                headers: {
                    ...headers,
                    authorization: `Bearer ${auth.accessToken}`,
                }
            }
        });

        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });

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

                                {/* /performances */}
                                <Route exact path={match.url + "/performances"} component={Performances} />
                                <Route exact path={match.url + "/performances/:campaignId/platforms"} component={Platforms} />

                                {/* /campaigns */}
                                <Route exact path={match.url + "/campaigns"} render={(props) => <CampaignList {...props} userId={auth.id} advertiserId={activeAdvertiser.id} />} />

                                {/* default */}
                                <Redirect to={match.url + "/performances"} />
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
