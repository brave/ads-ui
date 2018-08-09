import { Button, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { SignIn } from "../../../actions";

import { styles } from "./SignIn.style";

import SigninForm from "../../../components/SigninForm/Signin-form";

class SignInContainer extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      submitting: false,
    };
  }

  public render() {
    const { auth, classes, signinForm } = this.props;
    if (auth && auth.signedIn) {
      return (<Redirect to="/" />);
    }
    return (
      <div className={classes.root}>
        <div className={classes.row1}>
          <div className={classes.row1_column1}>
            <SigninForm />
          </div>
          <div className={classes.row1_column2}>
            <img className={classes.image} src="/favicon.png" />
          </div>
        </div>
        <div className={classes.row2}>
          <Button variant="raised" color="primary"
            disabled={(signinForm && signinForm.syncErrors !== undefined) || this.state.submitting}
            type="button" onClick={this.submit}>Sign In</Button>
          <Link className={classes.signuplink} to={`/auth/signup`}>
            <Button variant="raised" color="primary">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  private toggleSubmitting = () => {
    this.setState({
      submitting: !this.state.submitting,
    });
  }

  private submit = async (event: any) => {
    this.toggleSubmitting();
    const { signinForm } = this.props;
    const { values } = signinForm;
    try {
      await this.props.signin(values);
    } catch (err) {
      this.toggleSubmitting();
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  signinForm: state.form.signin,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  signin: (value: any) => dispatch(SignIn(value)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SignInContainer));
