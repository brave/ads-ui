import { withStyles } from "@material-ui/core";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import CampaignList from "../../components/Campaigns/CampaignList/CampaignList";
import CampaignNew from "../../components/Campaigns/CampaignNew/CampaignNew";
import CampaignView from "./CampaignView/CampaignView";

import CreativeSetNew from "../../components/CreativeSets/CreativeSetNew/CreativeSetNew";
import CreativeSetView from "./CreativeSetView/CreativeSetView";

import { styles } from "./Campaign.style";

class Campaigns extends React.Component<any, any> {
  public render() {
    const { match, classes } = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          <Route exact path={match.url} component={CampaignList} />
          <Route exact path={match.url + "/new"} component={CampaignNew} />
          <Route exact path={match.url + "/:campaignId"} component={CampaignView} />
          <Route exact path={match.url + "/:campaignId/creativeSet/new"} component={CreativeSetNew} />
          <Route exact path={match.url + "/:campaignId/creativeSet/:creativeSetId"} component={CreativeSetView} />
          <Redirect to={match.url} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(Campaigns);
