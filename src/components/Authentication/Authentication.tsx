import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Tabs, { Tab } from "material-ui/Tabs";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { SignIn as SignInAction, SignUp as SignUpAction } from "../../actions";

import SignIn from "./Signin";
import Signup from "./Signup";

import { styles } from "./Authentication.style";

class Authentication extends React.Component<any, any> {
  public state = {
    tabValue: "SignIn",
  };

  public SignUpHandler(value: any) {
    this.props.dispatch(SignUpAction(value));
  }

  public SignInHandler(value: any) {
    this.props.dispatch(SignInAction(value));
  }

  public render() {
    const { tabValue } = this.state;
    const { classes } = this.props;

    if (this.props.user && this.props.user.signedIn) {
      return (<Redirect to="/dashboard" />);
    }
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Tabs value={tabValue} onChange={this.handleChange}>
            <Tab label="Sign Up" value="SignUp" />
            <Tab label="Sign In" value="SignIn" />
          </Tabs>
          <div className={classes.tabContent}>
            {tabValue === "SignIn" && <SignIn onSubmit={this.SignInHandler} />}
            {tabValue === "SignUp" && <Signup onSubmit={this.SignUpHandler} />}
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

export default withStyles(styles)(connect(mapStateToProps)(Authentication));
