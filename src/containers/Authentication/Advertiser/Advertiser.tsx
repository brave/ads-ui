import { Button, withStyles } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { CreateAdvertisers, SignOut } from "../../../actions";

import { styles } from "./Advertiser.style";

import AdvertiserForm from "../../../components/Advertisers/AdvertiserForm/Advertiser-form";

class SignInContainer extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      submitting: false,
    };
  }

  public render() {
    const { advertisers, auth, classes, advertiserForm, signout } = this.props;
    if (!auth || !auth.signedIn || !auth.emailVerified) {
      return (<Redirect to="/" />);
    } else if (advertisers.length > 0) {
      return (<Redirect to="/" />);
    }
    return (
      <div className={classes.root}>
        <div className={classes.row1}>
          <div className={classes.row1_column1}>
            <AdvertiserForm />
          </div>
          <div className={classes.row1_column2}>
            <img className={classes.image} src="/favicon.png" />
          </div>
        </div>
        <div className={classes.row2}>
          <span className={classes.buttons}>
            <Button variant="raised" color="primary"
              disabled={(advertiserForm && advertiserForm.syncErrors !== undefined) || this.state.submitting}
              type="button" onClick={this.submit}>Submit</Button>
          </span>
          <span>
            <Button onClick={signout} variant="raised" color="primary">
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
    const { advertiserForm, auth } = this.props;
    const { values } = advertiserForm;
    values.mailingAddress = {
      city: values.city,
      country: values.country,
      state: values.state,
      street1: values.street1,
      street2: values.street2,
      zipcode: values.zipcode,
    };
    values.billingAddress = values.mailingAddress;
    delete values.state;
    try {
      await this.props.submit(auth, values);
    } catch (err) {
      this.toggleSubmitting();
    }
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  advertiserForm: state.form.advertiserForm,
  advertisers: state.advertiserReducer.advertisers,
  auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  signout: () => dispatch(SignOut()),
  submit: (auth: any, value: any) => dispatch(CreateAdvertisers(value, auth)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SignInContainer));
