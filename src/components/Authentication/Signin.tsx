import { Button, withStyles } from "material-ui";
import * as React from "react";
import { Field, reduxForm } from "redux-form";

import { renderTextField } from "../../containers/field-material";

import { styles } from "./SignIn.style";

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
  return errors;
};

class SignInForm extends React.Component<any, any> {

  public render() {
    const { classes, handleSubmit, submitting, invalid } = this.props;
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <Field name="email" type="text" component={renderTextField} label="Email" />
          </div>
          <div>
            <Field name="password" type="password" component={renderTextField} label="Password" />
          </div>
          <div>
            <Button variant="raised" color="primary" disabled={submitting || invalid} type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    );
  }
}

const SignInFormRedux = reduxForm({
  form: "signin",
  validate,
})(withStyles(styles)(SignInForm));

export default SignInFormRedux;
