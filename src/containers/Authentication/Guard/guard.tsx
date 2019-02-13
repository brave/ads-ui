import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";

class Guard extends React.Component<any, any> {
  public render() {
    const { advertisers, auth, match } = this.props;
    const activeAdvertiser = _.find(advertisers, { state: "active" });
    let redirectUrl = "";
    if (!auth.signedIn) {
      redirectUrl = "/auth/signin";
    } else if (auth.role !== "admin" && !auth.emailVerified) {
      redirectUrl = "/auth/verify";
    } else if (auth.role !== "admin" && advertisers.length < 1) {
      redirectUrl = "/auth/advertiser";
    } else if (auth.role !== "admin" && !activeAdvertiser) {
      redirectUrl = "/auth/wait";
    } else if (match.url === "/auth/signup") {
      redirectUrl = "/a";
    } else if (auth.role === "admin") {
      redirectUrl = "/main/admin";
    } else if (auth.role === "user") {
      redirectUrl = "/main/user";
    }
    if (redirectUrl && redirectUrl !== match.url) {
      return (<Redirect to={redirectUrl} />);
    }
    return (<div hidden={true}></div>);
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
});

export default withRouter(connect(mapStateToProps)(Guard));
