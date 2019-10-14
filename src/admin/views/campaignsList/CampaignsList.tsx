import React from "react";
import { connect } from "react-redux";

import CampaignTable from "./components/campaignTable/CampaignTable";
import Section from "../../../components/section/Section";

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
        return (
            <React.Fragment>
                <Section header={"Campaigns"}>
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

