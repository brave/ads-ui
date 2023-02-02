import MomentUtils from "@date-io/moment";
import _ from "lodash";
import React from "react";
import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export const renderTextField = ({
  input,
  label,
  meta,
  type,
  // tslint:disable-next-line:trailing-comma
  ...custom
}: any) => (
    <TextField
      label={label}
      error={meta.touched && meta.invalid}
      type={type}
      helperText={meta.touched && meta.error}
      {...input}
      {...custom}
    />
  );

export const renderCheckbox = ({
  input,
  label,
  // tslint:disable-next-line:trailing-comma
  ...custom
}: any) => (
    <FormControlLabel label={label} control={
      <Checkbox
        checked={input.value ? true : false}
        onChange={input.onChange}
        {...custom}
      />
    } />
  );

export const renderSelectField = ({
  input,
  children,
  // tslint:disable-next-line:trailing-comma
  ...custom
}: any) => (
    <Select
      {...input}
      onChange={(value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  );

export const renderDateTimeField = ({
  input,
  children,
  label,
  // tslint:disable-next-line:trailing-comma
  ...custom
}: any) => (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        {...input}
        label={label}
        onChange={(value: any) => input.onChange(value)}
        {...custom}
      />
    </LocalizationProvider>
  );

export const renderChipField = ({
  fields,
  children,
  label,
  // tslint:disable-next-line:trailing-comma
  ...custom
}: any) => {
  {
    return (
      <div>
        <Typography variant="body1">{label}</Typography>
        {custom.disabled && fields.getAll() &&
          fields.getAll().map((field: any, index: number) => {
            return (
              <Chip
                key={field.code}
                label={field.name}{...custom} />
            );
          })
        }
        {!custom.disabled && fields.getAll() &&
          fields.getAll().map((field: any, index: number) => {
            return (
              <Chip
                key={field.code}
                label={field.name}
                color="primary"
                onDelete={() => {
                  if (!custom.disabled) {
                    fields.remove(index);
                  }
                }} {...custom} />
            );
          })
        }
        {!custom.disabled && custom.options &&
          <div>
            <FormControl style={{ margin: "10px", width: "100%" }}>
              <InputLabel>Select {label} to Add</InputLabel>
              <Select onChange={(event: any) => {
                const selected = _.find(custom.options, { code: event.target.value });
                fields.push(selected);
              }} value="">
                <MenuItem value="">
                </MenuItem>
                {
                  custom.options.map((value: any) => {
                    return (<MenuItem key={value.code} value={value.code}>{value.name}</MenuItem>);
                  })
                }
              </Select>
            </FormControl>
          </div>
        }
      </div>
    );
  }
};
