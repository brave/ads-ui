import {
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import AppBar from "../components/AppBar/AppBar";
import SideBar from "../components/SideBar/SideBar";
import Dashboard from "./views/dashboard/Dashboard";
import CampaignsList from "./views/campaignsList/CampaignsList";

import CampaignNew from "../components/Campaigns/CampaignNew/CampaignNew";
import CreativeSetNew from "../components/CreativeSets/CreativeSetNew/CreativeSetNew";
import UserList from "../components/Users/UserList/UserList";
import UserNew from "../components/Users/UserNew/UserNew";
import CreativeInstanceNew from "../components/CreativeInstances/CreativeInstanceNew/CreativeInstanceNew";
import CreativeInstanceView from "../containers/Campaigns/CreativeInstanceView/CreativeInstanceView";
import CampaignPerformance from "../containers/Campaigns/CampaignPerformance/CampaignPerformance";

import CampaignView from "../containers/Campaigns/CampaignView/CampaignView";
import Creative from "./views/creatives/creative/Creative";
import CreativeNew from "./views/creatives/creativeNew/CreativeNew";
import InvoiceView from "../containers/Invoices/InvoicesView/InvoiceView";
import AdvertiserView from "../containers/Users/AdvertiserView/AdvertiserView";

import AdSet from "./views/adSets/adSet/AdSet";
import AdSetNew from "./views/adSets/adSetNew/AdSetNew";

import UserView from "../containers/Users/UserView/UserView";

import Selection from "./views/adsManager/views/selection/Selection";
import Overview from "./views/campaigns/views/campaign/views/analytics/views/overview/Overview";
import Platforms from "./views/campaigns/views/campaign/views/analytics/views/platforms/Platforms";

import * as S from "./Admin.style";
import { styles } from "./Admin.style";
import AdvertiserNew from "./views/advertisers/views/advertiserNew/AdvertiserNew";
import AdvertiserOverview from "./views/advertisers/views/advertiserOverview/AdvertiserOverview";
import AdvertiserCampaigns from "./views/advertisers/views/advertiserCampaigns/AdvertiserCampaigns";
import AdvertiserInvoices from "./views/advertisers/views/advertiserInvoices/AdvertiserInvoices";
import AdvertiserCreatives from "./views/advertisers/views/advertiserCreatives/AdvertiserCreatives";
import Context from "../state/context";
import Advanced from "./views/adsManager/views/advanced/Advanced";

// GraphQL 
import ApolloClient from 'apollo-client';
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AdSetAds from "./views/adSets/adSetAds/AdSetAds";
import CampaignListOverview from "./views/campaignsList/campaignListOverview/CampaignListOverview";
import CampaignListApprovals from "./views/campaignsList/campaignListApprovals/CampaignListApprovals";
import CampaignListPacing from "./views/campaignsList/campaignListPacing/CampaignListPacing";


class Admin extends React.Component<any, any> {
    static contextType = Context;

    public render(): any {
        const { auth, classes, drawer, match } = this.props;

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
            auth.role !== "admin"
        ) {
            return <Redirect to="/a" />;
        }

        return (
            <ApolloProvider client={client}>

                <S.Container>
                    <AppBar />
                    <S.Content>

                        {
                            this.context.sidebar === "visible" &&
                            <SideBar type={"admin"} match={match} />
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
                                {/* /dashboard */}
                                <Route path={match.url + "/dashboard"} component={Dashboard} />

                                {/* /user(s) - eventually want to remove this */}
                                <Route exact path={match.url + "/users"} component={UserList} />
                                <Route exact path={match.url + "/users/new"} component={UserNew} />

                                {/* Want to remove this route */}
                                <Route exact path={match.url + "/users/:userId"} component={UserView} />

                                {/* Want to add these routes */}
                                {/* 
                            <Route exact path={match.url + "/users/:userId/overview"} component={UserOverview} />
                            <Route exact path={match.url + "/users/:userId/advertiser"} component={UserAdvertisers} /> 
                            */}

                                {/* /advertiser */}
                                <Route exact path={match.url + "/users/:userId/advertiser/new"} component={AdvertiserNew} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/overview"} component={AdvertiserOverview} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/campaign"} component={AdvertiserCampaigns} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/creative"} component={AdvertiserCreatives} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/invoice"} component={AdvertiserInvoices} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/invoice/:invoiceId"}
                                    component={InvoiceView} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/campaign/new"}
                                    component={CampaignNew} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/campaign/:campaignId"}
                                    component={CampaignView} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/campaign/:campaignId/report"}
                                    component={CampaignPerformance} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/campaign/:campaignId/analytics/overview"}
                                    component={Overview} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/campaign/:campaignId/analytics/platforms"}
                                    component={Platforms} />

                                {/* /creativeSet */}
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/campaign/:campaignId/creativeSet/new"}
                                    component={AdSetNew} />
                                <Route exact path={
                                    match.url + "/users/:userId/advertiser/:advertiserId/campaign/:campaignId/creativeSet/:creativeSetId"}
                                    component={AdSet} />
                                <Route exact path={
                                    match.url + "/users/:userId/advertiser/:advertiserId/campaign/:campaignId/creativeSet/:creativeSetId/ads"}
                                    component={AdSetAds} />

                                {/* /creativeInstance */}
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/campaign/:campaignId/creativeSet/:creativeSetId/creativeInstance/new"}
                                    component={CreativeInstanceNew} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/campaign/:campaignId/creativeSet/:creativeSetId/creativeInstance/:creativeInstanceId"}
                                    component={CreativeInstanceView} />

                                {/* /advertiser/:advertiserId/creative */}
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/creative/new"}
                                    component={CreativeNew} />
                                <Route exact path={match.url + "/users/:userId/advertiser/:advertiserId/creative/:creativeId"}
                                    component={Creative} />
                                <Route path={match.url + "/campaigns/overview"} component={CampaignListOverview} />
                                <Route path={match.url + "/campaigns/pacing"} component={CampaignListPacing} />
                                <Route path={match.url + "/campaigns/approvals"} component={CampaignListApprovals} />
                                <Redirect to={match.url + "/dashboard"} />
                            </Switch>
                        </S.Main>
                    </S.Content>
                </S.Container>
            </ApolloProvider>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.authReducer,
    drawer: state.drawerReducer
});

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps)(Admin)
);
