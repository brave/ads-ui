import { Stack } from "@mui/material";
import { Dispatch } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";
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
  const { _ } = useLingui();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={1} margin={1}>
        <DatePicker
          label={_(msg`From`)}
          value={from}
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
          label={_(msg`To`)}
          value={to}
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
