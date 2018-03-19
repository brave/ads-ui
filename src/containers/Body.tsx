import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import Authentication from "../components/Authentication/Authentication";
import Dashboard from "../components/Dashboard/Dashboard";

class Body extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={Authentication} />
      </div>
    );
  }
}

export default connect()(Body);
