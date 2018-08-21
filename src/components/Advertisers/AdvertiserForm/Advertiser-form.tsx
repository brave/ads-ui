import { Button, FormControl, InputLabel, MenuItem, withStyles } from "@material-ui/core";
import * as React from "react";
import { Field, initialize, reduxForm } from "redux-form";

import { renderCheckbox, renderSelectField, renderTextField } from "../../../containers/field-material";

import { styles } from "./Advertiser-form.style";

const validate = (values: any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.billingEmail) {
    errors.billingEmail = "Required";
  }
  if (!values.street1) {
    errors.street1 = "Required";
  }
  if (!values.city) {
    errors.city = "Required";
  }
  if (!values.state) {
    errors.state = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }
  if (!values.zipcode) {
    errors.zipcode = "Required";
  }
  return errors;
};

class AdvertiserForm extends React.Component<any, any> {
  public render() {
    const { classes, advertiser, initialized, handleSubmit, dispatch, unlock, auth, submitting, invalid } = this.props;
    if (advertiser && !initialized) {
      const formValues = {
        ad_state: advertiser.state,
        billingEmail: advertiser.billingEmail,
        city: advertiser.mailingAddress.city,
        country: advertiser.mailingAddress.country,
        name: advertiser.name,
        phone: advertiser.phone,
        state: advertiser.mailingAddress.state,
        street1: advertiser.mailingAddress.street1,
        street2: advertiser.mailingAddress.street2,
        zipcode: advertiser.mailingAddress.zipcode,
      };
      dispatch(initialize("advertiserForm", formValues));
    }
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <Field disabled={!unlock && unlock !== undefined}
              name="name" type="text" component={renderTextField} label="Name" />
          </div>
          <div>
            <Field disabled={!unlock && unlock !== undefined}
              name="phone" type="text" component={renderTextField} label="Phone" />
          </div>
          <div>
            <Field disabled={!unlock && unlock !== undefined}
              name="billingEmail" type="text" component={renderTextField} label="Billing Email" />
          </div>
          <div>
            <Field disabled={!unlock && unlock !== undefined}
              name="street1" type="text" component={renderTextField} label="Street 1" />
          </div>
          <div>
            <Field disabled={!unlock && unlock !== undefined}
              name="street2" type="text" component={renderTextField} label="Street 2" />
          </div>
          <div>
            <Field disabled={!unlock && unlock !== undefined}
              name="city" type="text" component={renderTextField} label="City" />
          </div>
          <div>
            <Field disabled={!unlock && unlock !== undefined}
              name="state" type="text" component={renderTextField} label="State" />
          </div>
          <div>
            <Field disabled={!unlock && unlock !== undefined}
              name="country" type="text" component={renderTextField} label="Country" />
          </div>
          <div>
            <Field disabled={!unlock && unlock !== undefined}
              name="zipcode" type="text" component={renderTextField} label="Zip Code" />
          </div>
          {auth && auth.role === "admin" &&
            <div>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Advertiser State</InputLabel>
                <Field disabled={!unlock && unlock !== undefined}
                  component={renderSelectField} name="ad_state" label="State">
                  <MenuItem value={"under_review"}>Under Review</MenuItem>
                  <MenuItem value={"active"}>Active</MenuItem>
                </Field>
              </FormControl>
            </div>
          }
          {!auth &&
            <div>
              <Field disabled={!unlock && unlock !== undefined}
                component={renderCheckbox} name="agreed" label="Agree to terms" />
            </div>
          }
          {unlock && auth && auth.role === "admin" &&
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

const AdvertiserFormRedux = reduxForm({
  form: "advertiserForm",
  validate,
})(withStyles(styles)(AdvertiserForm) as any);

export default AdvertiserFormRedux as any;
