import { Button, Icon, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { GetCampaigns } from "../../../actions";

import axios from "axios";
import CampaignTable from "../CampaignTable/CampaignTable";

import * as S from "./CampaignList.style";
import Card from "../../Card/Card";
import { Text } from "../../Text/Text";

import {
  GetCampaignList,
} from "../../../actions";

interface ICampaignListState {
  data: any;
}

class CampaignList extends React.Component<any, ICampaignListState> {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  public componentDidMount() {
    this.fetchCampaigns();
    this.props.GetCampaignList(this.props.auth);
    console.log("hehe")
    console.log(this.props.campaignList)
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
    const { campaignList } = this.props;
    return (
      <div>
        <Card>
          <S.CardHeader>
            <Text fontFamily={"Poppins"} sizes={[20, 20, 20, 20, 20]}>
              Campaigns
              {campaignList}
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
  campaigns: state.campaignReducer.campaigns,
  campaignList: state.campaignListReducer.campaignList
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetCampaignList: (auth: any) => dispatch(GetCampaignList(auth))
});

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CampaignList);
