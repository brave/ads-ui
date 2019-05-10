import { FormControl, InputLabel, MenuItem, Select, Typography, withStyles, AppBar, Toolbar, Card, CardHeader, CardContent } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import { GetCampaigns, GetReports, GetCreatives } from "../../actions";

import { styles } from "./Performances.style";

import PerformancesCharts from "../../components/Performances/PerformancesCharts";

class Performances extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      campaign: "",
      campaignName: "",
    };
  }

  public componentDidMount() {
    this.props.GetCampaigns(this.props.auth);
    this.props.GetCreatives(this.props.auth);
  }

  public handleChange = async (event: any) => {
    const campaign: any = _.find(this.props.campaigns, { id: event.target.value });
    this.setState({
      campaignName: campaign.name,
    });
    await this.props.GetReports(this.props.auth, event.target.value);
    this.setState({ campaign: event.target.value });
  }

  public render() {

    const { classes, campaigns, reports, creatives, advertisers } = this.props;

    const report = _.find(reports, { campaignId: this.state.campaign }) as any;
    const campaign = _.find(campaigns, { id: this.state.campaign }) as any;

    const listItems = campaigns.map((item: any) => {
      return (
        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
      );
    });

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">Performance</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Filter" />
          <CardContent>
            <FormControl className={classes.formControl}>
              <InputLabel>Select Campaign</InputLabel>
              <Select inputProps={{
                name: "campaign",
              }} onChange={this.handleChange} value={this.state.campaign} name="role">
                {listItems}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
        <PerformancesCharts campaign={campaign} report={report} advertiser={advertisers[0]} creatives={creatives}/>
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
});

const mapDispathToProps = (dispatch: any, ownProps: any) => ({
  GetCampaigns: (auth: any) => dispatch(GetCampaigns(auth)),
  GetCreatives: (auth: any) => dispatch(GetCreatives(auth)),
  GetReports: (auth: any, campaignId: string) => dispatch(GetReports(auth, campaignId)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispathToProps)(Performances));
