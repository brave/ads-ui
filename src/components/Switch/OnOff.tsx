import React, { useState } from "react";
import { isPast, parseISO } from "date-fns";
import { Switch, Tooltip } from "@mui/material";

interface Props {
  onChange: (s: string) => void;
  loading: boolean;
  state: string;
  end: string;
  type: string;
}

export function OnOff({ state, loading, end, onChange, type }: Props) {
  const [checked, setChecked] = useState(state === "active");
  const isAfterEnd = isPast(parseISO(end));
  const enabled = (state === "active" || state === "paused") && !isAfterEnd;

  return (
    <>
      {enabled && (
        <Tooltip
          title={
            enabled
              ? `Activate or pause ${type}`
              : `Cannot activate ${type} in this state`
          }
        >
          <Switch
            onChange={(e) => {
              const theState = e.target.checked ? "active" : "paused";
              setChecked(e.target.checked);
              onChange(theState);
            }}
            checked={checked}
            disabled={loading}
          />
        </Tooltip>
      )}
    </>
  );
}
