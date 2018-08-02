import { withStyles } from "@material-ui/core";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import UserList from "../../components/Users/UserList/UserList";
// import UserNew from "../../components/Users/UserNew/UserNew";
// import UserView from "./UserView/UserView";

import { styles } from "./User.style";

class Campaigns extends React.Component<any, any> {
  public render() {
    const { match, classes } = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          <Route exact path={match.url} component={UserList} />
          {/* <Route exact path={match.url + "/new"} component={UserNew} /> */}
          {/* <Route exact path={match.url + "/:id"} component={UserView} /> */}
          <Redirect to={match.url} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(Campaigns);
