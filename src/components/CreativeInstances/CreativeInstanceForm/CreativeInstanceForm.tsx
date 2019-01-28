import { Button, FormControl, InputLabel, MenuItem, withStyles, Select } from "@material-ui/core";
import React from "react";
import { Field, FieldArray, initialize, reduxForm } from "redux-form";

import { renderChipField, renderSelectField, renderTextField } from "../../../containers/field-material";

import { styles } from "./CreativeInstanceForm.style";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.execution) {
    errors.execution = "Required";
  }
  return errors;
};

class CreativeInstanceForm extends React.Component<any, any> {
  public render() {
    const { creativeInstance, classes, dispatch,
      handleSubmit, invalid, initialized, submitting, unlock } = this.props;
    if (creativeInstance && !initialized) {
      delete creativeInstance.createdAt;
      delete creativeInstance.modifiedAt;
      dispatch(initialize("CreativeInstanceForm", creativeInstance));
    }
    const creativesList = this.props.creatives.map((item: any) => {
      return (
        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
      );
    });
    const confirmationTypesList = this.props.confirmationTypes.map((item: any) => {
      return (
        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
      );
    });
    const renderPrices: any = ({ fields }: { fields: any }) => {
      return (
        <div>
          <Button disabled={!unlock} className={classes.margin} color="primary" variant="contained" onClick={() => fields.push({})}>
            Add Pricing
            </Button>
          {fields.map((price: any, index: number) => {
            return (
              <div className={classes.margin} key={index}>
                <FormControl>
                  <InputLabel>Type</InputLabel>
                  <Field disabled={!unlock} component={renderSelectField} name={`prices[${index}].type`} label="Type">
                    {confirmationTypesList}
                  </Field>
                </FormControl>
                {fields.get(index).type === "view" &&
                  <Field
                    disabled={!unlock}
                    name={`prices[${index}].amount`}
                    type="number"
                    component={renderTextField}
                    label="Amount(CPM)"
                  />
                }
                {fields.get(index).type !== "view" &&
                  <Field
                    disabled={!unlock}
                    name={`prices[${index}].amount`}
                    type="number"
                    component={renderTextField}
                    label="Amount"
                  />
                }
                <Button disabled={!unlock} color="primary" variant="contained" onClick={() => fields.remove(index)} >
                  Remove
                </Button>
              </div>
            )
          })}
        </div>
      )
    };
    const renderWebhooks: any = ({ fields }: { fields: any }) => {
      return (
        <div>
          <Button disabled={!unlock} className={classes.margin} color="primary" variant="contained" onClick={() => fields.push({})}>
            Add Webhook
            </Button>
          {fields.map((price: any, index: number) => (
            <div className={classes.margin} key={index}>
              <FormControl>
                <InputLabel>Type</InputLabel>
                <Field disabled={!unlock} component={renderSelectField} name={`webhooks[${index}].type`} label="Type">
                  {confirmationTypesList}
                </Field>
              </FormControl>
              <Field
                disabled={!unlock}
                name={`webhooks[${index}].url`}
                type="test"
                component={renderTextField}
                label="URL"
              />
              <Button disabled={!unlock} color="primary" variant="contained" onClick={() => fields.remove(index)} >
                Remove
                </Button>
            </div>
          ))}
        </div>
      )
    };
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <FormControl>
              <InputLabel>Creative</InputLabel>
              <Field disabled={!unlock} component={renderSelectField} name="creative.id" label="Creative">
                {creativesList}
              </Field>
            </FormControl>
          </div>
          <div>
            <FieldArray name="prices" component={renderPrices} />
          </div>
          <div>
            <FieldArray name="webhooks" component={renderWebhooks} />
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

const CreativeInstanceFormRedux = reduxForm({
  form: "CreativeInstanceForm",
  validate,
})(withStyles(styles)(CreativeInstanceForm) as any);

export default CreativeInstanceFormRedux as any;
