import { Button, withStyles } from "@material-ui/core";
import * as React from "react";
import { Field, FieldArray, initialize, reduxForm } from "redux-form";

import { renderChipField, renderDateField, renderTextField } from "../../../containers/field-material";

import { styles } from "./CampaignForm.style";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
};

class CampaignForm extends React.Component<any, any> {
  public render() {
    const { campaign, classes, dispatch, geocodes,
      handleSubmit, invalid, initialized, submitting, unlock } = this.props;
    if (campaign && !initialized) {
      delete campaign.createdAt;
      delete campaign.modifiedAt;
      dispatch(initialize("CampaignForm", campaign));
    }
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="name" type="text" component={renderTextField} label="Name" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="budget" type="number" component={renderTextField} label="Budget" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="dailyCap" type="number" component={renderTextField} label="Daily Cap" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="startAt" component={renderDateField} label="Start Date" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="endAt" component={renderDateField} label="End Date" />
          </div>
          <div>
            <FieldArray disabled={!unlock} options={geocodes}
              name="geoTargets" component={renderChipField} label="Geo Targets" />
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

const CampaignFormRedux = reduxForm({
  form: "CampaignForm",
  validate,
})(withStyles(styles)(CampaignForm) as any);

export default CampaignFormRedux as any;
