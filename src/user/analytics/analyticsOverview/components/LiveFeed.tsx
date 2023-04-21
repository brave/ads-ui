import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import _ from "lodash";
import {
  EngagementChartType,
  Option,
  OverviewDetail,
  StatsMetric,
} from "../types";
import { Text } from "components/Text/Text";

interface OverviewProps extends OverviewDetail {
  currency: string;
  budget: number;
}

interface LiveFeedProps {
  overview: OverviewProps;
  processed: StatsMetric;
  engagementType: EngagementChartType;
  uniqueEngagements: OverviewDetail[];
  onSelect: (id: string) => void;
  isNtp: boolean;
}

interface Feed {
  label: string;
  value: string;
}

const FeedMetric = ({ label, value }: Feed) => {
  return (
    <Box
      width="100%"
      display="flex"
      marginLeft="28px"
      alignItems="center"
      marginTop="28px"
    >
      <Text
        style={{ marginRight: "14px" }}
        content={`${label}:`}
        fontFamily={"Poppins"}
        sizes={[18, 18, 42, 42, 14]}
      />
      <Text
        content={value}
        fontFamily={"Poppins"}
        sizes={[18, 18, 42, 42, 18]}
      />
    </Box>
  );
};

interface SelectProps {
  options: OverviewDetail[];
  onSelect: (id: string) => void;
  type: "creative" | "creativeset";
  value: OverviewDetail;
}

const UniqueEngagementSelect = ({
  options,
  onSelect,
  type,
  value,
}: SelectProps) => {
  const label = type === "creative" ? "Ad" : "Ad Set";
  const parseName = (details: OverviewDetail, t: string): Option => {
    const id = details.id.split("-")[0];
    const idx = options.findIndex((o) => o.id === details.id);
    const noName = `Ad ${t === "creativeset" ? "Set" : ""} ${idx + 1}`;
    return {
      label: details.name || `${id} - (${noName})`,
      value: details.id,
    };
  };

  return (
    <Autocomplete
      disablePortal
      disableClearable
      sx={{ flexGrow: 1 }}
      options={options.map((e, i) => parseName(e, type))}
      value={parseName(value, type)}
      isOptionEqualToValue={(v, o) => v.value === o.value}
      onChange={(e, v) => {
        onSelect(v.value);
      }}
      renderInput={(params) => (
        <TextField {...params} label={`${label} insights filter`} autoFocus />
      )}
    />
  );
};

export default function LiveFeed({
  overview,
  processed,
  engagementType,
  uniqueEngagements,
  onSelect,
  isNtp,
}: LiveFeedProps) {
  const { budget, currency, state } = overview;
  const realSpend = processed.spend > budget ? budget : processed.spend;

  const feedValues: Feed[] = [
    {
      label: "Click-through rate",
      value: `${processed.ctr.toFixed(2)}%`,
    },
    {
      label: "10s visit rate",
      value: `${processed.visitRate.toFixed(2)}%`,
    },
    {
      label: "Dismissal rate",
      value: `${processed.dismissRate.toFixed(2)}%`,
    },
    {
      label: "Click to 10s visit rate",
      value: `${processed.landingRate.toFixed(2)}%`,
    },
    { label: "Upvotes", value: `${processed.upvotes}` },
    { label: "Downvotes", value: `${processed.downvotes}` },
    {
      label: "Budget",
      value: `${budget.toLocaleString()} ${currency}`,
    },
    {
      label: "State",
      value: _.capitalize(state),
    },
  ];

  if (!isNtp) {
    feedValues.splice(6, 0, {
      label: "Spend",
      value: `${realSpend.toLocaleString()} ${currency}`,
    });
  }

  return (
    <Box width="25%">
      <Box
        marginTop="14px"
        border="1px solid #ededed"
        borderTop={engagementType !== "campaign" ? "none" : "1px solid #ededed"}
        borderRadius="4px"
        height="608px"
        marginLeft="28px"
      >
        <Box
          width="100%"
          height="56px"
          bgcolor="white"
          borderBottom="1px solid #ededed"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {engagementType !== "campaign" ? (
            <UniqueEngagementSelect
              options={uniqueEngagements}
              onSelect={onSelect}
              type={engagementType}
              value={overview}
            />
          ) : (
            <Text
              content={"Campaign Insights"}
              fontFamily={"Poppins"}
              sizes={[18, 18, 42, 42, 14]}
            />
          )}
        </Box>
        {feedValues.map((f, idx) => (
          <FeedMetric label={f.label} value={f.value} key={idx} />
        ))}
      </Box>
    </Box>
  );
}
