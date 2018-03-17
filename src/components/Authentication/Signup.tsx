import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import * as React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

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

class SignupForm extends React.Component<InjectedFormProps<any, any>> {
  public render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field name="email" type="text" component={renderTextField} label="Email" />
          <Field name="password" type="password" component={renderTextField} label="Password" />
          <Button variant="raised" type="submit">Sign Up</Button>
        </form>
      </div>
    );
  }
}

const SignupFormRedux = reduxForm({
  form: "signup",
})(SignupForm);

export default SignupFormRedux;
