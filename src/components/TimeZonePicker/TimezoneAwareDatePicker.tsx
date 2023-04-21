import { Dispatch, useEffect, useState } from "react";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { format, parseISO } from "date-fns";
import { TextField } from "@mui/material";

interface Props {
  // the timezone in iana format e.g. Europe/London
  tz: string;

  value: Date;
  onChange: Dispatch<Date>;

  helperText?: string;
  error?: boolean;
  label?: string;
  disabled?: boolean;
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
  disabled,
}) => {
  const [formValue, setFormValue] = useState(formatDateForInput(value, tz));
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
      disabled={disabled === true}
    />
  );
};
