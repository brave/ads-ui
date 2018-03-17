import * as React from "react";

import Authentication from "../Authentication/Authentication";

import "./Dashboard.css";

class Dashboard extends React.Component<any, any> {

  public render() {
    return (
      <div>
        <h1>Dashboard Component</h1>
        <div>
          <Authentication />
        </div>
      </div>
    );
  }
}

export default Dashboard;
