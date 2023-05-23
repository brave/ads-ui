import { Box, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { formatISO, parseISO } from "date-fns";
import { useField, useFormikContext } from "formik";
import React, { useState } from "react";
import { getDefaultTimezone, TimeZonePicker } from "../TimeZonePicker";
import { TimezoneAwareDatePicker } from "../TimeZonePicker/TimezoneAwareDatePicker";
import { CampaignForm } from "user/views/adsManager/types";
import { useIsActiveOrPaused } from "form/FormikHelpers";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

export const CampaignDateRange: React.FC<{ isEdit: boolean }> = ({
  isEdit,
}) => {
  const { advertiser } = useAdvertiser();
  const { isNotActiveOrPaused } = useIsActiveOrPaused();
  const [tz, setTz] = useState<string>(getDefaultTimezone());
  const [, startMeta, startHelper] = useField("startAt");
  const [, endMeta, endHelper] = useField("endAt");

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="baseline" mt={2} mb={3}>
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
          disabled={isEdit && !isNotActiveOrPaused}
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
          disabled={
            isEdit && !isNotActiveOrPaused && !advertiser.selfServiceSetPrice
          }
        />

        <TimeZonePicker
          timeZone={tz}
          setTimeZone={setTz}
          sx={{ flexGrow: 1 }}
          disabled={isEdit && !isNotActiveOrPaused}
        />
      </Stack>
      <Typography variant="caption">
        <strong>*</strong>Campaigns are processed during U.S. business hours.
        Processing can take more than 2 days.
      </Typography>
    </Box>
  );
};
