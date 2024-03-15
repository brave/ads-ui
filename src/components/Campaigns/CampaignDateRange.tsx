import { Box, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useField } from "formik";
import { useState } from "react";
import { getDefaultTimezone, TimeZonePicker } from "../TimeZonePicker";
import { TimezoneAwareDatePicker } from "../TimeZonePicker/TimezoneAwareDatePicker";
import { useIsEdit } from "form/FormikHelpers";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";
import dayjs from "dayjs";

export const CampaignDateRange = () => {
  const { isDraft } = useIsEdit();
  const [tz, setTz] = useState<string>(getDefaultTimezone());
  const [, startMeta, startHelper] = useField("startAt");
  const [, endMeta, endHelper] = useField("endAt");
  const { _ } = useLingui();

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mt={1} mb={1}>
        <TimezoneAwareDatePicker
          label={_(msg`Start Date`)}
          tz={tz}
          value={dayjs(startMeta.value).toDate()}
          error={!!startMeta.error}
          helperText={startMeta.error}
          onChange={async (dt) => {
            await startHelper.setValue(dt.toISOString());
            await startHelper.setTouched(true);
          }}
          disabled={!isDraft}
        />

        <ArrowForwardIcon />

        <TimezoneAwareDatePicker
          label={_(msg`End Date`)}
          tz={tz}
          value={dayjs(endMeta.value).toDate()}
          error={!!endMeta.error}
          helperText={endMeta.error}
          onChange={async (dt) => {
            await endHelper.setValue(dt.toISOString());
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
