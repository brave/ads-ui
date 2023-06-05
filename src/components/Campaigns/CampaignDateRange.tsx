import { Box, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { formatISO, parseISO } from "date-fns";
import { useField } from "formik";
import React, { useState } from "react";
import { getDefaultTimezone, TimeZonePicker } from "../TimeZonePicker";
import { TimezoneAwareDatePicker } from "../TimeZonePicker/TimezoneAwareDatePicker";

export const CampaignDateRange: React.FC<{ isEdit: boolean }> = ({
  isEdit,
}) => {
  const [tz, setTz] = useState<string>(getDefaultTimezone());
  const [, startMeta, startHelper] = useField("startAt");
  const [, endMeta, endHelper] = useField("endAt");

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="baseline" mt={1} mb={1}>
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
          disabled={isEdit}
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
