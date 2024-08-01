import { Box, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useField } from "formik";
import { useEffect, useState } from "react";
import { getDefaultTimezone, TimeZonePicker } from "../TimeZonePicker";
import { TimezoneAwareDatePicker } from "../TimeZonePicker/TimezoneAwareDatePicker";
import { useIsEdit } from "@/form/FormikHelpers";
import { useLingui } from "@lingui/react";
import { msg, Trans } from "@lingui/macro";
import dayjs from "dayjs";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { isFuzzyCalculatedDailyBudgetOk } from "@/util/campaign";

export const CampaignDateRange = () => {
  const { advertiser } = useAdvertiser();
  const { isDraft, isEdit } = useIsEdit();
  const [tz, setTz] = useState<string>(getDefaultTimezone());
  const [, startMeta, startHelper] = useField("startAt");
  const [, endMeta, endHelper] = useField("endAt");
  const [, budget] = useField("budget");
  const [willNotReachEndDate, setWillNotReachEndDate] = useState(false);
  const { _ } = useLingui();

  useEffect(() => {
    if (!isEdit) return;
    if (advertiser.selfServiceSetPrice) return;

    const { ok } = isFuzzyCalculatedDailyBudgetOk(
      startMeta.value,
      endMeta.value,
    );
    setWillNotReachEndDate(!ok(budget.value));
  }, [endMeta.value, isEdit, budget.value, startMeta.value]);

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
      {willNotReachEndDate && (
        <Typography color="error" variant="caption">
          <Trans>
            The campaign will likely stop running before the end date provided
            due to budget constraints.
          </Trans>
        </Typography>
      )}
    </Box>
  );
};
