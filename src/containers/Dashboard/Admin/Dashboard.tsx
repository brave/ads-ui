import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Card from "../../../components/Card/Card";
import { Text } from "../../../components/Text/Text";
import CampaignTable from "../../../components/Campaigns/CampaignTable/CampaignTable";
import * as S from "./Dashboard.style";

import { GetAllCampaigns } from "../../../actions";

class Dashboard extends React.Component<any, any> {
  public componentDidMount() {
    this.props.GetAllCampaigns(this.props.auth);
  }
  public render() {
    return (
      <div>
        <Card>
          <S.CardHeader>
            <Text fontFamily={"Poppins"} sizes={[24, 24, 24, 24, 24]}>
              Current Campaigns
            </Text>
          </S.CardHeader>
          <CampaignTable campaigns={null} match={null} />
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
  GetAllCampaigns: (auth: any) => dispatch(GetAllCampaigns(auth))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
