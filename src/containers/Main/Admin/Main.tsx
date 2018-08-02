import {
  Divider,
  Drawer,
  Hidden,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from "@material-ui/core";
import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import { CloseDrawer } from "../../../actions";
import Appbar from "../../../components/Appbar/Appbar";
import Dashboard from "../../Dashboard/Admin/Dashboard";
import Users from "../../Users/Users";

import { styles } from "./Main.style";

class Main extends React.Component<any, any> {

  public render(): any {
    if (!this.props.user || !this.props.user.signedIn) {
      return (<Redirect to="/auth/signin" />);
    }
    const { classes } = this.props;
    const drawerItems = (
      <List>
        <Link to="/admin/main/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Icon>dashboard</Icon>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/admin/main/users" className={classes.link}>
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
        <Appbar />
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" open={false} classes={{
            paper: classNames(classes.drawerPaper, !this.props.drawer.open && classes.drawerPaperClose),
          }}>
            <div className={classes.toolbar}>
            </div>
            <Divider />
            {drawerItems}
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <Drawer variant="persistent" anchor="left" open={this.props.drawer.open}>
            <div className={classes.toolbar}>
            </div>
            <Divider />
            {drawerItems}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path={this.props.match.url + "/dashboard"} component={Dashboard} />
            <Route path={this.props.match.url + "/users"} component={Users} />
            <Redirect to={this.props.match.url + "/dashboard"} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  drawer: state.drawerReducer,
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  CloseDrawer: () => dispatch(CloseDrawer({})),
  Signout: () => dispatch(CloseDrawer({})),
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Main));
