import {
  withStyles,
  Card,
  CardHeader,
  Icon,
  CardContent,
  Button
} from "@material-ui/core";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { CSVLink, CSVDownload } from "react-csv";
import { Text } from "../Text/Text";
import axios from "axios";

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
            backgroundColor: "rgba(75,192,192,0.4)",
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
            pointRadius: 1
          },
          {
            backgroundColor: "rgba(192,75,192,0.4)",
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
            pointRadius: 1
          },
          {
            backgroundColor: "rgba(192,192,75,0.4)",
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
            pointRadius: 1
          },
          {
            backgroundColor: "rgba(192,192,192,0.4)",
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
            pointRadius: 1
          },
          {
            backgroundColor: "rgba(192,75,75,0.4)",
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
            pointRadius: 1
          }
        ],
        labels: [] as any[]
      };
      if (report) {
        report.records = _.sortBy(report.records, dateObj => {
          return moment(dateObj.confirmationsDate).unix();
        });
        for (const record of report.records) {
          const label = moment(record.confirmationsDate).format("MMMM Do HA");
          let i = _.findIndex(dataObject.labels, o => {
            return o === label;
          });
          if (i < 0) {
            dataObject.labels.push(label);
            dataObject.datasets[0].data.push(record.confirmationsCount);
            dataObject.datasets[1].data.push(0);
            dataObject.datasets[2].data.push(0);
            dataObject.datasets[3].data.push(0);
            dataObject.datasets[4].data.push(0);
            i = dataObject.labels.length - 1;
          } else {
            dataObject.datasets[0].data[i] =
              dataObject.datasets[0].data[i] + record.confirmationsCount;
          }

          const dataset = _.find(dataObject.datasets, {
            label: record.confirmationsType
          });
          if (dataset) {
            if ((dataset as any).data[i]) {
              (dataset as any).data[i] =
                (dataset as any).data[i] + record.confirmationsCount;
            } else {
              (dataset as any).data[i] = record.confirmationsCount;
            }
          }
        }
      }
      return dataObject;
    };

    const doughnutData = () => {
      const dataObject = {
        datasets: [
          {
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            data: [] as any,
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
          }
        ],
        labels: [] as any
      };
      if (report) {
        for (const record of report.records) {
          const type = record.confirmationsType;
          const i = _.findIndex(dataObject.labels, o => {
            return o === type;
          });
          if (i < 0) {
            dataObject.labels.push(type);
            dataObject.datasets[0].data.push(record.confirmationsCount);
          } else {
            dataObject.datasets[0].data[i] =
              dataObject.datasets[0].data[i] + record.confirmationsCount;
          }
        }
      }
      return dataObject;
    };

    const getActionButtons = (campaign) => {
      return (
        <React.Fragment>
          <Button onClick={() => { this.downloadCSV(campaign) }} color="primary">
            <Icon>get_app</Icon> Download CSV
          </Button>
        </React.Fragment>
      );
    };

    return (
      <div className={classes.root}>
        {campaign && (
          <Card className={classes.infoCard}>
            <CardHeader action={getActionButtons(campaign)} />
            <CardContent>
              <Card className={classes.infoCard}>
                <Text
                  style={{ margin: "16px" }}
                  fontFamily={"Poppins"}
                  sizes={[24, 24, 24, 24, 24]}
                >
                  Daily Delivery
                </Text>
                <CardContent>
                  <Line
                    data={lineData as any}
                    height={300}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </CardContent>
              </Card>
              <Card className={classes.infoCard}>
                <Text
                  style={{ margin: "16px" }}
                  fontFamily={"Poppins"}
                  sizes={[24, 24, 24, 24, 24]}
                >
                  Performance Metrics
                </Text>
                <CardContent>
                  <Doughnut
                    data={doughnutData}
                    height={300}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  async downloadCSV(campaign) {

    axios(`${process.env.REACT_APP_SERVER_ADDRESS}/report/campaign/csv/${campaign.id}`, {
      headers: {
        "Authorization": `Bearer ${this.props.auth.accessToken}`,
        "-x-user": this.props.auth.id,
        "Content-Type": "text/csv",
      }
    })
      .then(response => {
        const file = new Blob(
          [response.data],
          { type: 'text/csv', endings: 'transparent' });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', `${campaign.name}.csv`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
      });
  }

}

export default withStyles(styles)(PerformancesCharts);
