import { Button, FormControl, InputLabel, MenuItem, withStyles } from "@material-ui/core";
import * as React from "react";
import { Field, initialize, reduxForm } from "redux-form";

import { renderCheckbox, renderSelectField, renderTextField } from "../../../containers/field-material";

import { styles } from "./UserForm.style";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = "Email is Required";
  }
  return errors;
};

class UserForm extends React.Component<any, any> {
  public render() {
    const { user, classes, dispatch, handleSubmit, invalid, initialized, submitting, unlock } = this.props;
    if (user && !initialized) {
      delete user.createdAt;
      delete user.modifiedAt;
      // tslint:disable-next-line:no-console
      console.log(user);
      dispatch(initialize("UserForm", user));
    }
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="email" type="text" component={renderTextField} label="Email" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="password" type="password" component={renderTextField} label="Password" />
          </div>
          <div>
            <Field disabled={!unlock}
              component={renderCheckbox} name="emailVerified" label="Email Verified" />
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="age-native-simple">Role</InputLabel>
              <Field
                disabled={!unlock} component={renderSelectField} name="role" label="Role">
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"user"}>User</MenuItem>
              </Field>
            </FormControl>
          </div>
          {unlock &&
            <div>
              <Button variant="raised" disabled={submitting || invalid} color="primary" type="submit">
                Save
            </Button>
            </div>
          }
        </form>
      </div>
    );
  }
}

const UserFormRedux = reduxForm({
  form: "UserForm",
  validate,
})(withStyles(styles)(UserForm) as any);

export default UserFormRedux as any;
