import React from "react";
import { connect } from "react-redux";

import CampaignTable from "./components/campaignTable/CampaignTable";
import Section from "../../../components/section/Section";

import { Text } from "../../../components/Text/Text";
import TabSelector from "../../../components/tabSelector/TabSelector";

import {
    GetCampaignList,
} from "../../../actions";


class CampaignsList extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    public componentDidMount() {
        this.props.GetCampaignList(this.props.auth);
    }

    public render() {
        const { match } = this.props;
        const { campaignList } = this.props;
        const tabConfig = [
            { label: "Overview", selected: true, link: match.url.replace("/ads", "") },
            { label: "Pacing", selected: false, link: match.url },
            { label: "Approvals", selected: false, link: match.url }
        ]
        return (
            <React.Fragment>
                <TabSelector config={tabConfig} />
                <Section>
                    {/* Filters / Charts will go here */}
                    <CampaignTable match={match} data={campaignList} />
                </Section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.authReducer,
    campaigns: state.campaignReducer.campaigns,
    campaignList: state.campaignListReducer.campaignList
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    GetCampaignList: (auth: any) => dispatch(GetCampaignList(auth))
});

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CampaignsList);

