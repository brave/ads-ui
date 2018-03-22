import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import * as React from "react";
import { Field, reduxForm } from "redux-form";

import { styles } from "./SignIn.style";

const renderTextField = (
  props: any,
) => (
    <TextField
      label={props.label}
      error={props.touched && props.error}
      type={props.type}
      {...props.input}
      {...props.custom}
    />
  );

class SignInForm extends React.Component<any, any> {

  public render() {
    const { classes, handleSubmit } = this.props;
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
            <Button variant="raised" type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    );
  }
}

const SignInFormRedux = reduxForm({
  form: "signin",
})(withStyles(styles)(SignInForm));

export default SignInFormRedux;
