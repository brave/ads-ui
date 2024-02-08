import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";
import { Dispatch } from "react";
import { useTimeZoneList } from "./useTimeZoneList";
import { Trans } from "@lingui/macro";

interface Props {
  timeZone: string;
  setTimeZone: Dispatch<string>;
  sx?: SxProps;
}

export const TimeZonePicker = ({ timeZone, setTimeZone, sx }: Props) => {
  const timeZoneList = useTimeZoneList();

  const onChangeZone = (e: SelectChangeEvent<string>) => {
    setTimeZone(e.target.value);
  };

  return (
    <FormControl variant="outlined" margin="normal" color="secondary" sx={sx}>
      <InputLabel>
        <Trans>Time Zone</Trans>
      </InputLabel>
      <Select
        value={timeZone}
        autoWidth
        size="small"
        onChange={onChangeZone}
        label={<Trans>Time Zone</Trans>}
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
  // eslint-disable-next-line lingui/no-unlocalized-strings
  return "America/New_York";
}
