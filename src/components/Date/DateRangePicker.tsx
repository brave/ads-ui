import { Stack, TextField } from "@mui/material";
import { Dispatch } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";

interface Props {
  from: Date;
  to: Date;
  onFromChange: Dispatch<Date>;
  onToChange: Dispatch<Date>;
}

export const DateRangePicker = ({
  from,
  to,
  onFromChange,
  onToChange,
}: Props) => {
  const { _ } = useLingui();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Stack direction="row" spacing={1} margin={1}>
        <DatePicker
          label={_(msg`From`)}
          value={from}
          onChange={(newValue) => {
            if (newValue) {
              onFromChange(newValue);
            }
          }}
          renderInput={(params) => (
            <TextField size="small" sx={{ width: 175 }} {...params} />
          )}
        />
        <DatePicker
          label={_(msg`To`)}
          value={to}
          onChange={(newValue) => {
            if (newValue) {
              onToChange(newValue);
            }
          }}
          renderInput={(params) => (
            <TextField size="small" sx={{ width: 175 }} {...params} />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};
