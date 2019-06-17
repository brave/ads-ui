import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  withStyles
} from "@material-ui/core";
import React from "react";
import { Field, FieldArray, initialize, reduxForm } from "redux-form";

import {
  renderChipField,
  renderDateTimeField,
  renderSelectField,
  renderTextField
} from "../../../containers/field-material";

import { styles } from "./CampaignForm.style";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.budget) {
    errors.budget = "Required";
  }
  if (!values.dailyBudget) {
    errors.dailyBudget = "Required";
  }
  if (!values.dailyCap) {
    errors.dailyCap = "Required";
  }
  return errors;
};

class CampaignForm extends React.Component<any, any> {
  public render() {
    const {
      campaign,
      classes,
      dispatch,
      geocodes,
      handleSubmit,
      invalid,
      initialized,
      submitting,
      unlock
    } = this.props;
    if (campaign && !initialized) {
      delete campaign.createdAt;
      delete campaign.modifiedAt;
      dispatch(initialize("CampaignForm", campaign));
    }
    const campaignStateList = [
      "draft",
      "under_review",
      "active",
      "deleted",
      "paused",
      "suspended",
      "daycomplete"
    ].map((item: any) => {
      return (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      );
    });
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <Field
              className={classes.textField}
              disabled={!unlock}
              name="name"
              type="text"
              component={renderTextField}
              label="Name"
            />
          </div>
          <div>
            <Field
              className={classes.textField}
              disabled={!unlock}
              name="budget"
              type="number"
              component={renderTextField}
              label="Budget"
            />
          </div>
          <div>
            <FormControl>
              <InputLabel>Currency</InputLabel>
              <Field
                disabled={!unlock}
                component={renderSelectField}
                name="currency"
                label="Creative Type"
              >
                <MenuItem key="USD" value="USD">
                  USD
                </MenuItem>
                <MenuItem key="BAT" value="BAT">
                  BAT
                </MenuItem>
              </Field>
            </FormControl>
          </div>
          <div>
            <Field
              className={classes.textField}
              disabled={!unlock}
              name="dailyBudget"
              type="number"
              component={renderTextField}
              label="Daily Budget"
            />
          </div>
          <div>
            <Field
              className={classes.textField}
              disabled={!unlock}
              name="dailyCap"
              type="number"
              component={renderTextField}
              label="Campaign Daily Frequency Cap"
            />
          </div>
          <div>
            <Field
              className={classes.textField}
              disabled={!unlock}
              name="startAt"
              component={renderDateTimeField}
              label="Start Date"
            />
          </div>
          <div>
            <Field
              className={classes.textField}
              disabled={!unlock}
              name="endAt"
              component={renderDateTimeField}
              label="End Date"
            />
          </div>
          <div>
            <FieldArray
              disabled={!unlock}
              options={geocodes}
              name="geoTargets"
              component={renderChipField}
              label="Geo Targets"
            />
          </div>
          <div>
            <FormControl>
              <InputLabel>State</InputLabel>
              <Field
                disabled={!unlock}
                component={renderSelectField}
                name="state"
                label="Creative State"
              >
                {campaignStateList}
              </Field>
            </FormControl>
          </div>
          {unlock && (
            <div>
              <Button
                variant="contained"
                disabled={submitting || invalid}
                color="primary"
                type="submit"
              >
                Save
              </Button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

const CampaignFormRedux = reduxForm({
  form: "CampaignForm",
  validate
})(withStyles(styles)(CampaignForm) as any);

export default CampaignFormRedux as any;
