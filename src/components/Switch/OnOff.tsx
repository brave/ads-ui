import { useState } from "react";
import { isPast, parseISO } from "date-fns";
import { Switch, Tooltip, Typography } from "@mui/material";
import { CampaignSource } from "graphql/types";

interface Props {
  onChange: (s: string) => void;
  loading: boolean;
  state: string;
  end: string;
  type: string;
  source: CampaignSource;
}

export function OnOff({ state, loading, end, onChange, type, source }: Props) {
  const [checked, setChecked] = useState(state === "active");
  const isAfterEnd = isPast(parseISO(end));
  const enabled =
    source === CampaignSource.SelfServe &&
    (state === "active" || state === "paused") &&
    !isAfterEnd;

  return (
    <Tooltip
      title={
        enabled
          ? `Activate or pause ${type}`
          : `${type} status cannot be updated`
      }
    >
      <span>
        {enabled ? (
          <Switch
            onChange={(e) => {
              const theState = e.target.checked ? "active" : "paused";
              setChecked(e.target.checked);
              onChange(theState);
            }}
            sx={{ p: 0 }}
            checked={checked}
            disabled={loading}
          />
        ) : (
          <Typography sx={{ textAlign: "center", p: 0 }}>-</Typography>
        )}
      </span>
    </Tooltip>
  );
}
