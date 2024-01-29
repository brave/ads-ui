import { useState } from "react";

import { Autocomplete, Box, TextField, Tooltip } from "@mui/material";
import { Metrics, Option, StatsMetric } from "../types";

interface PopoutProps {
  onSetMetric: (key: keyof Metrics, value: keyof StatsMetric) => void;
  initialValue: string;
  metric: keyof Metrics;
}

type OptionWithTooltip = Option & { tooltip?: string };

export default function MetricSelect({
  initialValue,
  onSetMetric,
  metric,
}: PopoutProps) {
  const options: OptionWithTooltip[] = [
    {
      value: "views",
      label: "Impressions",
      tooltip:
        "Counted when an ad is displayed on screen for a minimum of one second",
    },
    {
      value: "clicks",
      label: "Clicks",
      tooltip:
        "Counted when a user clicks on the ad. Does not include clicks to dismiss",
    },
    {
      value: "ctr",
      label: "CTR",
      tooltip:
        "The rate at which users clicked in correlation to their impressions",
    },
    {
      value: "landings",
      label: "Site visits",
      tooltip:
        "Counted if the user clicks an ad and spends at least 10 seconds on the advertiser's website, with the website open in an active browser tab. The 10 seconds must be spent on the site after arriving by clicking the ad link, and the tab must remain open and active the entire time for the visit to count.",
    },
    {
      value: "conversions",
      label: "Conversions",
      tooltip:
        "Counted when a user reaches a designated conversion landing page",
    },
    {
      value: "viewthroughConversion",
      label: "View-through Conversions",
      tooltip:
        "Counted when a user reaches a designated conversion landing page following an ad impression.",
    },
    {
      value: "clickthroughConversion",
      label: "Click-through Conversions",
      tooltip:
        "Counted when a user reaches a designated conversion landing page following an impression and click of the ad.",
    },
    {
      value: "dismissals",
      label: "Dismissals",
      tooltip:
        "Counted when a user clicks the “close” or “x” button to make an ad go away",
    },
    {
      value: "convRate",
      label: "Conversion Rate",
      tooltip:
        "The rate at which users converted in correlation to their clicks",
    },
    {
      value: "landingRate",
      label: "Click to site visit rate",
      tooltip:
        "The rate at which users visited the site in correlation to their clicks",
    },
    {
      value: "visitRate",
      label: "Site visit rate",
      tooltip:
        "The rate at which users visited the site in correlation to their impressions",
    },
    {
      value: "dismissRate",
      label: "Dismissal rate",
      tooltip:
        "The rate at which users dismissed the ad in correlation to their impressions",
    },
    { value: "spend", label: "Spend" },
    { value: "cpa", label: "CPA" },
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
        <Tooltip title={option.tooltip} placement="right">
          <Box {...props} component="li">
            {option.label}
          </Box>
        </Tooltip>
      )}
      renderInput={(params) => (
        <TextField {...params} sx={{ border: "none" }} />
      )}
    />
  );
}
