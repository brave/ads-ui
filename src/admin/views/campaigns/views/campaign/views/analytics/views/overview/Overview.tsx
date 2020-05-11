import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { GetCampaigns, GetReports, GetAllUser } from "../../../../../../../../../actions";

// Eventually remove this component, this component is what Overview should be. 
import CampaignReport from "./components/campaignReport/CampaignReport";

class Overview extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const campaign = _.find(props.campaigns, {
            id: this.props.match.params.campaignId
        }) as any;
        this.state = {
            campaign
        };
    }

    public componentDidMount() {
        const id = this.props.match.params.userId;
        const user = _.find(this.props.users, (item) => {
            return item.id === id;
        });
        this.props.GetCampaigns(this.props.auth, user.id);
        this.props.GetReports(this.props.auth, this.props.match.params.campaignId);
    }

    public render() {
        const { auth, classes, reports, advertisers, creatives, match } = this.props;
        const { campaign } = this.state;
        const report = _.find(reports, { campaignId: campaign.id }) as any;
        const advertiser = _.find(advertisers, {
            id: this.props.match.params.advertiserId
        });

        return (

            <div>
                {
                    !report ? <div></div> :
                        <CampaignReport
                            auth={auth}
                            campaign={campaign}
                            match={match}
                            report={report}
                            advertiser={advertisers[0]}
                        />
                }
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    auth: state.authReducer,
    campaigns: state.campaignReducer.campaigns,
    reports: state.reportReducer.reports,
    creatives: state.creativeReducer.creatives,
    advertisers: state.advertiserReducer.advertisers,
    users: state.userReducer.users,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    GetCampaigns: (auth: any, userId: string) => dispatch(GetCampaigns(auth, userId)),
    GetReports: (auth: any, campaignId: string) => dispatch(GetReports(auth, campaignId)),
    GetAllUsers: (user: any) => dispatch(GetAllUser(user)),
});

export default (
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Overview)
);
