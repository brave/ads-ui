import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Authentication from "../components/Authentication/Authentication";
import Main from "../components/Main/Main";

class Body extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Switch>
          <Route path="/main" component={Main} />
          <Route path="/auth" component={Authentication} />
          {this.getRedirect()}
        </Switch>
      </div>
    );
  }

  private getRedirect() {
    if (this.props.user && this.props.user.signedIn) {
      return <Redirect to="/main" />;
    } else {
      return <Redirect to="/auth" />;
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  user: state.userReducer,
});

export default withRouter(connect(mapStateToProps)(Body));
