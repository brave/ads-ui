import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AdvertiserNew from "../../../../components/Advertisers/AdvertiserNew/AdvertiserNew";
import AdvertiserView from "../../../../containers/Users/AdvertiserView/AdvertiserView";

// import CampaignNew from "../../components/Campaigns/CampaignNew/CampaignNew";
// import CreativesNew from "../../components/Creatives/CreativesNew/CreativesNew";
// import CreativeSetNew from "../../components/CreativeSets/CreativeSetNew/CreativeSetNew";
import UserList from "../../../../components/Users/UserList/UserList";

// import CreativeInstanceNew from "../../components/CreativeInstances/CreativeInstanceNew/CreativeInstanceNew";
// import CreativeInstanceView from "../Campaigns/CreativeInstanceView/CreativeInstanceView";
// import CampaignPerformance from "../Campaigns/CampaignPerformance/CampaignPerformance";
// import CampaignReport from "../../components/Campaigns/CampaignReport/CampaignReport";

// import CampaignView from "../Campaigns/CampaignView/CampaignView";
// import CreativeSetView from "../Campaigns/CreativeSetView/CreativeSetView";
// import CreativesView from "../Creatives/CreativesView/CreativesView";
// import InvoiceView from "../Invoices/InvoicesView/InvoiceView";

import UserView from "../../../../containers/Users/UserView/UserView";

class Users extends React.Component<any, any> {
  public render() {
    const { match } = this.props;
    return (
      <div>
        <UserList match={match} />
      </div>
    );
  }
}

export default Users;
