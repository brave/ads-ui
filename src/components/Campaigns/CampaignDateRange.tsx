import { Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { formatISO, parseISO } from "date-fns";
import { useField } from "formik";
import React, { useState } from "react";
import {getDefaultTimezone, TimeZonePicker} from "../TimeZonePicker";
import {TimezoneAwareDatePicker} from "../TimeZonePicker/TimezoneAwareDatePicker";

export const CampaignDateRange: React.FC = () => {
  const [tz, setTz] = useState<string>(getDefaultTimezone());
  const [, startMeta, startHelper] = useField("startAt");
  const [, endMeta, endHelper] = useField("endAt");

  return (
    <Stack direction="row" spacing={2} alignItems="baseline" mt={2} mb={3}>
      <TimezoneAwareDatePicker
        label="Start Date"
        tz={tz}
        value={parseISO(startMeta.value)}
        error={!!startMeta.error}
        helperText={startMeta.error}
        onChange={(dt) => startHelper.setValue(formatISO(dt))}
      />

      <ArrowForwardIcon />

      <TimezoneAwareDatePicker
        label="End Date"
        tz={tz}
        value={parseISO(endMeta.value)}
        error={!!endMeta.error}
        helperText={endMeta.error}
        onChange={(dt) => endHelper.setValue(formatISO(dt))}
      />

      <TimeZonePicker timeZone={tz} setTimeZone={setTz} sx={{ flexGrow: 1 }} />
    </Stack>
  );
};
