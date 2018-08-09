import { withStyles } from "@material-ui/core";
import * as React from "react";
import { Field, reduxForm } from "redux-form";

import { renderCheckbox, renderTextField } from "../../../containers/field-material";

import { styles } from "./Advertiser-form.style";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.billingEmail) {
    errors.billingEmail = "Required";
  }
  if (!values.street1) {
    errors.street1 = "Required";
  }
  if (!values.city) {
    errors.city = "Required";
  }
  if (!values.state) {
    errors.state = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }
  if (!values.zipcode) {
    errors.zipcode = "Required";
  }
  return errors;
};

class SignupForm extends React.Component<any, any> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form className={classes.form}>
          <div>
            <Field name="name" type="text" component={renderTextField} label="Name" />
          </div>
          <div>
            <Field name="phone" type="text" component={renderTextField} label="Phone" />
          </div>
          <div>
            <Field name="billingEmail" type="text" component={renderTextField} label="Billing Email" />
          </div>
          <div>
            <Field name="street1" type="text" component={renderTextField} label="Street 1" />
          </div>
          <div>
            <Field name="street2" type="text" component={renderTextField} label="Street 2" />
          </div>
          <div>
            <Field name="city" type="text" component={renderTextField} label="City" />
          </div>
          <div>
            <Field name="state" type="text" component={renderTextField} label="State" />
          </div>
          <div>
            <Field name="country" type="text" component={renderTextField} label="Country" />
          </div>
          <div>
            <Field name="zipcode" type="text" component={renderTextField} label="Zip Code" />
          </div>
          <div>
            <Field component={renderCheckbox} name="agreed" label="Agree to terms" />
          </div>
        </form>
      </div>
    );
  }
}

const SignupFormRedux = reduxForm({
  form: "advertiser",
  validate,
})(withStyles(styles)(SignupForm) as any);

export default SignupFormRedux;
