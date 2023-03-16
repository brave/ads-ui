import { useState } from "react";

import { Autocomplete, TextField } from "@mui/material";
import { Metrics } from "../types";

interface Option {
  value: string;
  label: string;
}

interface PopoutProps {
  onSetMetric: (key: keyof Metrics, value: string) => void;
  initialValue: string;
  metric: keyof Metrics;
}

export default function MetricSelect({
  initialValue,
  onSetMetric,
  metric,
}: PopoutProps) {
  const options = [
    // TODO: commented out metrics in live feed, do we really need them in both?
    { value: "views", label: "Impressions" },
    { value: "clicks", label: "Clicks" },
    { value: "ctr", label: "CTR" },
    { value: "landings", label: "10s Visits" },
    { value: "conversions", label: "Conversions" },
    { value: "dismissals", label: "Dismissals" },
    // { value: "upvotes", label: "Upvotes" },
    // { value: "downvotes", label: "Downvotes" },
    { value: "convRate", label: "Conversion Rate" },
    { value: "landingRate", label: "Click to 10s Visit Rate" },
    // { value: "spend", label: "Spend" },
    // { value: "cpa", label: "CPA" },
  ];

  const [open, setOpen] = useState(false);
  const initial = options.find((o) => o.value === initialValue);
  const [value, setValue] = useState<Option | undefined>(initial);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const onSelectChange = (value: Option | null) => {
    toggleOpen();
    if (value) {
      setValue(value);
      onSetMetric(metric, value.value);
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
      }}
      value={value}
      isOptionEqualToValue={(v, o) => v.value === o.value}
      onChange={(e, v) => onSelectChange(v)}
      renderInput={(params) => (
        <TextField {...params} sx={{ border: "none" }} />
      )}
    />
  );
}
