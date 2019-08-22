import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
  Snackbar,
} from "@material-ui/core";

import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import _ from "lodash";
import { CloseSnackBar as close } from "./actions";

import * as S from "./App.style";

import Authentication from "./containers/Authentication/Authentication";
import AdminMain from "./containers/Main/Admin/Main";
import AdvertiserMain from "./containers/Main/Advertiser/Main";

class App extends React.Component<any, any> {
  private theme = createMuiTheme({
    palette: {
      primary: {
        main: "#fb542b"
      },
      secondary: {
        contrastText: "#ffcc00",
        light: "#0066ff",
        main: "#0044ff"
      }
    },
    typography: {
      useNextVariants: true
    }
  });

  private anchorSettings = {
    horizontal: "left",
    vertical: "bottom"
  } as any;

  public render() {
    const { CloseSnackBar, snackbar } = this.props;

    return (
      <MuiThemeProvider theme={this.theme}>
        <React.Fragment>
          <Switch>
            <Route path="/user/main" component={AdvertiserMain} />
            <Route path="/admin/main" component={AdminMain} />
            <Route path="/auth" component={Authentication} />
            <Route path='/' exact={true} component={() => {
              window.location.href = "https://brave.com/brave-ads-waitlist/";
              return null;
            }} />
            {this.getRedirect()}
          </Switch>
          <Snackbar
            anchorOrigin={this.anchorSettings}
            message={<span>{snackbar.message}</span>}
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={CloseSnackBar}
          />
        </React.Fragment>
        <CssBaseline />
      </MuiThemeProvider>
    );
  }

  private getRedirect() {
    const { advertisers, auth } = this.props;
    if (auth && auth.signedIn && auth.emailVerified) {
      if (auth.role === "admin") {
        return <Redirect to="/admin/main" />;
      } else {
        const activeAdvertiser = _.find(advertisers, { state: "active" });
        if (advertisers.length > 0 && activeAdvertiser) {
          return <Redirect to="/user/main" />;
        } else {
          return <Redirect to="/auth" />;
        }
      }
    } else {
      return <Redirect to="/auth" />;
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
  snackbar: state.snackBarReducer
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  CloseSnackBar: () => dispatch(close({}))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
