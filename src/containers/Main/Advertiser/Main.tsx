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
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import { CloseDrawer } from "../../../actions";
import AppBar from "../../../components/AppBar/AppBar";
import Campaigns from "../../Campaigns/Campaigns";
import Creatives from "../../Creatives/Creatives";
import Dashboard from "../../Dashboard/Advertiser/Dashboard";
import Invoices from "../../Invoices/Invoices";
import Performances from "../../Performances/Performances";
import Preferences from "../../Preferences/Preferences";
import SideBar from "../../../components/SideBar/SideBar";

import * as S from "./Main.style";
import { styles } from "./Main.style";
import App from "../../../App";

const mainStyle = {
  padding: "24px",
  height: "100%",
  width: "1200px",
  marginLeft: "auto",
  marginRight: "auto",
  overflow: "scroll"
};

class Main extends React.Component<any, any> {
  public render(): any {
    const { advertisers, auth, classes, match } = this.props;
    const activeAdvertiser = _.find(advertisers, { state: "active" });
    if (
      !auth ||
      !auth.signedIn ||
      !auth.emailVerified ||
      (auth.role !== "user" && !activeAdvertiser)
    ) {
      return <Redirect to="/a" />;
    }

    return (
      <S.Container>
        <AppBar />
        <S.Content>
          <SideBar type={"user"} match={match} />
          <main style={mainStyle}>
            <Switch>
              {/* <Route path={match.url + "/dashboard"} component={Dashboard} />
            <Route path={match.url + "/creatives"} component={Creatives} />
            <Route path={match.url + "/campaigns"} component={Campaigns} /> */}
              <Route
                path={match.url + "/performances"}
                component={Performances}
              />
              {/* <Route path={match.url + "/invoices"} component={Invoices} /> */}
              {/* <Route path={match.url + "/preferences"} component={Preferences} /> */}
              <Redirect to={match.url + "/performances"} />
            </Switch>
          </main>
        </S.Content>
      </S.Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
  drawer: state.drawerReducer
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  CloseDrawer: () => dispatch(CloseDrawer({})),
  Signout: () => dispatch(CloseDrawer({}))
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
