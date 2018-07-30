import { Paper, Tab, Tabs, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { ISignInPayload, ISignUpPayload, SignIn, SignUp } from "../../actions";

import SignInComponent from "./Signin";
import SignupComponent from "./Signup";

import { styles } from "./Authentication.style";

class Authentication extends React.Component<any, any> {
  public state = {
    tabValue: "SignIn",
  };

  public render() {
    const { tabValue } = this.state;
    const { classes, user, signIn, signUp } = this.props;

    const SignUpHandler = (value: any) => {
      signUp(value);
    };

    const SignInHandler = (value: any) => {
      signIn(value);
    };

    if (user && user.signedIn) {
      return (<Redirect to="/dashboard" />);
    }
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Tabs value={tabValue} onChange={this.handleChange} fullWidth>
            <Tab label="Sign Up" value="SignUp" />
            <Tab label="Sign In" value="SignIn" />
          </Tabs>
          <div className={classes.tabContent}>
            {tabValue === "SignIn" && <SignInComponent onSubmit={SignInHandler} />}
            {tabValue === "SignUp" && <SignupComponent onSubmit={SignUpHandler} />}
          </div>
        </Paper>
      </div>
    );
  }

  private handleChange = (event: any, value: string) => {
    this.setState({ tabValue: value });
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  signIn: (value: ISignInPayload) => dispatch(SignIn(value)),
  signUp: (value: ISignUpPayload) => dispatch(SignUp(value)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Authentication));
