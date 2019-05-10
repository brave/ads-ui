import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import _ from "lodash";
import React from "react";
import moment from "moment";
import { Doughnut, Line } from "react-chartjs-2";
import { connect } from "react-redux";

import {
  GetReports,
} from "../../../actions";

import { styles } from "./CampaignPerformance.style";
import PerformancesCharts from "../../../components/Performances/PerformancesCharts";

class CampaignPerformance extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const campaign = _.find(props.campaigns, { id: this.props.match.params.campaignId }) as any;
    this.state = {
      campaign,
    };
  }

  public componentDidMount() {
    this.props.GetReports(this.props.auth, this.props.match.params.campaignId);
  }

  public render() {
    const { classes, reports } = this.props;
    const { campaign } = this.state;
    const report = _.find(reports, { campaignId: campaign }) as any;


    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">{campaign.name}</Typography>
          </Toolbar>
        </AppBar>
        <PerformancesCharts campaign={campaign} report={report} />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  campaigns: state.campaignReducer.campaigns,
  reports: state.reportReducer.reports,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetReports: (auth: any, campaignId: string) => dispatch(GetReports(auth, campaignId)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CampaignPerformance));
