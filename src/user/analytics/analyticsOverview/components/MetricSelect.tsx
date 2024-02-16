import { useState } from "react";

import { Autocomplete, Box, TextField, Tooltip } from "@mui/material";
import { Metrics, StatsMetric } from "../types";
import { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/macro";
import { Trans, useLingui } from "@lingui/react";

interface PopoutProps {
  onSetMetric: (key: keyof Metrics, value: keyof StatsMetric) => void;
  initialValue: string;
  metric: keyof Metrics;
}

type OptionWithTooltip = {
  value: string;
  label: MessageDescriptor;
  tooltip?: MessageDescriptor;
};

export default function MetricSelect({
  initialValue,
  onSetMetric,
  metric,
}: PopoutProps) {
  const { _ } = useLingui();
  const options: OptionWithTooltip[] = [
    {
      value: "views",
      label: msg`Impressions`,
      tooltip: msg`Counted when an ad is displayed on screen for a minimum of one second`,
    },
    {
      value: "clicks",
      label: msg`Clicks`,
      tooltip: msg`Counted when a user clicks on the ad. Does not include clicks to dismiss`,
    },
    {
      value: "ctr",
      label: msg`CTR`,
      tooltip: msg`The rate at which users clicked in correlation to their impressions`,
    },
    {
      value: "landings",
      label: msg`Site visits`,
      tooltip: msg`Counted if the user clicks an ad and spends at least 10 seconds on the advertiser's website, with the website open in an active browser tab. The 10 seconds must be spent on the site after arriving by clicking the ad link, and the tab must remain open and active the entire time for the visit to count.`,
    },
    {
      value: "conversions",
      label: msg`Conversions`,
      tooltip: msg`Counted when a user reaches a designated conversion landing page`,
    },
    {
      value: "viewthroughConversion",
      label: msg`View-through conversions`,
      tooltip: msg`Counted when a user reaches a designated conversion landing page following an ad impression.`,
    },
    {
      value: "clickthroughConversion",
      label: msg`Click-through conversions`,
      tooltip: msg`Counted when a user reaches a designated conversion landing page following an impression and click of the ad.`,
    },
    {
      value: "dismissals",
      label: msg`Dismissals`,
      tooltip: msg`Counted when a user clicks the “close” or “x” button to make an ad go away`,
    },
    {
      value: "convRate",
      label: msg`Conversion rate`,
      tooltip: msg`The rate at which users converted in correlation to their clicks`,
    },
    {
      value: "landingRate",
      label: msg`Click to site visit rate`,
      tooltip: msg`The rate at which users visited the site in correlation to their clicks`,
    },
    {
      value: "visitRate",
      label: msg`Site visit rate`,
      tooltip: msg`The rate at which users visited the site in correlation to their impressions`,
    },
    {
      value: "dismissRate",
      label: msg`Dismissal rate`,
      tooltip: msg`The rate at which users dismissed the ad in correlation to their impressions`,
    },
    { value: "spend", label: msg`Spend` },
    { value: "cpa", label: msg`CPA` },
  ];

  const [open, setOpen] = useState(false);
  const initial = options.find((o) => o.value === initialValue);
  const [value, setValue] = useState<OptionWithTooltip | undefined>(initial);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const onSelectChange = (value: OptionWithTooltip | null) => {
    toggleOpen();
    if (value) {
      setValue(value);
      onSetMetric(metric, value.value as keyof StatsMetric);
    }
  };

  return (
    <Autocomplete
      disablePortal
      disableClearable
      options={options}
      sx={{
        flexGrow: 1,
        "& .MuiOutlinedInput-root": {
          borderRadius: "0",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        borderBottom: "1px solid #ededed",
      }}
      value={value}
      isOptionEqualToValue={(v, o) => v.value === o.value}
      onChange={(e, v) => onSelectChange(v)}
      renderOption={(props, option) => (
        <Tooltip
          title={option.tooltip ? `${_(option.tooltip)}` : undefined}
          placement="right"
        >
          <Box {...props} component="li">
            <Trans id={option.label.id} />
          </Box>
        </Tooltip>
      )}
      renderInput={(params) => (
        <TextField {...params} sx={{ border: "none" }} />
      )}
    />
  );
}
