import React, { Component } from 'react';

import {
    AppBar,
    Card,
    CardContent,
    CardHeader,
    Icon,
    IconButton,
    Toolbar,
    Typography,
    withStyles,
} from "@material-ui/core";
import _ from "lodash";
import { connect } from "react-redux";

import { GetCampaigns, GetCreatives, GetInvoices, UpdateAdvertisers } from "../../../../../actions";

import AdvertiserForm from "../../../../../components/Advertisers/AdvertiserForm/Advertiser-form";
import InvoiceList from "../../../../../components/Invoices/InvoiceList/InvoiceList";

import CampaignTableList from "../../../../../components/Campaigns/CampaignTableList/CampaignTableList";
import CreativeTableList from "../../../../../components/Creatives/CreativeTableList/CreativeTableList";
import { Text } from "../../../../../components/Text/Text";

import { Link } from "react-router-dom";
import TabSelector from '../../../../../components/tabSelector/TabSelector';

let styles = {
    content: {
        alignItems: "flex-start",
        display: "flex",
        justifyContent: "space-between",
    },
    fab: {
        alignSelf: "flex-end",
        margin: "20px",
        textDecoration: "none",
    },
    infoCard: {
        margin: "15px",
    },
    root: {
        width: "100%",
    },
} as any;

const linkStyle = { textDecoration: "none", color: "inherit", marginLeft: "auto" };

class AdvertiserCreatives extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            unlock: false,
        };
    }

    public componentDidMount() {
        const id = this.props.match.params.userId;
        const user = _.find(this.props.users, (item) => {
            return item.id === id;
        });
        this.props.GetInvoices(this.props.auth, user.id);
        this.props.GetCampaigns(this.props.auth, user.id);
        this.props.GetCreatives(this.props.auth, user.id);
    }

    public render() {
        const { classes, match, auth, update, advertisers, invoices, creatives, campaigns, users, location } = this.props;
        const tabConfig = [
            { label: "Overview", selected: false, link: match.url.replace("/creative", "") + "/overview" },
            { label: "Campaigns", selected: false, link: match.url.replace("/creative", "") + "/campaign" },
            { label: "Creatives", selected: true, link: match.url.replace("/creative", "") + "/creative" },
            { label: "Invoices", selected: false, link: match.url.replace("/creative", "") + "/invoice" },
        ]
        const { unlock } = this.state;
        const id = match.params.userId;
        const advertiserId = match.params.advertiserId;
        const user = _.find(users, (item) => {
            return item.id === id;
        });
        const advertiser = _.find(advertisers, (item) => {
            return item.id === advertiserId;
        });
        return (
            <div className={classes.root}>
                <TabSelector config={tabConfig} />
                <CardHeader title="Creatives" />
                <CardContent className={classes.content}>
                    <CreativeTableList creatives={creatives} match={match} />
                </CardContent>
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    advertisers: state.advertiserReducer.advertisers,
    auth: state.authReducer,
    campaigns: state.campaignReducer.campaigns,
    creatives: state.creativeReducer.creatives,
    invoices: state.invoiceReducer.invoices,
    users: state.userReducer.users,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    GetCampaigns: (auth: any, userId: string) => dispatch(GetCampaigns(auth, userId)),
    GetCreatives: (auth: any, userId: string) => dispatch(GetCreatives(auth, userId)),
    GetInvoices: (auth: any, userId: string) => dispatch(GetInvoices(auth, userId)),
    update: (value: any, auth: any, userId: string) => dispatch(UpdateAdvertisers(value, auth, userId)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdvertiserCreatives));
