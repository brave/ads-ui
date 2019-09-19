import React from "react";
import { connect } from "react-redux";

import CampaignTable from "../CampaignTable/CampaignTable";

import * as S from "./CampaignList.style";
import Section from "../../section/Section";
import { Text } from "../../Text/Text";

import {
  GetCampaignList,
} from "../../../actions";


class CampaignList extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  public componentDidMount() {
    this.props.GetCampaignList(this.props.auth);
  }

  public render() {
    const { match } = this.props;
    const { campaignList } = this.props;
    return (
      <div>
        {/* <S.CardHeader>
            <Text fontFamily={"Poppins"} sizes={[20, 20, 32, 32, 32]}>
              Campaigns
            </Text>
          </S.CardHeader> */}
        <Section header={"Campaigns"}><CampaignTable match={match} data={campaignList} /></Section>
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
