import * as _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Authentication from "./Authentication/Authentication";
import AdminMain from "./Main/Admin/Main";
import AdvertiserMain from "./Main/Advertiser/Main";

class Body extends React.Component<any, any> {
  public render() {
    return (
      <Switch>
        <Route path="/user/main" component={AdvertiserMain} />
        <Route path="/admin/main" component={AdminMain} />
        <Route path="/auth" component={Authentication} />
        {this.getRedirect()}
      </Switch>
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
});

export default withRouter(connect(mapStateToProps)(Body));
