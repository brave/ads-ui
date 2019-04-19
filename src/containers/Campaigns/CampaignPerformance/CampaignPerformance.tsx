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
import moment from "moment";
import { Doughnut, Line } from "react-chartjs-2";
import { connect } from "react-redux";

import {
  GetReports,
} from "../../../actions";

import { styles } from "./CampaignPerformance.style";

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
    console.log(campaign);

    const lineData = () => {
      const dataObject = {
        datasets: [
          {
            backgroundColor: "rgba(75,192,192,0.4)",
            borderCapStyle: "butt",
            borderColor: "rgba(75,192,192,1)",
            borderDash: [] as any[],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            data: [] as any[],
            fill: false,
            label: "Campaign Confirmation",
            lineTension: 0.1,
            pointBackgroundColor: "#fff",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBorderWidth: 1,
            pointHitRadius: 10,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            pointRadius: 1,
          },
        ],
        labels: [] as any[],
      };
      const report = _.find(reports, { campaignId: this.state.campaign }) as any;
      if (report) {
        report.reports = _.sortBy(report.reports, (dateObj) => {
          return new Date(dateObj.confirmationDate);
        });
        for (const record of report.reports) {
          const label = moment(record.confirmationsDate).format("MMMM Do HA");
          const i = _.findIndex(dataObject.labels, (o) => {
            return o === label;
          });
          if (i < 0) {
            dataObject.labels.push(label);
            dataObject.datasets[0].data.push(record.count);
          } else {
            dataObject.datasets[0].data[i] = dataObject.datasets[0].data[i] + record.count;
          }
        }
      }
      return dataObject;
    };

    const doughnutData = () => {
      const dataObject = {
        datasets: [{
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
          ],
          data: [] as any,
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
          ],
        }],
        labels: [] as any,
      };
      const report = _.find(reports, { campaignId: this.state.campaign }) as any;
      if (report) {
        for (const record of report.reports) {
          const type = record.confirmationsType;
          const i = _.findIndex(dataObject.labels, (o) => {
            return o === type;
          });
          if (i < 0) {
            dataObject.labels.push(type);
            dataObject.datasets[0].data.push(record.count);
          } else {
            dataObject.datasets[0].data[i] = dataObject.datasets[0].data[i] + record.count;
          }
        }
      }
      return dataObject;
    };


    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5">{campaign.name}</Typography>
          </Toolbar>
        </AppBar>
        <Card className={classes.infoCard}>
          <CardHeader title="Timeline" />
          <CardContent className={classes.content}>
            <div>
              {this.state.campaign !== "" &&
                <Line data={lineData as any} height={300} options={{
                  maintainAspectRatio: false,
                }} />
              }
            </div>
            <div>
              {this.state.campaign !== "" &&
                <Doughnut data={doughnutData} height={300} options={{
                  maintainAspectRatio: false,
                }} />
              }
            </div>
          </CardContent>
        </Card>
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
