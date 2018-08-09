import { withStyles } from "@material-ui/core";
import * as React from "react";
import { Field, reduxForm } from "redux-form";

import { renderTextField } from "../../containers/field-material";

import { styles } from "./Verify-form.style";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.code) {
    errors.code = "Required";
  }
  return errors;
};

class VerifyForm extends React.Component<any, any> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form className={classes.form}>
          <div>
            <Field name="code" type="text" component={renderTextField} label="Verification Code" />
          </div>
        </form>
      </div>
    );
  }
}

const SignupFormRedux = reduxForm({
  form: "verify",
  validate,
})(withStyles(styles)(VerifyForm) as any);

export default SignupFormRedux;
