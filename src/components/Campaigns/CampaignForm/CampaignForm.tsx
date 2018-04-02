import { Button, withStyles } from "material-ui";
import * as React from "react";
import { Field, initialize, reduxForm } from "redux-form";

import { renderTextField } from "../../../containers/field-material";

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
    const { campaign, classes, dispatch, handleSubmit, invalid, initialized, submitting, unlock } = this.props;
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

const CampaignFormRedux = reduxForm({
  form: "CampaignForm",
  validate,
})(withStyles(styles)(CampaignForm));

export default CampaignFormRedux as any;
