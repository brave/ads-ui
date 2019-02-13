import { Button, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { SignOut, UserResend, UserVerify } from "../../../actions";

import { styles } from "./Verify.style";

import VerifyForm from "../../../components/VerifyForm/Verify-form";

class VerifyContainer extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      submitting: false,
    };
  }

  public render() {
    const { auth, classes, signinForm, signout } = this.props;
    if (!auth || !auth.signedIn) {
      return (<Redirect to="/a" />);
    } else if (auth.emailVerified) {
      return (<Redirect to="/a" />);
    }
    return (
      <div className={classes.root}>
        <div className={classes.row1}>
          <div className={classes.row1_column1}>
            <VerifyForm />
          </div>
          <div className={classes.row1_column2}>
            <img className={classes.image} src="/favicon.png" />
          </div>
        </div>
        <div className={classes.row2}>
          <span className={classes.buttons}>
            <Button variant="contained" color="primary"
              disabled={(signinForm && signinForm.syncErrors !== undefined) || this.state.submitting}
              type="button" onClick={this.submit}>
              Verify
          </Button>
          </span>
          <span>
            <Button onClick={this.resend} variant="contained" color="primary">
              Resend
          </Button>
          </span>
          <span className={classes.buttons}>
            <Button onClick={signout} variant="contained" color="primary">
              Sign Out
          </Button>
          </span>
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
    const { verifyForm, auth } = this.props;
    const { values } = verifyForm;
    try {
      await this.props.verify(auth, auth, values.code);
    } catch (err) {
      this.toggleSubmitting();
    }
  }

  private resend = async (event: any) => {
    const { auth } = this.props;
    await this.props.resend(auth, auth);
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
  verifyForm: state.form.verify,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  resend: (user: any, auth: any) => dispatch(UserResend(user, auth)),
  signout: () => dispatch(SignOut()),
  verify: (user: any, auth: any, code: any) => dispatch(UserVerify(user, auth, code)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(VerifyContainer));
