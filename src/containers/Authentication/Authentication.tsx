import { Paper, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { styles } from "./Authentication.style";

import SigninContainer from "./Signin/Signin";

class Authentication extends React.Component<any, any> {
  public state = {
    tabValue: "SignIn",
  };

  public render() {
    const { classes, auth } = this.props;

    if (auth && auth.signedIn) {
      if (auth.role === "admin") {
        return <Redirect to="/admin/main" />;
      } else {
        return <Redirect to="/user/main" />;
      }
    }
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Route path="/auth/signin" component={SigninContainer} />

        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
});

export default  withStyles(styles)(connect(mapStateToProps)(Authentication));
