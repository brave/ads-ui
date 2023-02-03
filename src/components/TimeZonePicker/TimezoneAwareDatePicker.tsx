import { Dispatch, useEffect, useState } from "react";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { parseISO, format } from "date-fns";
import { TextField } from "@mui/material";

/*
 * A quick note on timezones and javascript dates:
 *  see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date for more info
 *
 * "Date objects contain a Number that represents milliseconds since 1 January 1970 UTC."
 *
 * "It's important to keep in mind that while the time value at the heart of a Date object is UTC,
 * the basic methods to fetch the date and time or its components all work in the local
 * (i.e. host system) time zone and offset."
 */

interface Props {
  // the timezone in iana format e.g. Europe/London
  tz: string;

  value: Date;
  onChange: Dispatch<Date>;

  helperText?: string;
  error?: boolean;
  label?: string;
}

const formatDateForInput = (d: Date, tz: string): string =>
  format(utcToZonedTime(d, tz), "yyyy-MM-dd'T'HH:mm");

const parseDateFromInput = (s: string, tz: string): Date =>
  zonedTimeToUtc(parseISO(s), tz);

export const TimezoneAwareDatePicker: React.FC<Props> = ({
  tz,
  value,
  onChange,
  helperText,
  error,
  label,
}) => {
  /*
  This code is a bit more complicated that you might expect, as 
  it is normal that while editing a date component it transitions through invalid
  dates. If you convert those dates between timezones bad things happen, see 
  https://github.com/brave/ads-admin-dashboard/issues/363

  So let the user type freely until they tab away, then parse and send the event for the date.
  */
  const [formValue, setFormValue] = useState(formatDateForInput(value, tz));

  // this effect is needed to update the time in the box if the timezone changes
  useEffect(() => {
    setFormValue(formatDateForInput(value, tz));
  }, [tz, setFormValue, value]);

  return (
    <TextField
      value={formValue}
      label={label}
      helperText={helperText}
      error={error}
      onChange={(event) => setFormValue(event.target.value)}
      onBlur={() => onChange(parseDateFromInput(formValue, tz))}
      color="secondary"
      type="datetime-local"
    />
  );
};
