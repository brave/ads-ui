import { withStyles } from "@material-ui/core";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AdvertiserNew from "../../components/Advertisers/AdvertiserNew/AdvertiserNew";

import UserList from "../../components/Users/UserList/UserList";
import UserNew from "../../components/Users/UserNew/UserNew";
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
          <Route exact path={match.url + "/new"} component={UserNew} />
          <Route exact path={match.url + "/:id"} component={UserView} />
          <Route exact path={match.url + "/:id/advertiser/new"} component={AdvertiserNew} />
          <Route exact path={match.url + "/:id/advertiser/:advertiserId"} component={AdvertiserView} />
          <Redirect to={match.url} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(Users);
