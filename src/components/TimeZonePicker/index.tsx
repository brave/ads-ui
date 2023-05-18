import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";
import React, { Dispatch } from "react";
import { useTimeZoneList } from "./useTimeZoneList";

interface Props {
  timeZone: string;
  setTimeZone: Dispatch<string>;
  sx?: SxProps;
  disabled?: boolean;
}

export const TimeZonePicker: React.FC<Props> = ({
  timeZone,
  setTimeZone,
  sx,
  disabled,
}) => {
  const timeZoneList = useTimeZoneList();

  const onChangeZone = (e: SelectChangeEvent<string>) => {
    setTimeZone(e.target.value);
  };

  return (
    <FormControl
      variant="outlined"
      margin="normal"
      color="secondary"
      sx={sx}
      disabled={disabled}
    >
      <InputLabel>Time Zone</InputLabel>
      <Select
        value={timeZone}
        autoWidth
        size="small"
        onChange={onChangeZone}
        label="Time Zone"
      >
        {timeZoneList.map((t) => (
          <MenuItem
            value={t.ianaName}
            key={t.ianaName}
            sx={t.isBrowserTz ? { fontWeight: "bold" } : {}}
          >
            {t.caption}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export function getDefaultTimezone(): string {
  return "America/New_York";
}
