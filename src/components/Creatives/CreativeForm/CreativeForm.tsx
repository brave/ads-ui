import { Button, withStyles } from "@material-ui/core";
import * as React from "react";
import { Field, initialize, reduxForm } from "redux-form";

import { renderTextField } from "../../../containers/field-material";

import { styles } from "./CreativeForm.style";

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
  if (!values.imgUrl) {
    errors.imgUrl = "Required";
  }
  return errors;
};

class CreativeForm extends React.Component<any, any> {
  public render() {
    const { classes, creative, dispatch, handleSubmit, submitting, invalid, initialized, unlock } = this.props;
    if (creative && !initialized) {
      delete creative.createdAt;
      delete creative.modifiedAt;
      dispatch(initialize("CreativeForm", creative));
    }
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="type.code" type="text" component={renderTextField} label="Type" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="payload.body" type="text" component={renderTextField} label="Body" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="payload.title" type="text" component={renderTextField} label="Title" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="payload.targetUrl" type="text" component={renderTextField} label="Target" />
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

const CreativeFormRedux = reduxForm({
  form: "CreativeForm",
  validate,
})(withStyles(styles)(CreativeForm) as any);

export default CreativeFormRedux as any;
