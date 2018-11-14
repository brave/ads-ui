import { withStyles } from "@material-ui/core";
import React from "react";
import { Field, reduxForm } from "redux-form";

import { renderTextField } from "../../containers/field-material";

import { styles } from "./Signup-form.style";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.fullName) {
    errors.fullName = "Required";
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
            <Field name="email" type="text" component={renderTextField} label="Email" />
          </div>
          <div>
            <Field name="password" type="password" component={renderTextField} label="Password" />
          </div>
          <div>
            <Field name="fullName" type="text" component={renderTextField} label="Full Name" />
          </div>
        </form>
      </div>
    );
  }
}

const SignupFormRedux = reduxForm({
  form: "signup",
  validate,
})(withStyles(styles)(SignupForm) as any);

export default SignupFormRedux;
