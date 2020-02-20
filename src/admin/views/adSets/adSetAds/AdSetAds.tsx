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
import React from "react";
import { connect } from "react-redux";

import {
    GetCreativeInstances, GetSegments, UpdateCreativeSets, GetConfirmationTypes,
} from "../../../../actions";

import CreativeInstanceList from "../../../../components/CreativeInstances/CreativeInstanceList/CreativeInstanceList";
import CreativeSetForm from "../../../../components/CreativeSets/CreatoveSetForm/CreativeSetForm";
import TabSelector from "../../../../components/tabSelector/TabSelector";

class AdSetAds extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const campaign = _.find(props.campaigns, { id: this.props.match.params.campaignId }) as any;
        const creativeSet = _.find(props.creativeSets, { id: this.props.match.params.creativeSetId }) as any;
        props.getSegments(props.auth);
        props.getConfirmationTypes(props.auth);
        props.getCreativeInstances(creativeSet.id, props.auth);
        this.state = {
            campaign,
            creativeSet,
            open: false,
            unlock: false,
        };
    }

    public render() {
        const { classes, segments, creativeInstances, match } = this.props;
        const { campaign, creativeSet, unlock } = this.state;

        const tabConfig = [
            { label: "Overview", selected: false, link: match.url.replace("/ads", "") },
            { label: "Ads", selected: true, link: match.url },
        ]
        return (
            <div>
                <TabSelector config={tabConfig} />
                <CreativeInstanceList match={match} creativeInstances={creativeInstances} />
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
    }

    private async handleSubmit(value: any) {
        value.totalMax = Number(value.totalMax).valueOf();
        value.perDay = Number(value.perDay).valueOf();
        await this.props.update(this.state.campaign.id, value, this.props.auth);
    }

    private switchLock() {
        this.setState({
            unlock: !this.state.unlock,
        });
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.authReducer,
    campaigns: state.campaignReducer.campaigns,
    creativeInstances: state.creativeInstanceReducer.creativeInstances,
    creativeSets: state.creativeSetReducer.creativesets,
    creatives: state.creativeReducer.creatives,
    segments: state.segmentReducer.segments,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getCreativeInstances: (creativeSetId: string, user: any) => dispatch(GetCreativeInstances(creativeSetId, user)),
    getSegments: (user: any) => dispatch(GetSegments(user)),
    getConfirmationTypes: (user: any) => dispatch(GetConfirmationTypes(user)),
    update: (campaignId: string, value: any, user: any) => dispatch(UpdateCreativeSets(campaignId, value, user)),
});

export default (connect(mapStateToProps, mapDispatchToProps)(AdSetAds));
