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
import Dashboard from "../../Dashboard/Admin/Dashboard";
import Users from "../../Users/Users";

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
      <div className={classes.root}>
        <AppBar />
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open={false}
            classes={{
              docked: classNames(classes.docked),
              paper: classNames(
                classes.drawerPaper,
                !drawer.open && classes.drawerPaperClose
              )
            }}
          >
            <div className={classes.toolbar} />
            <Divider />
            {drawerItems}
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <Drawer variant="persistent" anchor="left" open={drawer.open}>
            <div className={classes.toolbar} />
            <Divider />
            {drawerItems}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path={match.url + "/dashboard"} component={Dashboard} />
            <Route path={match.url + "/users"} component={Users} />
            <Redirect to={match.url + "/dashboard"} />
          </Switch>
        </main>
      </div>
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
