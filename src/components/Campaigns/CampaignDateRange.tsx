import { Box, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { formatISO, parseISO } from "date-fns";
import { useField } from "formik";
import { useState } from "react";
import { getDefaultTimezone, TimeZonePicker } from "../TimeZonePicker";
import { TimezoneAwareDatePicker } from "../TimeZonePicker/TimezoneAwareDatePicker";
import { useIsEdit } from "form/FormikHelpers";

export const CampaignDateRange = () => {
  const { isEditAndDraft } = useIsEdit();
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
          onChange={(dt) => {
            startHelper.setValue(formatISO(dt));
            startHelper.setTouched(true);
          }}
          disabled={!isEditAndDraft}
        />

        <ArrowForwardIcon />

        <TimezoneAwareDatePicker
          label="End Date"
          tz={tz}
          value={parseISO(endMeta.value)}
          error={!!endMeta.error}
          helperText={endMeta.error}
          onChange={(dt) => {
            endHelper.setValue(formatISO(dt));
            endHelper.setTouched(true);
          }}
        />

        <TimeZonePicker
          timeZone={tz}
          setTimeZone={setTz}
          sx={{ flexGrow: 1 }}
        />
      </Stack>
      <Typography variant="caption">
        <strong>*</strong>Campaigns are processed during U.S. business hours.
        Processing can take more than 2 days.
      </Typography>
    </Box>
  );
};
