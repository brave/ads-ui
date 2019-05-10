import { withStyles, Card, CardHeader, Icon, CardContent, Button } from "@material-ui/core";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { CSVLink, CSVDownload } from "react-csv";

import { styles } from "./PerformancesCharts.style";

class PerformancesCharts extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public csv = "";

  public render() {

    const { classes, campaign, report, advertiser, creatives } = this.props;

    const lineData = () => {
      const dataObject = {
        datasets: [
          {
            data: [] as any[],
            backgroundColor: 'rgba(75,192,192,0.4)',
            label: "Total Confirmations",
            lineTension: 0.1,
            borderCapStyle: "butt",
            borderColor: "rgba(75,192,192,1)",
            borderDash: [] as any[],
            borderDashOffset: 0.0,
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
          {
            backgroundColor: 'rgba(192,75,192,0.4)',
            data: [] as any[],
            label: "view",
            lineTension: 0.1,
            borderCapStyle: "butt",
            borderColor: "rgba(192,75,192,1)",
            borderDash: [] as any[],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#fff",
            pointBorderColor: "rgba(192,75,192,1)",
            pointBorderWidth: 1,
            pointHitRadius: 10,
            pointHoverBackgroundColor: "rgba(192,75,192,1)",
            pointHoverBorderColor: "rgba(192,75,192,1)",
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            pointRadius: 1,
          },
          {
            backgroundColor: 'rgba(192,192,75,0.4)',
            data: [] as any[],
            label: "click",
            lineTension: 0.1,
            borderCapStyle: "butt",
            borderColor: "rgba(192,192,75,1)",
            borderDash: [] as any[],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#fff",
            pointBorderColor: "rgba(192,192,75,1)",
            pointBorderWidth: 1,
            pointHitRadius: 10,
            pointHoverBackgroundColor: "rgba(192,192,75,1)",
            pointHoverBorderColor: "rgba(192,192,75,1)",
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            pointRadius: 1,
          },
          {
            backgroundColor: 'rgba(192,192,192,0.4)',
            data: [] as any[],
            label: "dismiss",
            lineTension: 0.1,
            borderCapStyle: "butt",
            borderColor: "rgba(192,192,192,1)",
            borderDash: [] as any[],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#fff",
            pointBorderColor: "rgba(192,192,192,1)",
            pointBorderWidth: 1,
            pointHitRadius: 10,
            pointHoverBackgroundColor: "rgba(192,192,192,1)",
            pointHoverBorderColor: "rgba(192,192,192,1)",
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            pointRadius: 1,
          },
          {
            backgroundColor: 'rgba(192,75,75,0.4)',
            data: [] as any[],
            label: "landed",
            lineTension: 0.1,
            borderCapStyle: "butt",
            borderColor: "rgba(192,75,75,1)",
            borderDash: [] as any[],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#fff",
            pointBorderColor: "rgba(192,75,75,1)",
            pointBorderWidth: 1,
            pointHitRadius: 10,
            pointHoverBackgroundColor: "rgba(192,75,75,1)",
            pointHoverBorderColor: "rgba(192,75,75,1)",
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            pointRadius: 1,
          },
        ],
        labels: [] as any[],
      };
      if (report) {
        report.reports = _.sortBy(report.reports, (dateObj) => {
          return moment(dateObj.confirmationsDate).unix();
        });
        for (const record of report.reports) {
          const label = moment(record.confirmationsDate).format("MMMM Do HA");
          let i = _.findIndex(dataObject.labels, (o) => {
            return o === label;
          });
          if (i < 0) {
            dataObject.labels.push(label);
            dataObject.datasets[0].data.push(record.count);
            dataObject.datasets[1].data.push(0);
            dataObject.datasets[2].data.push(0);
            dataObject.datasets[3].data.push(0);
            dataObject.datasets[4].data.push(0);
            i = dataObject.labels.length - 1;
          } else {
            dataObject.datasets[0].data[i] = dataObject.datasets[0].data[i] + record.count;
          }

          const dataset = _.find(dataObject.datasets, {
            label: record.confirmationsType,
          });
          if (dataset) {
            if ((dataset as any).data[i]) {
              (dataset as any).data[i] = (dataset as any).data[i] + record.count;
            } else {
              (dataset as any).data[i] = record.count;
            }
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

    const generateCSV = () => {
      const data: any = {};
      if (report) {
        for (const record of report.reports) {
          const confirmationsDate = record.confirmationsDate;

          const confirmationDate = data[confirmationsDate]
          if (confirmationDate) {
            const creativeInstanceId = confirmationDate[record.creativeInstanceId];
            if (creativeInstanceId) {
              const confirmationType = creativeInstanceId[record.confirmationsType];
              if (confirmationType) {
                confirmationType.count += record.count;
              } else {
                confirmationDate[record.creativeInstanceId][record.confirmationsType] = {
                  count: record.count,
                };
              }
            } else {
              const creative: any = _.find(creatives, { id: record.creativeId });
              confirmationDate[record.creativeInstanceId] = {
                advertiserName: advertiser.name,
                creativeTitle: creative.title,
                creativeBody: creative.body,
                campaignName: campaign.name,
              };
              confirmationDate[record.creativeInstanceId][record.confirmationsType] = {
                count: record.count,
              };
            }
          } else {
            const creative: any = _.find(creatives, { id: record.creativeId });
            data[confirmationsDate] = {};
            data[confirmationsDate][record.creativeInstanceId] = {
              advertiserName: advertiser.name,
              creativeTitle: creative.payload.title,
              creativeBody: creative.payload.body,
              campaignName: campaign.name,
            };
            data[confirmationsDate][record.creativeInstanceId][record.confirmationsType] = {
              count: record.count,
            };
          }
        }
      }

      this.csv = "Day/Hour,Advertiser Name,Campaign Name,Creative Instance ID,Creative Title,Creative Body,View Counts,Click Counts,Landed Counts,Dismissed Counts";
      _.forEach(data, (d, i) => {
        _.forEach(d, (d2: any, i2: string) => {
          this.csv += `\n${i},`;
          this.csv += `${d2.advertiserName},`;
          this.csv += `${d2.campaignName},`;
          this.csv += `${i2},`;
          this.csv += `${d2.creativeTitle},`;
          this.csv += `${d2.creativeBody},`;
          this.csv += `${d2.view?d2.view.count:0},`;
          this.csv += `${d2.click?d2.click.count:0},`;
          this.csv += `${d2.landed?d2.landed.count:0},`;
          this.csv += `${d2.dismiss?d2.dismiss.count:0},`;
        });
      });
      return true;
    };

    const getActionButtons = () => {
      return (
        <React.Fragment>
          {campaign && campaign.name &&
            <CSVLink className={classes.csv} filename={`campaign-${campaign.name}.csv`} data={this.csv}>
              <Button color="primary">
                <Icon>get_app</Icon> Download CSV
          </Button>
            </CSVLink>
          }
        </React.Fragment>
      )
    };

    generateCSV();

    return (
      <div className={classes.root}>
        {campaign &&
          <Card className={classes.infoCard}>
            <CardHeader action={getActionButtons()} />
            <CardContent>
              <Card className={classes.infoCard}>
                <CardHeader title="Daily Delivery" />
                <CardContent>
                  <Line data={lineData as any} height={300} options={{
                    maintainAspectRatio: false,
                  }} />
                </CardContent>
              </Card>
              <Card className={classes.infoCard}>
                <CardHeader title="Performance Metrics" />
                <CardContent>
                  <Doughnut data={doughnutData} height={300} options={{
                    maintainAspectRatio: false,
                  }} />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        }
      </div>
    );
  }
}

export default withStyles(styles)(PerformancesCharts);
