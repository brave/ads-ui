import { Button, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { SignIn, SignUp } from "../../../actions";

import { styles } from "./Signup.style";

import SignupForm from "../../../components/SignupForm/Signup-form";

class SignInContainer extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      submitting: false,
    };
  }

  public render() {
    const { auth, classes, signupForm } = this.props;
    if (auth && auth.signedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className={classes.root}>
        <div className={classes.row1}>
          <div className={classes.row1_column1}>
            <SignupForm />
          </div>
          <div className={classes.row1_column2}>
            <img className={classes.image} src="/favicon.png" />
          </div>
        </div>
        <div className={classes.row2}>
          <Button variant="contained" color="primary"
            disabled={(signupForm && signupForm.syncErrors !== undefined) || this.state.submitting}
            type="button" onClick={this.submit}>Sign Up</Button>
          <Link className={classes.signinlink} to={`/auth/signin`}>
            <Button variant="contained" color="primary">
              Sign In
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
    const { signupForm } = this.props;
    const { values } = signupForm;
    try {
      await this.props.signup(values);
      await this.props.signin(values);
    } catch (err) {
      this.toggleSubmitting();
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  signupForm: state.form.signup,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  signin: (value: any) => dispatch(SignIn(value)),
  signup: (value: any) => dispatch(SignUp(value)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SignInContainer));
