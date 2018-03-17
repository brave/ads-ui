import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import * as React from "react";
import { connect } from "react-redux";

import { SignIn as SignInAction } from "../../actions";

import SignIn from "./Signin";
import Signup from "./Signup";

class Authentication extends React.Component<any, any> {
  public state = {
    tabValue: "SignUp",
  };

  public render() {
    const { tabValue } = this.state;
    const SignUpHandler = (value: any) => {
      // tslint:disable-next-line:no-console
      console.log(value);
      this.props.dispatch(SignInAction(value));
    };
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs value={tabValue} onChange={this.handleChange}>
            <Tab label="Sign Up" value="SignUp" />
            <Tab label="Sign In" value="SignIn" />
          </Tabs>
        </AppBar>
        {tabValue === "SignIn" && <SignIn />}
        {tabValue === "SignUp" && <Signup onSubmit={SignUpHandler} />}
      </div>
    );
  }

  private handleChange = (event: any, value: string) => {
    this.setState({ tabValue: value });
  }
}

export default connect()(Authentication);
