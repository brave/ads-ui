import { Dispatch, useEffect, useState } from "react";
import dayjs from "dayjs";
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
  // eslint-disable-next-line lingui/no-unlocalized-strings
  dayjs(d).tz(tz).format("YYYY-MM-DDTHH:mm");

const parseDateFromInput = (s: string, tz: string): Date =>
  dayjs(s).tz(tz, true).toDate();

export const TimezoneAwareDatePicker = ({
  tz,
  value,
  onChange,
  helperText,
  error,
  label,
  disabled,
}: Props) => {
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
