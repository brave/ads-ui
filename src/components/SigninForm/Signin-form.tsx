import { withStyles } from "@material-ui/core";
import React from "react";
import { Field, reduxForm } from "redux-form";

import { renderTextField } from "../../containers/field-material";

import { styles } from "./Signin-form.style";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Password should be minimum 8 characters";
  }
  return errors;
};

// TODO - Replace redux forms with our custom styling / validation
class SigninForm extends React.Component<any, any> {
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.form} autoComplete="nope">
          <div
            style={{
              marginBottom: "24px"
            }}
          >
            <Field
              style={{ width: "100%" }}
              name="email"
              type="text"
              component={renderTextField}
              label="Email"
            />
          </div>
          <div
            style={{
              marginBottom: "24px"
            }}
          >
            <Field
              style={{ width: "100%" }}
              name="password"
              type="password"
              component={renderTextField}
              label="Password"
            />
          </div>
        </form>
      </div>
    );
  }
}

const SigninFormRedux = reduxForm({
  form: "signin",
  validate
})(withStyles(styles)(SigninForm) as any);

export default SigninFormRedux;
