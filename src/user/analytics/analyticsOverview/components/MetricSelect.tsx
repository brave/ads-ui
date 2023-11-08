import { useState } from "react";

import { Autocomplete, TextField } from "@mui/material";
import { Metrics, Option, StatsMetric } from "../types";

interface PopoutProps {
  onSetMetric: (key: keyof Metrics, value: keyof StatsMetric) => void;
  initialValue: string;
  metric: keyof Metrics;
}

export default function MetricSelect({
  initialValue,
  onSetMetric,
  metric,
}: PopoutProps) {
  const options: { value: keyof StatsMetric; label: string }[] = [
    // TODO: commented out metrics in live feed, do we really need them in both?
    { value: "views", label: "Impressions" },
    { value: "clicks", label: "Clicks" },
    { value: "ctr", label: "CTR" },
    { value: "landings", label: "Site visits" },
    { value: "conversions", label: "Conversions" },
    { value: "dismissals", label: "Dismissals" },
    // { value: "upvotes", label: "Upvotes" },
    // { value: "downvotes", label: "Downvotes" },
    { value: "convRate", label: "Conversion Rate" },
    { value: "landingRate", label: "Click to site visit rate" },
    { value: "visitRate", label: "Site visit rate" },
    { value: "dismissRate", label: "Dismissal rate" },
    { value: "spend", label: "Spend" },
    { value: "cpa", label: "CPA" },
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
      renderInput={(params) => (
        <TextField {...params} sx={{ border: "none" }} />
      )}
    />
  );
}
