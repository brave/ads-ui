import { withStyles } from "@material-ui/core";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AdvertiserNew from "../../components/Advertisers/AdvertiserNew/AdvertiserNew";

import CampaignNew from "../../components/Campaigns/CampaignNew/CampaignNew";
import CreativesNew from "../../components/Creatives/CreativesNew/CreativesNew";
import CreativeSetNew from "../../components/CreativeSets/CreativeSetNew/CreativeSetNew";
import UserList from "../../components/Users/UserList/UserList";
import UserNew from "../../components/Users/UserNew/UserNew";
import CreativeInstanceNew from "../../components/CreativeInstances/CreativeInstanceNew/CreativeInstanceNew";
import CreativeInstanceView from "../Campaigns/CreativeInstanceView/CreativeInstanceView";

import CampaignView from "../Campaigns/CampaignView/CampaignView";
import CreativeSetView from "../Campaigns/CreativeSetView/CreativeSetView";
import CreativesView from "../Creatives/CreativesView/CreativesView";
import InvoiceView from "../Invoices/InvoicesView/InvoiceView";
import AdvertiserView from "./AdvertiserView/AdvertiserView";
import UserView from "./UserView/UserView";


import { styles } from "./User.style";

class Users extends React.Component<any, any> {
  public render() {
    const { match, classes } = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          <Route exact path={match.url} component={UserList} />
          {/* <Route exact path={match.url + "/new"} component={UserNew} /> */}
          <Route exact path={match.url + "/:userId"} component={UserView} />
          <Route exact path={match.url + "/:userId/advertiser/new"} component={AdvertiserNew} />
          <Route exact path={match.url + "/:userId/advertiser/:advertiserId"} component={AdvertiserView} />
          <Route exact path={match.url + "/:userId/advertiser/:advertiserId/invoice/:invoiceId"}
            component={InvoiceView} />
          <Route exact path={match.url + "/:userId/advertiser/:advertiserId/campaign/new"}
            component={CampaignNew} />
          <Route exact path={match.url + "/:userId/advertiser/:advertiserId/campaign/:campaignId"}
            component={CampaignView} />
          <Route exact path={match.url + "/:userId/advertiser/:advertiserId/campaign/:campaignId/creativeSet/new"}
            component={CreativeSetNew} />
          <Route exact path={
            match.url + "/:userId/advertiser/:advertiserId/campaign/:campaignId/creativeSet/:creativeSetId"}
            component={CreativeSetView} />
          <Route exact path={match.url + "/:userId/advertiser/:advertiserId/campaign/:campaignId/creativeSet/:creativeSetId/creativeInstance/new"}
            component={CreativeInstanceNew} />
          <Route exact path={match.url + "/:userId/advertiser/:advertiserId/campaign/:campaignId/creativeSet/:creativeSetId/creativeInstance/:creativeInstanceId"}
            component={CreativeInstanceView} />
          <Route exact path={match.url + "/:userId/advertiser/:advertiserId/creative/new"}
            component={CreativesNew} />
          <Route exact path={match.url + "/:userId/advertiser/:advertiserId/creative/:creativeId"}
            component={CreativesView} />
          <Redirect to={match.url} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(Users);
