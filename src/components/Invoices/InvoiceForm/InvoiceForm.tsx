import { Button, FormControl, InputLabel, MenuItem, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Field, initialize, reduxForm } from "redux-form";

import { renderSelectField, renderTextField } from "../../../containers/field-material";

import { styles } from "./InvoiceForm.style";

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

class InvoiceForm extends React.Component<any, any> {
  public render() {
    const {
      classes,
      invoice,
      dispatch,
      handleSubmit,
      submitting,
      invalid,
      initialized,
      unlock,
    } = this.props;
    if (invoice && !initialized) {
      delete invoice.createdAt;
      delete invoice.modifiedAt;
      dispatch(initialize("InvoiceForm", invoice));
    }
    const stateList = ["paid", "unpaid"].map((item: any) => {
      return (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      );
    });
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <FormControl>
              <InputLabel>State</InputLabel>
              <Field disabled={!unlock}
                component={renderSelectField} name="state" label="Creative Type">
                {stateList}
              </Field>
            </FormControl>
          </div>
          <div>
            <Field className={classes.textField} disabled={true}
              name="balance" type="text" component={renderTextField} label="Balance" />
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="paid" type="number" component={renderTextField} label="Amount Paid" />
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

const mapStateToProps = (state: any, ownProps: any) => ({
  auth: state.authReducer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
});

const CreativeFormRedux = reduxForm({
  form: "InvoiceForm",
  validate,
})(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InvoiceForm)) as any);

export default CreativeFormRedux as any;
