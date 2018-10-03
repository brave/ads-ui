import { Typography } from "@material-ui/core";
import * as React from "react";

class Dashboard extends React.Component<any, any> {
  public render() {
    return (
      <div style={{ margin: "15px" }}>
        <Typography variant="title">Admin Dashboard</Typography>
      </div>
    );
  }
}

export default Dashboard;
