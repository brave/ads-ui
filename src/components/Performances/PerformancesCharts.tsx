import { withStyles, Card, CardHeader, Icon, CardContent, Button } from "@material-ui/core";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";


import { styles } from "./PerformancesCharts.style";

class PerformancesCharts extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {

    const { classes, campaign, report } = this.props;

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

    const downloadCSV = () => {

    };

    const getActionButtons = () => {
      return (
        <React.Fragment>
          <Button onClick={downloadCSV} color="primary">
            <Icon>get_app</Icon> Download CSV
          </Button>
        </React.Fragment>
      )
    };

    return (
      <div className={classes.root}>
        <Card className={classes.infoCard}>
          <CardHeader action={getActionButtons()} />
          <CardContent>
            <Card className={classes.infoCard}>
              <CardHeader title="Daily Delivery" />
              <CardContent>
                {campaign !== "" &&
                  <Line data={lineData as any} height={300} options={{
                    maintainAspectRatio: false,
                  }} />
                }
              </CardContent>
            </Card>
            <Card className={classes.infoCard}>
              <CardHeader title="Performance Metrics" />
              <CardContent>
                {campaign !== "" &&
                  <Doughnut data={doughnutData} height={300} options={{
                    maintainAspectRatio: false,
                  }} />
                }
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PerformancesCharts);
