import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Text } from "../../../../../../components/Text/Text";
import * as S from "./Overview.style";
import * as Highcharts from "highcharts/highmaps";
import HighchartsReact from 'highcharts-react-official'
import Section from "../../../../../../components/section/Section";

import { fetchData, processData, } from "./lib/Library";

import CampaignsPerCountryTable from "./components/CampaignsPerCountryTable/CampaignsPerCountryTable";


class Overview extends React.Component<any, any> {
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
    let data = await fetchData(this.props.auth.accessToken);
    let processedData = processData(data);
    this.setData(processedData);
  }

  public setData(processedData) {
    this.setState(processedData)
  }

  public render() {
    return (
      !this.state.loading &&
      <React.Fragment>
        <Section header={"Key Statistics"}>
          {renderStat("Users", this.state.userCount)}
          {renderStat("Campaigns", this.state.campaignCount)}
          {renderStat("Confirmations", this.state.confirmationCount)}
          {renderStat("% Campaigns in BAT", `${this.state.percentCampaignsBAT}%`)}
        </Section>
        <Section header={"Active Campaigns"} items={2}>
          <CampaignsPerCountryTable data={this.state.campaignsPerCountryTableData} />
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'mapChart'}
            options={this.state.campaignsPerCountryChartOptions}
          />
        </Section>
      </React.Fragment>
    );
  }
}

function renderStat(header, content) {
  return (
    <React.Fragment>
      <Text fontFamily={"Muli"} sizes={[20, 20, 16, 16, 14]}>
        {header}
      </Text>
      <Text fontFamily={"Poppins"} sizes={[18, 18, 24, 24, 24]}>
        {content}
      </Text>
    </React.Fragment>
  )
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview);


