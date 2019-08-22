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
import { Link, Redirect, Route, Switch } from "react-router-dom";

import AppBar from "../../../components/AppBar/AppBar";
import SideBar from "../../../components/SideBar/SideBar";
import Dashboard from "../../Dashboard/Admin/Dashboard";
import Users from "../../Users/Users";
import Campaigns from "../../Campaigns/Campaigns";

import * as S from "./Main.style";
import { styles } from "./Main.style";

class Main extends React.Component<any, any> {
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
  connect(mapStateToProps)(Main)
);
