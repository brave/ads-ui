import { withStyles } from "material-ui";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import CampaignList from "./CampaignList/CampaignList";
import CampaignNew from "./CampaignNew/CampaignNew";
import CampaignView from "./CampaignView/CampaignView";

import { styles } from "./Campaign.style";

class Campaigns extends React.Component<any, any> {
  public render() {
    const { match, classes } = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          <Route exact path={match.url} component={CampaignList} />
          <Route exact path={match.url + "/new"} component={CampaignNew} />
          <Route exact path={match.url + "/:id"} component={CampaignView} />
          <Redirect to={match.url} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(Campaigns);
