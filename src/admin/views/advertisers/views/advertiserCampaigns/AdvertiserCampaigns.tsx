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
import Section from '../../../../../components/section/Section';

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

class AdvertiserCampaigns extends Component<any, any> {

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
            { label: "Overview", selected: false, link: match.url.replace("/campaign", "") + "/overview" },
            { label: "Campaigns", selected: true, link: match.url.replace("/campaign", "") + "/campaign" },
            { label: "Creatives", selected: false, link: match.url.replace("/campaign", "") + "/creative" },
            { label: "Invoices", selected: false, link: match.url.replace("/campaign", "") + "/invoice" },
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
                <Section fullWidthChild={true}>
                    <div>
                        <Link className={classes.fab} to={`/admin/main/adsmanager/selection?userId=${match.params.userId}&advertiserId=${match.params.advertiserId}`}>
                            <Text content={"Try the new Campaign Creator!"} fontFamily={"Muli"} sizes={[12, 12, 12, 12, 18]} />
                        </Link>
                        <Text style={{ marginTop: "8px" }} content={"We would love to get your feedback on this new feature, please send any comments, questions, or requests to @dan"} fontFamily={"Muli"} sizes={[12, 12, 12, 12, 15]} />
                    </div>

                </Section>
                <CardContent style={{ padding: "0" }} className={classes.content}>
                    <CampaignTableList campaigns={campaigns} match={match} />
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdvertiserCampaigns));
