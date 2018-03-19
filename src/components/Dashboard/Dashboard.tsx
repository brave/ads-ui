import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Dashboard.css";

class Dashboard extends React.Component<any, any> {

  public render() {
    if (!this.props.user || !this.props.user.signedIn) {
      return (<Redirect to="/auth" />);
    }
    return (
      <div>
        <h1>Dashboard Component</h1>
        <div>
          Dashboard
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps)(Dashboard);
