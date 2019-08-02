import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Card from "../../../components/Card/Card";
import { Text } from "../../../components/Text/Text";
import CampaignTable from "../../../components/Campaigns/CampaignTable/CampaignTable";
import * as S from "./Dashboard.style";
import axios from "axios";

import { GetCampaigns } from "../../../actions";

interface IDashboardState {
  data: any;
}

class Dashboard extends React.Component<any, IDashboardState> {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  public componentDidMount() {
    this.props.GetAllCampaigns(this.props.auth);
    this.fetchCampaigns();
  }

  async fetchCampaigns() {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/report/campaign/list`, {
      headers: {
        "Authorization": `Bearer ${this.props.auth.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    this.setState({ data: response.data })
  }

  public render() {
    return (
      <div>
        <Card>
          <S.CardHeader>
            <Text fontFamily={"Poppins"} sizes={[20, 20, 20, 20, 20]}>
              Campaigns
            </Text>
          </S.CardHeader>
          <CampaignTable campaigns={null} match={null} auth={this.props.auth} data={this.state.data} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  campaigns: state.campaignReducer.campaigns
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetAllCampaigns: (auth: any) => dispatch(GetCampaigns(auth))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
