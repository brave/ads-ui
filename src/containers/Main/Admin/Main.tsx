import {
  Divider,
  Drawer,
  Hidden,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import AppBar from "../../../components/AppBar/AppBar";
import SideBar from "../../../components/SideBar/SideBar";
import Dashboard from "../../Dashboard/Admin/Dashboard";
import Users from "../../Users/Users";

import * as S from "./Main.style";
import { styles } from "./Main.style";

const mainStyle = {
  padding: "24px",
  width: "1200px",
  marginLeft: "auto",
  marginRight: "auto",
  height: "100%",
  overflow: "scroll"
};

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
    const drawerItems = (
      <List>
        <Link to={match.url + "/dashboard"} className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Icon>dashboard</Icon>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to={match.url + "/users"} className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Icon>person</Icon>
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
      </List>
    );
    return (
      <S.Container>
        <AppBar />
        <S.Content>
          <SideBar type={"admin"} match={match} />
          <main style={mainStyle}>
            <Switch>
              <Route path={match.url + "/dashboard"} component={Dashboard} />
              <Route path={match.url + "/users"} component={Users} />
              <Redirect to={match.url + "/dashboard"} />
            </Switch>
          </main>
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
