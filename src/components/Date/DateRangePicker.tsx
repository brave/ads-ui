import { Stack, TextField } from "@mui/material";
import { Dispatch } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

interface Props {
  from: Date;
  to: Date;
  onFromChange: Dispatch<Date>;
  onToChange: Dispatch<Date>;
}

export const DateRangePicker: React.FC<Props> = ({
  from,
  to,
  onFromChange,
  onToChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={1} margin={1}>
        <DatePicker
          label="From"
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
          label="To"
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
