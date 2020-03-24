import {
    AppBar,
    Card,
    CardContent,
    CardHeader,
    Icon,
    IconButton,
    Toolbar,
    Typography,
    withStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import {
    GetCreativeSets,
    GetGeocodes,
    UpdateCampaigns
} from "../../../../actions";

import CampaignForm from "../../../../components/Campaigns/CampaignForm/CampaignForm";
import CreativeSetList from "../../../../components/CreativeSets/CreativeSetList/CreativeSetList";
import TabSelector from "../../../../components/tabSelector/TabSelector";

class CampaignAdSets extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const campaign = _.find(props.campaigns, {
            id: this.props.match.params.campaignId
        }) as any;
        props.getGeocodes(props.auth);
        props.getCreativeSets(this.props.match.params.campaignId, props.auth);
        this.state = {
            campaign,
            unlock: false
        };
    }

    public render() {

        const { classes, creativesets, geocodes, match } = this.props;
        const { campaign, unlock } = this.state;

        const tabConfig = [
            { label: "Overview", selected: false, link: match.url.replace("/creativeSet", "") },
            { label: "Ad Sets", selected: true, link: match.url },
        ]


        return (
            <div>
                <TabSelector config={tabConfig} />
                <CardContent>
                    <CreativeSetList creativeSets={creativesets} match={match} />
                </CardContent>
            </div>
        );
    }

    private getLockButton = () => {
        if (!this.state.unlock) {
            return (
                <IconButton onClick={() => this.switchLock()} color="primary">
                    <Icon>lock</Icon>
                </IconButton>
            );
        } else {
            return (
                <IconButton onClick={() => this.switchLock()} color="primary">
                    <Icon>lock_open</Icon>
                </IconButton>
            );
        }
    };

    private async handleSubmit(value: any) {
        console.log(value);
        value.budget = parseFloat(value.budget);
        value.dailyBudget = parseFloat(value.dailyBudget);
        value.dailyCap = parseFloat(value.dailyCap);
        await this.props.update(
            value,
            this.props.auth,
            this.props.match.params.userId
        );
    }

    private switchLock() {
        this.setState({
            unlock: !this.state.unlock
        });
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.authReducer,
    campaigns: state.campaignReducer.campaigns,
    creativesets: state.creativeSetReducer.creativesets,
    geocodes: state.geoCodeReducer.geocodes
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getCreativeSets: (campaignId: string, user: any) =>
        dispatch(GetCreativeSets(campaignId, user)),
    getGeocodes: (user: any) => dispatch(GetGeocodes(user)),
    update: (value: any, user: any, userId: string) =>
        dispatch(UpdateCampaigns(value, user, userId))
});

export default (
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CampaignAdSets)
);
