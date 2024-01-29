import { Box, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { formatISO, parseISO } from "date-fns";
import { useField, useFormikContext } from "formik";
import { useState } from "react";
import { getDefaultTimezone, TimeZonePicker } from "../TimeZonePicker";
import { TimezoneAwareDatePicker } from "../TimeZonePicker/TimezoneAwareDatePicker";
import { useIsEdit } from "form/FormikHelpers";
import { CampaignForm } from "user/views/adsManager/types";

export const CampaignDateRange = () => {
  const { isDraft } = useIsEdit();
  const { errors } = useFormikContext<CampaignForm>();
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
      <Stack spacing={1} mt={2}>
        {errors.budget && (
          <Typography variant="caption" color="error">
            The budget is too low for the selected date range. Check the budget
            tab for more details.
          </Typography>
        )}

        <Typography variant="caption">
          <strong>*</strong>Campaigns are processed during U.S. business hours.
          Processing can take more than 2 days.
        </Typography>
      </Stack>
    </Box>
  );
};
