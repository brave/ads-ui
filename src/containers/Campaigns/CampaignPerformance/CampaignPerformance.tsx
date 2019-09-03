import { AppBar, Toolbar, Typography, withStyles } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { GetReports } from "../../../actions";

import { styles } from "./CampaignPerformance.style";
import PerformancesCharts from "../../../components/Performances/PerformancesCharts";
import CampaignReport from "../../../components/Campaigns/CampaignReport/CampaignReport";

class CampaignPerformance extends React.Component<any, any> {
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
    this.props.GetReports(this.props.auth, this.props.match.params.campaignId);
  }

  public render() {
    const { auth, classes, reports, advertisers, creatives } = this.props;
    const { campaign } = this.state;
    const report = _.find(reports, { campaignId: campaign.id }) as any;
    const advertiser = _.find(advertisers, {
      id: this.props.match.params.advertiserId
    });

    return (
      
      <div className={classes.root}>
        {
          !report ? <div></div> :
        <CampaignReport
          auth={auth}
          campaign={campaign}
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
  advertisers: state.advertiserReducer.advertisers
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetReports: (auth: any, campaignId: string) =>
    dispatch(GetReports(auth, campaignId))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CampaignPerformance)
);
