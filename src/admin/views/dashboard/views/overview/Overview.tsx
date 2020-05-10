import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Text } from "../../../../../components/Text/Text";
import * as S from "./Overview.style";
import * as Highcharts from "highcharts/highmaps";
import HighchartsReact from 'highcharts-react-official'
import Section from "../../../../../components/section/Section";
import Context from "../../../../../state/context";
import { withRouter } from 'react-router-dom';

import { fetchData, processData, } from "./lib/Library";

import CampaignsPerCountryTable from "./components/CampaignsPerCountryTable/CampaignsPerCountryTable";


class Overview extends React.Component<any, any> {
  static contextType = Context;
  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    this.initialize();
  }

  public async initialize() {
    this.context.setLoading(true);
    let data = await fetchData(this.props.auth.accessToken);
    let processedData = processData(data);
    console.log(processedData);
    this.setState(processedData, () => {
      this.context.setLoading(false);
    });
  }

  public componentWillUnmount() {
    this.context.setLoading(undefined);
  }

  public render() {
    return (
      this.context.loading === false &&
      <React.Fragment>
        <div style={{ display: "flex", marginBottom: "28px" }}>
          <div style={{ border: "1px solid #e2e2e2", borderRadius: "4px", padding: "28px", marginRight: "28px" }}>
            {renderStat("Users", this.state.userCount)}
          </div>
          <div style={{ border: "1px solid #e2e2e2", borderRadius: "4px", padding: "28px", marginRight: "28px" }}>
            {renderStat("Campaigns", this.state.campaignCount)}
          </div>
          <div style={{ border: "1px solid #e2e2e2", borderRadius: "4px", padding: "28px", marginRight: "28px" }}>
            {renderStat("Confirmations", this.state.confirmationCount)}
          </div>
          <div style={{ border: "1px solid #e2e2e2", borderRadius: "4px", padding: "28px", marginRight: "28px" }}>
            {renderStat("Campaigns Under Review", this.state.campaignsUnderReview)}
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: "28px" }}>
          <div style={{ border: "1px solid #e2e2e2", borderRadius: "4px", padding: "28px", marginRight: "28px" }}>
            <CampaignsPerCountryTable data={this.state.campaignsPerCountryTableData} />
          </div>
          <div style={{ border: "1px solid #e2e2e2", borderRadius: "4px", padding: "28px", marginRight: "28px" }}>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={'mapChart'}
              options={this.state.campaignsPerCountryChartOptions}
            />
          </div>
        </div>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview));


