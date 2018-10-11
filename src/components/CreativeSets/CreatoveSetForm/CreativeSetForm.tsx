import { Button, withStyles } from "@material-ui/core";
import * as React from "react";
import { Field, FieldArray, initialize, reduxForm } from "redux-form";

import { renderChipField, renderTextField } from "../../../containers/field-material";

import { styles } from "./CreativeSetForm.style";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.execution) {
    errors.execution = "Required";
  }
  return errors;
};

class CampaignForm extends React.Component<any, any> {
  public render() {
    const { creativeSet, classes, dispatch, segments,
      handleSubmit, invalid, initialized, submitting, unlock } = this.props;
    if (creativeSet && !initialized) {
      delete creativeSet.createdAt;
      delete creativeSet.modifiedAt;
      dispatch(initialize("CreativeSetForm", creativeSet));
    }
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="execution" type="text" component={renderTextField} label="Execution" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="totalMax" type="number" component={renderTextField} label="Total Max" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="perDay" type="number" component={renderTextField} label="Per Day" />
          </div>
          <div>
            <FieldArray disabled={!unlock} options={segments}
              name="segments" component={renderChipField} label="Segments"/>
          </div>
          {unlock &&
            <div>
              <Button variant="contained" disabled={submitting || invalid} color="primary" type="submit">
                Save
            </Button>
            </div>
          }
        </form>
      </div>
    );
  }
}

const CreativeSetFormRedux = reduxForm({
  form: "CreativeSetForm",
  validate,
})(withStyles(styles)(CampaignForm) as any);

export default CreativeSetFormRedux as any;
