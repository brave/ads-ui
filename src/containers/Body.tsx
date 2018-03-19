import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Authentication from "../components/Authentication/Authentication";
import Dashboard from "../components/Dashboard/Dashboard";

class Body extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/auth" component={Authentication} />
          {this.getRedirect()}
        </Switch>
      </div>
    );
  }

  private getRedirect() {
    if (this.props.user && this.props.user.signedIn) {
      return <Redirect to="/dashboard" />;
    } else {
      return <Redirect to="/auth" />;
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  user: state.userReducer,
});

export default withRouter(connect(mapStateToProps)(Body));
