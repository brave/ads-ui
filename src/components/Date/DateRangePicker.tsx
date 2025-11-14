import { Stack } from "@mui/material";
import { Dispatch } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface Props {
  from: Dayjs | null;
  to: Dayjs | null;
  onFromChange: Dispatch<Dayjs>;
  onToChange: Dispatch<Dayjs>;
}

export const DateRangePicker = ({
  from,
  to,
  onFromChange,
  onToChange,
}: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={1}>
        <DatePicker
          label="From"
          value={from}
          timezone="UTC"
          onChange={(newValue) => {
            if (newValue) {
              onFromChange(newValue.startOf("day"));
            }
          }}
          slotProps={{
            textField: {
              size: "small",
              sx: { width: "175px" },
            },
          }}
        />
        <DatePicker
          label="To"
          value={to}
          timezone="UTC"
          onChange={(newValue) => {
            if (newValue) {
              onToChange(newValue.endOf("day"));
            }
          }}
          slotProps={{
            textField: {
              size: "small",
              sx: { width: "175px" },
            },
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
};
