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
        <Route path="/auth/signin" component={Authentication} />
        {this.getRedirect()}
      </Switch>
    );
  }

  private getRedirect() {
    const { user } = this.props;
    if (user && user.signedIn) {
      if (user.role === "admin") {
        return <Redirect to="/admin/main" />;
      } else {
        return <Redirect to="/main" />;
      }
    } else {
      return <Redirect to="/auth/signin" />;
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  user: state.userReducer,
});

export default withRouter(connect(mapStateToProps)(Body));
