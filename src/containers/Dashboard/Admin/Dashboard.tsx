import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Card from "../../../components/Card/Card";
import { Text } from "../../../components/Text/Text";
import { Table, TableHeader, HeaderRow, HeaderCell, TableRow, RowCell } from "../../../components/Table/Table";
import * as S from "./Dashboard.style";
import * as Highcharts from "highcharts/highmaps";
import HighchartsReact from 'highcharts-react-official'
import json from "./geo";
import query from "./Queries";

import CampaignsPerCountryTable from "./components/CampaignsPerCountryTable/CampaignsPerCountryTable";


class Dashboard extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  public componentDidMount() {
    this.initialize();
  }

  public async initialize() {
    let data = await this.fetchData();
    let processedData = this.processData(data);
    this.setData(processedData);
  }

  public async fetchData() {
    let url = `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql");
    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.props.auth.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    };

    let response = await fetch(url, options);
    let json = await response.json();
    return json.data;
  }

  public processData(data) {
    console.log(data);
    let processedData = {} as any;

    processedData.campaignCount = data.campaignCount;
    processedData.confirmationCount = data.confirmationCount;
    processedData.userCount = data.userCount;

    processedData.campaignsPerCountryChartOptions =
      processCampaignsPerCountryChartOptions(data.campaignsPerCountry.data);

    processedData.campaignsPerCountryTableData = data.campaignsPerCountry.data;

    processedData.percentCampaignsBAT =
      processPercentCampaignsBAT(data.campaignsPerCurrency.data);

    return {
      loading: false,
      campaignCount: processedData.campaignCount,
      confirmationCount: processedData.confirmationCount,
      userCount: processedData.userCount,
      campaignsPerCountryChartOptions: processedData.campaignsPerCountryChartOptions,
      campaignsPerCountryTableData: processedData.campaignsPerCountryTableData,
      percentCampaignsBAT: processedData.percentCampaignsBAT
    };
  }

  public setData(processedData) {
    this.setState(processedData)
  }

  public render() {
    return (
      !this.state.loading &&
      <div>
        <div style={{ display: "flex", marginTop: "28px", borderBottom: "1px solid #ededed" }}>
          <div style={{ marginRight: "28px", borderBottom: "3px solid #FA8A73", marginBottom: "0px", paddingBottom: "14px" }}>
            <Text fontFamily={"Muli"} sizes={[20, 20, 17, 17, 16]}>
              Overview
            </Text>
          </div>
          <div style={{ marginRight: "28px", borderBottom: "0px solid #FA8A73", marginBottom: "0px", paddingBottom: "14px" }}>
            <Text fontFamily={"Muli"} sizes={[20, 20, 17, 17, 16]}>
              Users
            </Text>
          </div>
          <div style={{ marginRight: "28px", borderBottom: "0px solid #FA8A73", marginBottom: "0px", paddingBottom: "14px" }}>
            <Text fontFamily={"Muli"} sizes={[20, 20, 17, 17, 16]}>
              Campaigns
            </Text>
          </div>
          <div style={{ marginRight: "28px", borderBottom: "0px solid #FA8A73", marginBottom: "0px", paddingBottom: "14px" }}>
            <Text fontFamily={"Muli"} sizes={[20, 20, 17, 17, 16]}>
              Server
            </Text>
          </div>
        </div>

        <Text style={{ marginTop: "42px" }} fontFamily={"Poppins"} sizes={[18, 18, 24, 24, 22]}>Key Statistics</Text>

        <div style={{ display: "flex", marginTop: "30px" }}>
          <div style={{ marginTop: "0px", paddingBottom: "12px", marginRight: "28px", borderRadius: "4px", border: "1px solid #ededed", padding: "28px" }}>
            <Text fontFamily={"Muli"} sizes={[20, 20, 16, 16, 14]}>
              Users
        </Text>
            <Text fontFamily={"Poppins"} sizes={[18, 18, 24, 24, 24]}>
              {this.state.userCount}
            </Text>
          </div>
          <div style={{ marginTop: "0px", paddingBottom: "12px", marginRight: "28px", borderRadius: "4px", border: "1px solid #ededed", padding: "28px" }}>
            <Text fontFamily={"Muli"} sizes={[20, 20, 16, 16, 14]}>
              Campaigns
        </Text>
            <Text fontFamily={"Poppins"} sizes={[18, 18, 24, 24, 24]}>
              {this.state.campaignCount}
            </Text>
          </div>
          <div style={{ marginTop: "0px", paddingBottom: "12px", marginRight: "28px", borderRadius: "4px", border: "1px solid #ededed", padding: "28px" }}>
            <Text fontFamily={"Muli"} sizes={[20, 20, 16, 16, 14]}>
              Confirmations
        </Text>
            <Text fontFamily={"Poppins"} sizes={[18, 18, 24, 24, 24]}>
              {this.state.confirmationCount}
            </Text>
          </div>
          <div style={{ marginTop: "0px", paddingBottom: "12px", marginRight: "28px", borderRadius: "4px", border: "1px solid #ededed", padding: "28px" }}>
            <Text fontFamily={"Muli"} sizes={[20, 20, 16, 16, 14]}>
              % Campaigns in BAT
        </Text>
            <Text fontFamily={"Poppins"} sizes={[18, 18, 24, 24, 24]}>
              {this.state.percentCampaignsBAT}%
            </Text>
          </div>
        </div>
        <div style={{ marginTop: "70px" }}>
          <Text fontFamily={"Poppins"} sizes={[18, 18, 24, 24, 22]}>Active Campaigns</Text>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>

            <div style={{ width: "49%", borderRadius: "4px", border: "1px solid #ededed", padding: "28px" }}>
              <CampaignsPerCountryTable data={this.state.campaignsPerCountryTableData} />
            </div>
            <div style={{ width: "49%", borderRadius: "4px", border: "1px solid #ededed", padding: "28px" }}>
              <HighchartsReact
                highcharts={Highcharts}
                constructorType={'mapChart'}
                options={this.state.campaignsPerCountryChartOptions}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function processPercentCampaignsBAT(data) {
  let BATCount = 25;
  let USDCount = 0;
  data.forEach((entry) => {
    switch (entry.currency) {
      case "USD":
        USDCount += entry.count;
        return;
      case "BAT":
        BATCount += entry.count;
        return;
    }
  });

  return (
    parseFloat(((BATCount / (BATCount + USDCount)) * 100).toFixed(2))
  )
}

function processCampaignsPerCountryChartOptions(data) {
  let chartData: any[] = []
  data.forEach((entry) => {
    chartData.push([
      entry.country.toLowerCase(),
      entry.count
    ]);
  });

  let chartOptions = {
    chart: {
      map: json as any
    },
    credits: {
      enabled: false
    },

    title: {
      text: undefined
    },
    legend: {
      enabled: false
    },

    colorAxis: {
      min: 0
    },
    colors: ['#4C54D2'],
    series: [{
      data: chartData,
      name: 'Campaigns',
      states: {
        hover: {
          color: '#A0A5EB'
        }
      }
    }] as any
  };
  return chartOptions;
}



const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);


