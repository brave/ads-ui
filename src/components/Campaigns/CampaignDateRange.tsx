import { Box, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { formatISO, parseISO } from "date-fns";
import { useField } from "formik";
import { useState } from "react";
import { getDefaultTimezone, TimeZonePicker } from "../TimeZonePicker";
import { TimezoneAwareDatePicker } from "../TimeZonePicker/TimezoneAwareDatePicker";
import { useIsEdit } from "form/FormikHelpers";

export const CampaignDateRange = () => {
  const { isDraft } = useIsEdit();
  const [tz, setTz] = useState<string>(getDefaultTimezone());
  const [, startMeta, startHelper] = useField("startAt");
  const [, endMeta, endHelper] = useField("endAt");

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mt={1} mb={1}>
        <TimezoneAwareDatePicker
          label="Start Date"
          tz={tz}
          value={parseISO(startMeta.value)}
          error={!!startMeta.error}
          helperText={startMeta.error}
          onChange={async (dt) => {
            await startHelper.setValue(formatISO(dt));
            await startHelper.setTouched(true);
          }}
          disabled={!isDraft}
        />

        <ArrowForwardIcon />

        <TimezoneAwareDatePicker
          label="End Date"
          tz={tz}
          value={parseISO(endMeta.value)}
          error={!!endMeta.error}
          helperText={endMeta.error}
          onChange={async (dt) => {
            await endHelper.setValue(formatISO(dt));
            await endHelper.setTouched(true);
          }}
        />

        <TimeZonePicker
          timeZone={tz}
          setTimeZone={setTz}
          sx={{ flexGrow: 1 }}
        />
      </Stack>
    </Box>
  );
};
