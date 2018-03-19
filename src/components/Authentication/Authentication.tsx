import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { SignIn as SignInAction, SignUp as SignUpAction } from "../../actions";

import SignIn from "./Signin";
import Signup from "./Signup";

class Authentication extends React.Component<any, any> {
  public state = {
    tabValue: "SignIn",
  };

  public render() {
    const { tabValue } = this.state;
    const SignUpHandler = (value: any) => {
      this.props.dispatch(SignUpAction(value));
    };
    const SignInHandler = (value: any) => {
      this.props.dispatch(SignInAction(value));
    };
    if (this.props.user && this.props.user.signedIn) {
      return (<Redirect to="/dashboard" />);
    }
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs value={tabValue} onChange={this.handleChange}>
            <Tab label="Sign Up" value="SignUp" />
            <Tab label="Sign In" value="SignIn" />
          </Tabs>
        </AppBar>
        {tabValue === "SignIn" && <SignIn onSubmit={SignInHandler} />}
        {tabValue === "SignUp" && <Signup onSubmit={SignUpHandler} />}
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

export default connect(mapStateToProps)(Authentication);
