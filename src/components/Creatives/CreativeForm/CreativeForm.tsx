import { Button, FormControl, InputLabel, MenuItem, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Field, initialize, reduxForm } from "redux-form";

import { renderSelectField, renderTextField } from "../../../containers/field-material";

import { GetCreativeTypes } from "../../../actions";

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
  public componentDidMount() {
    this.props.GetCreativeTypes(this.props.auth);
  }
  public render() {
    const {
      classes,
      creative,
      creativeTypes,
      dispatch,
      handleSubmit,
      submitting,
      invalid,
      initialized,
      unlock,
    } = this.props;
    if (creative && !initialized) {
      delete creative.createdAt;
      delete creative.modifiedAt;
      dispatch(initialize("CreativeForm", creative));
    }
    const creativeTypeList = creativeTypes.map((item: any) => {
      return (
        <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
      );
    });
    const creativeStateList = ["draft", "under_review", "active", "paused"].map((item: any) => {
      return (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      );
    });
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Field disabled={!unlock} component={renderSelectField} name="type.code" label="Creative Type">
                {creativeTypeList}
              </Field>
            </FormControl>
          </div>
          <div>
            <Field className={classes.textField} disabled={!unlock}
              name="name" type="text" component={renderTextField} label="Name" />
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
          <div>
            <FormControl>
              <InputLabel>State</InputLabel>
              <Field disabled={!unlock} component={renderSelectField} name="state" label="Creative State">
                {creativeStateList}
              </Field>
            </FormControl>
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
  creativeTypes: state.creativeTypeReducer.creativeTypes,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  GetCreativeTypes: (auth: any) => dispatch(GetCreativeTypes(auth)),
});

const CreativeFormRedux = reduxForm({
  form: "CreativeForm",
  validate,
})(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreativeForm)) as any);

export default CreativeFormRedux as any;
