import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import AppBar from "../../components/AppBar/AppBar";
import SideBar from "../../components/SideBar/SideBar";
import Dashboard from "./views/dashboard/Dashboard";
import Users from "../../containers/Users/Users";
import Campaigns from "../../containers/Campaigns/Campaigns";

import * as S from "./Admin.style";
import { styles } from "./Admin.style";

class Admin extends React.Component<any, any> {
  public render(): any {
    const { auth, classes, drawer, match } = this.props;
    if (
      !auth ||
      !auth.signedIn ||
      !auth.emailVerified ||
      auth.role !== "admin"
    ) {
      return <Redirect to="/a" />;
    }
    return (
      <S.Container>
        <AppBar />
        <S.Content>
          <SideBar type={"admin"} match={match} />
          <S.Main>
            <Switch>
              <Route path={match.url + "/dashboard"} component={Dashboard} />
              <Route path={match.url + "/users"} component={Users} />
              <Route path={match.url + "/campaigns"} component={Campaigns} />
              <Redirect to={match.url + "/dashboard"} />
            </Switch>
          </S.Main>
        </S.Content>
      </S.Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  drawer: state.drawerReducer
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(Admin)
);
