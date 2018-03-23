import { TextField, withStyles } from "material-ui";
import * as React from "react";
import { Field, initialize, reduxForm } from "redux-form";

import { styles } from "./CreativeForm.style";

const renderTextField = ({
  input,
  label,
  meta,
  type,
  ...custom,
}: any) => (
    <TextField
      label={label}
      error={meta.touched && meta.invalid}
      type={type}
      helperText={meta.touched && meta.error}
      {...input}
      {...custom}
    />
  );

const validate = (values: any) => {
  const errors: any = {};
  if (!values.caption) {
    errors.caption = "Required";
  }
  if (!values.body) {
    errors.body = "Required";
  }
  if (!values.targetUrl) {
    errors.targetUrl = "Required";
  }
  if (!values.imageUrl) {
    errors.imageUrl = "Required";
  }
  return errors;
};

class CreativeForm extends React.Component<any, any> {
  public render() {
    const { classes, creative, dispatch } = this.props;
    if (creative) {
      dispatch(initialize("CreativeForm", creative));
    }
    return (
      <div className={classes.root}>
        <form className={classes.form}>
          <div>
            <Field className={classes.textField}
              name="caption" type="text" component={renderTextField} label="Caption" />
          </div>
          <div>
            <Field className={classes.textField} name="body" type="text" component={renderTextField} label="Body" />
          </div>
          <div>
            <Field className={classes.textField}
            name="targetUrl" type="text" component={renderTextField} label="Target" />
          </div>
          <div>
            <Field className={classes.textField} name="imgUrl" type="text" component={renderTextField} label="Image" />
          </div>
        </form>
      </div>
    );
  }
}

const CreativeFormRedux = reduxForm({
  form: "CreativeForm",
  validate,
})(withStyles(styles)(CreativeForm));

export default CreativeFormRedux as any;
